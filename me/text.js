export const LANG = getCookie('lang');
const SUPPORTED_LANG = ['cs', 'en', 'de']
if (!LANG || !SUPPORTED_LANG.includes(LANG)) {
    setCookie('lang', 'cs', 365);
}
let texts;

export async function init() {
    texts = await getText();
    setTexts();
    setDataContents()
    setLists();
};
async function getText() {
    const response = await fetch("text.json");
    if (!response.ok) {
       document.querySelector("main").remove();
       return;
    }
    const data = await response.json();
    return data[LANG];
}

function setTexts() {
    document.querySelectorAll("[data-text]").forEach(el => {
        el.innerHTML = texts[el.getAttribute("data-text")];
    })
}
function setLists() {
    document.querySelectorAll("[data-list]").forEach(el => {
        const list = texts[el.getAttribute("data-list")];
        list.forEach(value => {
            let point = document.createElement("li");
            point.innerHTML = value;
            el.insertAdjacentElement('beforeend', point);
        })
    })
}
function setDataContents() {
    document.querySelectorAll("[data-content]").forEach(el => {
        let text = texts[el.getAttribute('data-content')]
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