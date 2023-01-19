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

const menu = document.querySelector("#menuBtn")
const nav = document.querySelector("nav")
const a = document.querySelector("a")

menu.addEventListener("click", (e) => {
    menu.classList.toggle("change")
    menu.style.animation = "spin 0.5s"
    menu.style.pointerEvents = "none"
    nav.classList.toggle("hidden")
    if (nav.classList.contains("hidden")) {
        nav.addEventListener("animationend", (e) => {
            nav.style.display = "none"
        }, {once: true})
    } else {
        nav.style.display = "flex"
    }
    menu.addEventListener("animationend", (e) => {
        menu.style.animation = ""
        menu.style.pointerEvents = ""
        // menu.style.removeProperty("animation")
        // menu.style.removeProperty("pointer-events")
    })

})



