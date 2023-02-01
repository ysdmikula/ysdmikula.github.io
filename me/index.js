let val = 100;
const loader = document.querySelector("#loader");
let interval = setInterval(() => {
    val = val - 0.1;
    loader.style.setProperty("--height", val + "%");
    if (val < 40) {
        clearInterval(interval);              
      };
}, 10)
window.onload = (event) => {
    clearInterval(interval);
    loader.style.setProperty("--height", 0 + "%");
    document.querySelector("#circleLoader").style.setProperty("animation", "none");
    loader.style.opacity = "0";
    loader.addEventListener("transitionend", () => {
        document.querySelector("#loader").remove();
    });
    createPixels();
}

window.onresize = (e) => {
    createPixels();
}

const pixelsSection = document.querySelector("body"); 
const pixelsColumns = 25;
function createPixels() {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    
    let pixelSideLength = (windowWidth/pixelsColumns) - 2;
    let pixelsRows = Math.ceil(windowHeight/pixelSideLength);
    let numberOfPixels = pixelsColumns * pixelsRows;
    
    for (let index = 0; index < numberOfPixels; index++) {
        pixelsSection.appendChild(document.createElement("span"));
    }

    pixelsSection.childNodes.forEach(element => {
        if (element.tagName === "SPAN") {
            element.classList.add("pixel")
            element.style.width = pixelSideLength + "px";
            element.style.height = pixelSideLength + "px";
        }
    });
}

// const menu = document.querySelector("#menuBtn")
// const nav = document.querySelector("nav")
// const a = document.querySelector("a")

// menu.addEventListener("click", (e) => {
//     menu.style.animation = "spin 0.5s"
//     menu.style.pointerEvents = "none"
//     nav.classList.toggle("js-hide")
//     if (nav.classList.contains("js-hide")) {
//         nav.addEventListener("animationend", (e) => {
//             nav.style.visibility = "hidden"
//         }, {once: true})
//     } else {
//         nav.style.visibility = "visible"
//     }
//     menu.addEventListener("animationend", (e) => {
//         menu.style.animation = ""
//         menu.style.pointerEvents = ""
//         // menu.style.removeProperty("animation")
//         // menu.style.removeProperty("pointer-events")
//     })

// })


const motorcycle = document.querySelector("#motorcycle")

motorcycle.addEventListener("click", (e) => {
    motorcycle.classList.add("js-go")
    motorcycle.addEventListener("animationend", (e) => {
        window.location.href = "aboutMe/me.html"
    })
})


const texts = ["Hello", "Welcome", "Click the motorcycle to continue"]
const typeSimulation = document.querySelector("#typeSimulation h3")

let textPlace = 0 
let char = 0
let writing = true

let typing = setInterval(type, 100)

function type() {
    let text = texts[textPlace % texts.length]
    if (typeSimulation.textContent.length <= text.length && writing == true) {
        if (typeSimulation.textContent.length == text.length) {
            writing = false
            clearInterval(typing)
            setTimeout(rewriteInterval, 1000, 50)
            return
        } else {
            char++
            typeSimulation.textContent = text.substring(0, char)
            return
        }
        
    }
    if (typeSimulation.textContent.length <= text.length && writing == false) {
        if (typeSimulation.textContent == "") {
            textPlace++
            writing = true
            clearInterval(typing)
            rewriteInterval(80)
            return
        } else {
            char--
            typeSimulation.textContent = text.substring(0, char)
            return
        }

    }
}

function rewriteInterval(speed) {
    typing = setInterval(type, speed)
}

