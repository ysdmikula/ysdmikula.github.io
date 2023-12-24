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
        document.querySelector("body").style.overflowY = "auto";
    });
    createPixels();
}

window.onresize = (e) => {
    if(countNewPixels() == countOnSitePixels()) {
        resizePixels();
    }
    createPixels();  
}


const pixelsSection = document.querySelector("#animationBg"); 
const pixelsColumns = 24;

function pixelSideLength() {
    let windowWidth = window.innerWidth;
    return (windowWidth/pixelsColumns) - parseInt(getComputedStyle(document.querySelector("#animationBg")).gap);
}

function countOnSitePixels() {
        let amount = 0;
        document.querySelectorAll("#animationBg .pixel").forEach(pixel => {
            amount++
        });
        return amount;
}

function countNewPixels(sideLength = pixelSideLength) {
    let containerHeight = parseInt(getComputedStyle(pixelsSection).height);
    
    let pixelSideLength = sideLength();
    let pixelsRows = Math.ceil(containerHeight/pixelSideLength);
    return pixelsColumns * pixelsRows;
}

function createPixels(sideLength = pixelSideLength) {
    document.querySelectorAll("#animationBg .pixel").forEach(pixel => {
        pixel.remove()
    });
    let numberOfPixels = countNewPixels();
    let pixelSideLength = sideLength();

    for (let index = 0; index < numberOfPixels; index++) {
        pixelsSection.insertAdjacentHTML("beforeend",
        `<span class="pixel ${index}" style="width: ${pixelSideLength}px; height: ${pixelSideLength}px;"></span>`);
    }
}

function resizePixels(sideLength = pixelSideLength) {
    document.querySelectorAll("#animationBg .pixel").forEach(pixel => {
        pixel.style.width = sideLength() + "px";
        pixel.style.height = sideLength()  + "px";
    });
}




const texts = ["Welcome", "Willkommen", "Vítejte"]
const typeSimulation = document.querySelector("#text h3")

let textPlace = 0 
let char = 0
let writing = true

let typing = setInterval(type, 100, texts)

function type(texts) {
    let text = texts[textPlace % texts.length]
    if (typeSimulation.textContent.length <= text.length && writing == true) {
        if (typeSimulation.textContent.length == text.length) {
            writing = false
            clearInterval(typing)
            setTimeout(setTypingSpeed, 1000, 50)
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
            setTypingSpeed(100)
            return
        } else {
            char--
            typeSimulation.textContent = text.substring(0, char)
            return
        }

    }
}

function setTypingSpeed(speed) {
    typing = setInterval(type, speed, texts)
}
