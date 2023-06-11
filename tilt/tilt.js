document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        deactivateLinks();
        let link = e.target;
        link.classList.add("active");
        let activeContent = link.getAttribute("data-js-activeContent");
        deactivateContents();
        document.querySelector("#"+activeContent).classList.add("active");
    })
})

function deactivateLinks() {
    document.querySelectorAll("a").forEach(link => {
        link.classList.remove("active");
    })
}
function deactivateContents() {
    document.querySelectorAll("main > *").forEach(link => {
        link.classList.remove("active");
    })
}

document.querySelector("#btnRun").addEventListener("click", e => {

})

document.addEventListener("mousemove", (mouse) => {
    tracking(mouse);
});

function runBtn(mouseX,mouseY) {
    let btn = document.querySelector("#btnRun");
    btn.addEventListener("click", e => {
        btn.innerText = "You clicked me"
    })
    let btnInfo = btn.getBoundingClientRect();
    let btnCenterX = btnInfo.x + btnInfo.width/2;
    let btnCenterY = btnInfo.y + btnInfo.height/2;
    let r = Math.sqrt(Math.abs(btnCenterX - mouseX)**2 + Math.abs(btnCenterY - mouseY)**2)
    let rMin = 80;
    if (r < rMin) {
        let mainInfo = document.querySelector("main").getBoundingClientRect()
        let translateX = randomTranslate(mainInfo.width/2 - btnInfo.width/2);
        let translateY = randomTranslate(mainInfo.height/2 - btnInfo.height/2);
        btn.style.translate = `${translateX}px ${translateY}px`;
    }
}

function randomTranslate(range) {
    let negative = Math.round(Math.random());
    return Math.random() * range * (negative ? -1:1)
}

function tracking(mouse) {
    let mouseX = mouse.pageX;
    let mouseY = mouse.pageY;
 
    let screenCenterX = window.innerWidth / 2;
    let screenCenterY = window.innerHeight / 2;
    
    if (document.querySelector("#btnRun.active") != null) {
        runBtn(mouseX,mouseY);
        return;
    }
    tiltRotation(mouseX,mouseY,screenCenterX,screenCenterY);
    if (document.querySelector("#eyes.active") != null) {
        eyesMovement(mouseX, mouseY, screenCenterX, screenCenterY);
    } 
}

function tiltRotation(mouseX, mouseY, screenCenterX, screenCenterY) {
    let div = document.querySelector("div.active");
    let rotateY = ((mouseX - screenCenterX) / screenCenterX) * 50;
    let rotateX = ((mouseY - screenCenterY) / screenCenterY) * 50 * -1;
        
    div.style.setProperty("--js-rotateX", rotateX+"deg");
    div.style.setProperty("--js-rotateY", rotateY+"deg");
}

function eyesMovement(mouseX, mouseY, screenCenterX, screenCenterY) {
    let irises = document.querySelectorAll(".iris");
    
    let moveX = ((mouseX)  / (screenCenterX*2)) * 100;
    let moveY = ((mouseY) / (screenCenterY*2)) * 100 ;
    
    irises.forEach(iris => { 
        let ratioX = 1-(parseInt(getComputedStyle(iris).width)/parseFloat(getComputedStyle(iris.parentNode).width));
        let ratioY = 1-(parseInt(getComputedStyle(iris).height)/parseFloat(getComputedStyle(iris.parentNode).height));
        iris.style.top = moveY * ratioY + "%";
        iris.style.left = moveX * ratioX + "%";
    })
}

let nav = document.querySelector("nav")

nav.addEventListener("mouseover", e => {
    // document.querySelector("#mouth").style.setProperty("-webkit-box-reflect", "above");
    document.querySelector("#mouth").style.setProperty("border-top-left-radius", "100px");
    document.querySelector("#mouth").style.setProperty("border-top-right-radius", "100px");
})

nav.addEventListener("mouseleave", e => {
    // document.querySelector("#mouth").style.setProperty("-webkit-box-reflect", "unset");
    document.querySelector("#mouth").style.setProperty("border-top-right-radius", "unset");
    document.querySelector("#mouth").style.setProperty("border-top-left-radius", "unset");
})

