export const LANG = getCookie('lang');
const SUPPORTED_LANG = ['cs', 'en', 'de']
if (!LANG || !SUPPORTED_LANG.includes(LANG)) {
    setCookie('lang', 'cs', 365);
}
let texts;

export async function init() {
    try {
        texts = await getText();
        setTexts();
        setDataContents()
        setLists();
    } catch (e) {
        const msgs = ["Výběr jazyka je momentálně nedostupný!", "Language selection is currently unavailable!", "Die Sprachauswahl ist zurzeit nicht verfügbar!"]
        let div = document.createElement('div');
        div.classList.add('error');
        msgs.forEach(msg => {
            let p = document.createElement('p');
            p.innerText = msg;
            div.appendChild(p);
        })
        document.querySelector(".select-items.select-hide").style.visibility = "hidden";
        let currIndex = 0;
        const elements = div.querySelectorAll("p");
        let animation;
        document.querySelector(".select-selected").addEventListener("mouseover", e => {
            let rect = e.target.getBoundingClientRect();
            let x = rect.x - 340
            let y = rect.y + window.scrollY - 10
            document.body.appendChild(div);
            elements[currIndex].classList.toggle("show");
            div.style.position = "absolute";
            div.style.top = `${y}px`;
            div.style.left = `${x}px`;
            animation = setInterval(() => {
                currIndex = (currIndex + 1) % 3
                let prevIndex = currIndex - 1 < 0 ? elements.length - 1 : currIndex - 1 
                elements[prevIndex].classList.toggle("show");
                elements[currIndex].classList.toggle("show");
            }, 2000)
        });
        document.querySelector(".select-selected").addEventListener("mouseleave", e => {
            elements.forEach(el => {
                el.classList.remove("show");
            })
            clearInterval(animation)
            div.remove();
        })
    }    
};
async function getText() {
    const response = await fetch("text.json");
    if (!response.ok) {
        throw new Error("Multilingual text not loaded!");
    }
    const data = await response.json();
    return data[LANG];
}

function setTexts() {
    document.querySelectorAll("[data-text]:not([data-content])").forEach(el => {
        el.innerHTML = texts[el.getAttribute("data-text")];
    })
}
function setLists() {
    document.querySelectorAll("[data-list]").forEach(el => {
        const list = texts[el.getAttribute("data-list")];
        el.innerHTML = ""
        list.forEach(value => {
            let point = document.createElement("li");
            point.innerHTML = value;
            el.insertAdjacentElement('beforeend', point);
        })
    })
}
function setDataContents() {
    document.querySelectorAll("[data-content][data-text]").forEach(el => {
        let text = texts[el.getAttribute('data-text')]
        if (text) {
            el.setAttribute('data-content', text);
        }
    })
}

export function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/;Secure;";
}

export function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length);
        }
    }
    return null;
}