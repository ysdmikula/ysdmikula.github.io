
// var userLang = navigator.language || navigator.userLanguage; 
// alert ("The language is: " + userLang);

const projectsSection = document.querySelector("#projects")



async function getProjects() {
    try {
       const response = await fetch('projects.json');
       if (!response.ok) {
           throw new Error(`Failed to get projects! status: ${response.status}`);
       }
       const data = await response.json();

       data.forEach((project) => {
        //use insertAdjacentHTML - innerHTML+= causes problem with already declared for example ev.listeners
       projectsSection.insertAdjacentHTML("beforeend", `
                                        <a href="${project.url}" class="projectURL" target="_blank">
                                            <div class="project">
                                                <div><img src="${project.img}" alt="${project.alt}"></div>
                                                <h3 class="projectName">${project.name}</h3>
                                                <div class="projectDescription">${project.description}</div>
                                            </div>
                                        </a>`)
        })
    } catch (error) {
      console.log(error);
    }
}
  
getProjects();


const imgContainer = document.querySelector("#imgContainer");
const linksContainer = document.querySelector("#links")


document.querySelector("#links a:last-child").addEventListener("animationend", (e) => {
    if (e.animationName == "linkSlideLeft" || e.animationName == "linkSlideRight") {
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

showSection(cvBtns, "cv")
showSection(projectBtns, "projects")
showSection(contactBtns, "contacts")

const popMenuBtn = document.querySelector("#popMenuBtn")

function showSection(buttons, sectionName) {
    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault()
            popMenuBtn.classList.remove("js-popMenuActive")
            popMenuLinks.classList.add("js-popMenuHide")
            deactivateLinks()
            buttons.forEach((button) => {
                button.classList.add("js-active")
            })
            displaySection(sectionName)
            if (sectionName == "projects") {
                detailedProjectDescription();
            }
        })
    })


}

function deactivateLinks() {
    const allBtns = Array(cvBtns).concat(Array(projectBtns), Array(contactBtns))
    allBtns.forEach((node) => {
       node.forEach((button) => {
        if (button.classList.contains("js-active")) {
            button.classList.remove("js-active");
        }
       })
    })
}

function displaySection(sectionName) {
    const sections = [document.querySelector("#cv"), document.querySelector("#projects"), document.querySelector("#contacts")]

    sections.forEach((section) => {
        if (section.id == sectionName) {
            if (!section.classList.contains("js-showSection")) {
                section.classList.remove("js-hide")
                section.classList.add("js-showSection")
                if (sectionName == "contacts") {
                    imgContainer.classList.add("js-showLinks")
                } else {
                    imgContainer.classList.remove("js-animateLink")
                }
                
            }
        } else {
            if (section.classList.contains("js-showSection")) {
                section.classList.remove("js-showSection")
            }
            section.classList.add("js-hide")
        }
    })
}

function detailedProjectDescription() {
    document.querySelectorAll(".projectDescription").forEach(projectDescription => {
        projectDescription.addEventListener("mouseover", e => {
            let target = e.target;
            console.log(target);
            let descriptionText =  target.textContent;
            document.querySelector("body").insertAdjacentHTML("beforeend", `<div id="fullProjectDescription" style="top: ${e.pageY + 20}px; left: ${e.pageX}px"></div>`);
            document.querySelector("#fullProjectDescription").textContent = descriptionText;
        })
        projectDescription.addEventListener("mouseleave", e => {
            document.querySelector("#fullProjectDescription").remove()
        })
    })
}

const popMenuLinks = document.querySelector("#popMenuLinks")

popMenuLinks.style.setProperty("--js-popMenuLinksHeight", getComputedStyle(popMenuLinks).height)
popMenuLinks.addEventListener("animationend", (e) => {
    if (e.animationName == "popMenuHide") {
        popMenuLinks.style.visibility = "hidden"
    }
})

popMenuBtn.addEventListener("click", (e) => {
    popMenuBtn.classList.toggle("js-popMenuActive")
    if (popMenuBtn.classList.contains("js-popMenuActive")) {
        popMenuLinks.classList.remove("js-popMenuHide")
        popMenuLinks.style.visibility = "visible"
        popMenuLinks.classList.add("js-popMenuShow")
    }
    if (!popMenuBtn.classList.contains("js-popMenuActive")) {
        popMenuLinks.classList.remove("js-popMenuShow")
        popMenuLinks.classList.add("js-popMenuHide")
    }
})

let date = new Date();
const birth = new Date(2002, 2, 4, 0, 0, 0)
let age = date.getFullYear() - birth.getFullYear()
if (date.getTime() < birth.getTime()) {
    age--
} 
document.querySelector("#age").textContent = age

const progressBars = document.querySelectorAll(".js-progressBar")
progressBars.forEach((progressBar) => {
    let fillProgressBar = progressBar.getAttribute("data-percent")
    progressBar.style.setProperty("--js-progressBarFill", fillProgressBar + "%")
})

//animate in JS not using classes
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


//circular proggress animation
// const svgs = document.querySelectorAll(".js-progressCircle")
// svgs.forEach((svg) => {
//     let children = svg.children
//     let fillCircle
//     for (const child of children) {
//         if (child.nodeName == "circle") {
//             fillCircle = child.getAttribute("data-percent")
//             child.style.setProperty("--js-fillProgressCircle", Number(fillCircle/100))
//         }
//         if (child.nodeName == "text") {
//             child.textContent = fillCircle + "%"
//         }
//     }
// })

