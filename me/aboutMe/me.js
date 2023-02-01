
// var userLang = navigator.language || navigator.userLanguage; 
// alert ("The language is: " + userLang);

const projectsSection = document.querySelector("#projects")

const popMenuBtn = document.querySelector("#popMenuBtn")
const popMenuLinks = document.querySelector("#popMenuLinks")


async function getProjects() {
    try {
       const response = await fetch('projects.json');
       if (!response.ok) {
           throw new Error(`HTTP error! status: ${response.status}`);
       }
       const data = await response.json();

       data.forEach((project) => {
       projectsSection.insertAdjacentHTML("beforeend", `<div class="project">
                                        <a href="${project.url}" class="projectURL" target="_blank">
                                        <div><img src="${project.img}" alt="${project.alt}"></div>
                                        <h3 id="projectName">${project.name}</h3>
                                        <div id="projectDescription">${project.description}</div
                                    </a>
                                 </div>`)
        // projectsSection.innerHTML += `<div class="project">
        //                                 <a href="${project.url}" class="projectURL" target="_blank">
        //                                     <img src="" alt="">
        //                                     <div id="projectName">${project.name}</div>
        //                                     <div id="projectDescription">${project.description}</div
        //                                 </a>
        //                              </div>`
        // })
        })
    } catch (error) {
      console.log(error);
    }
}
  
getProjects();



const imgContainer = document.querySelector("#imgContainer");
const linksContainer = document.querySelector("#links")


document.querySelector("#links a:last-child").addEventListener("animationend", (e) => {
    if (e.animationName == "linkSlideRight") {
        imgContainer.classList.remove("js-showLinks")
    } else {
        imgContainer.classList.remove("js-animateLink")
    }
    
})

const events = ["mouseover", "click"]
events.forEach((event) => {
    imgContainer.addEventListener(event, (e) => {
        imgContainer.classList.add("js-animateLink")
    })
})

        
const cvBtns = document.querySelectorAll("a[href=\"#cv\"]")
const projectBtns = document.querySelectorAll("a[href=\"#projects\"]")
const contactBtns = document.querySelectorAll("a[href=\"#contacts\"]")

const sections = [document.querySelector("#cv"), document.querySelector("#projects"), document.querySelector("#contacts")]
// const cvSection = document.querySelector("#cv")
// const projectSection = document.querySelector("#projects")
// const contactSection = document.querySelector("#contacts")

clickToShowSection(cvBtns, "cv")
clickToShowSection(projectBtns, "projects")
clickToShowSection(contactBtns, "contacts")

function clickToShowSection(buttons, sectionName) {
    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault()
            popMenuBtn.classList.remove("js-active")
            popMenuLinks.classList.add("js-popMenuHide")
            const allBtns = Array(cvBtns).concat(Array(projectBtns), Array(contactBtns))
            allBtns.forEach((node) => {
               node.forEach((button) => {
                if (button.classList.contains("js-active")) {
                button.classList.remove("js-active")
                }
               })
            })
            buttons.forEach((button) => {
                button.classList.add("js-active")
            })
            
            sections.forEach((val) => {
                if (val.id == sectionName) {
                    if (!val.classList.contains("js-showSection")) {
                        val.classList.remove("js-hide")
                        val.classList.add("js-showSection")
                        if (sectionName == "contacts") {
                            imgContainer.classList.add("js-showLinks")
                        } else {
                            imgContainer.classList.remove("js-animateLink")
                        }
                        
                    }
                } else {
                    if (val.classList.contains("js-showSection")) {
                        val.classList.remove("js-showSection")
                    }
                    val.classList.add("js-hide")
                }
            })
        })
    })
}


popMenuLinks.style.setProperty("--js-popMenuLinksHeight", getComputedStyle(popMenuLinks).height)
popMenuLinks.addEventListener("animationend", (e) => {
    if (e.animationName == "popMenuHide") {
        popMenuLinks.style.visibility = "hidden"
    }
})


popMenuBtn.addEventListener("click", (e) => {
    popMenuBtn.classList.toggle("js-active")
    if (popMenuBtn.classList.contains("js-active")) {
        popMenuLinks.classList.remove("js-popMenuHide")
        popMenuLinks.style.visibility = "visible"
        popMenuLinks.classList.add("js-popMenuShow")
    }
    if (!popMenuBtn.classList.contains("js-active")) {
        popMenuLinks.classList.remove("js-popMenuShow")
        popMenuLinks.classList.add("js-popMenuHide")
    }
})


let date = new Date();
const birth = new Date(2002, 2, 4, 0, 0, 0)

let age = date.getFullYear() - birth.getFullYear()

if (date.toLocaleDateString("cs-CZ", { timeZone: "Europe/Prague"}) < birth.toLocaleDateString("cs-CZ", { timeZone: "Europe/Prague"})) {
    age--
} 

document.querySelector("#age").textContent = age



const progressBars = document.querySelectorAll(".js-progressBar")

progressBars.forEach((progressBar) => {
    let fillProgressBar = progressBar.getAttribute("data-percent")
    progressBar.style.setProperty("--js-progressBarFill", fillProgressBar + "%")
})

// progressBars.forEach((progressBar, index) => {
//     let fillProgressBar = progressBar.getAttribute("fill")

//     progressBar.animate(
//     {
//         width: [0, fillProgressBar]
//     },
//     {
//         duration: 1000,
//         easing: "ease",
//         fill: "forwards",
//         pseudoElement: "::before"
//     });
// })



const svgs = document.querySelectorAll(".js-progressCircle")
svgs.forEach((svg) => {
    let children = svg.children
    let fillCircle
    for (const child of children) {
        if (child.nodeName == "circle") {
            fillCircle = child.getAttribute("data-percent")
            child.style.setProperty("--js-fillProgressCircle", Number(fillCircle/100))
        }
        if (child.nodeName == "text") {
            child.textContent = fillCircle + "%"
        }
    }
})

