import { setCookie, getCookie, init, LANG } from "./text.js";
await init();
let nav = document.querySelector(".custom-select");
let selElmnt = document.querySelector("select");
let lang = getCookie("lang");
let numberOfOptions = selElmnt.length;
let selectedOption = document.createElement("div");
selectedOption.setAttribute("class", "select-selected");
selectedOption.innerHTML = getOptionText(lang);
nav.appendChild(selectedOption);
/*for each element, create a new DIV that will contain the option list:*/
let optionList = document.createElement("div");
optionList.setAttribute("class", "select-items select-hide");
for (let j = 0; j < numberOfOptions; j++) {
   let el = selElmnt.options[j];
   /*for each option in the original select element,
   create a new DIV that will act as an option item:*/
   if (el.value !== lang) {
      let option = document.createElement("div");
      let link = document.createElement("a");
      link.textContent = el.textContent;
      link.addEventListener("click", (e) => {
         e.preventDefault();
         setCookie("lang", el.value, 365);
         window.location.reload();
      });
      option.appendChild(link);
      optionList.appendChild(option);
   }
}
nav.appendChild(optionList);

selectedOption.addEventListener("click", function (e) {
   /*when the select box is clicked, close any other select boxes,
   and open/close the current select box:*/
   e.stopPropagation();
   this.nextSibling.classList.toggle("select-hide");
   this.classList.toggle("select-arrow-active");
});

function getOptionText(value) {
   for (const option of selElmnt.options) {
      if (option.value === value) {
         return option.textContent;
      }
   }
}

function closeAllSelect(elmnt) {
   /*a function that will close all select boxes in the document,
  except the current select box:*/

   let x = document.getElementsByClassName("select-items");
   let y = document.getElementsByClassName("select-selected");

   let yl = y.length;
   for (let i = 0; i < yl; i++) {
      if ((elmnt = y[i])) {
         y[i].classList.remove("select-arrow-active");
         x[i].classList.add("select-hide");
      } else {
         x[i].classList.add("select-hide");
      }
   }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

const projectsSection = document.querySelector("#projects");

async function getProjects() {
   try {
      const response = await fetch("projects.json");
      if (!response.ok) {
         throw new Error(`Failed to get projects! status: ${response.status}`);
      }
      const data = await response.json();

      let obj = data.find((obj) => obj.hasOwnProperty(LANG));
      obj[LANG].forEach((project) => {
         //use insertAdjacentHTML - innerHTML+= causes problem with already declared for example ev.listeners
         projectsSection.insertAdjacentHTML(
            "beforeend",
            `
            <a href="${project.url}" class="projectURL" target="_blank">
               <div class="project">
                  <div><img src="${project.img}" alt="${project.alt}"></div>
                  <h3 class="projectName">${project.name}</h3>
                  <div class="projectDescription">${project.description}</div>
               </div>
            </a>`
         );
      });
   } catch (error) {
      projectsSection.insertAdjacentHTML(
         "beforeend",
         `
         <p style="color: red;">${error}</p>
         `
      );
   }
}

getProjects();

const imgContainer = document.querySelector("#imgContainer");

document.querySelector("#links a:last-child").addEventListener("animationend", (e) => {
   if (e.animationName == "linkSlideLeft" || e.animationName == "linkSlideRight") {
      imgContainer.classList.remove("js-showLinks");
   } else {
      imgContainer.classList.remove("js-animateLink");
   }
});

const events = ["mouseover", "click"];
events.forEach((event) => {
   imgContainer.addEventListener(event, (e) => {
      imgContainer.classList.add("js-animateLink");
   });
});

const cvBtns = document.querySelectorAll('a[href="#cv"]');
const projectBtns = document.querySelectorAll('a[href="#projects"]');
const contactBtns = document.querySelectorAll('a[href="#contacts"]');

showSection(cvBtns, "cv");
showSection(projectBtns, "projects");
showSection(contactBtns, "contacts");

const popMenuBtn = document.querySelector("#popMenuBtn");

function showSection(buttons, sectionName) {
   buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
         e.preventDefault();
         popMenuBtn.classList.remove("js-popMenuActive");
         popMenuLinks.classList.add("js-popMenuHide");
         deactivateLinks();
         buttons.forEach((button) => {
            button.classList.add("js-active");
         });
         displaySection(sectionName);
         if (sectionName == "projects") {
            projectDescriptionListener();
         }
      });
   });
}
function deactivateLinks() {
   const allBtns = Array(cvBtns).concat(Array(projectBtns), Array(contactBtns));
   allBtns.forEach((node) => {
      node.forEach((button) => {
         if (button.classList.contains("js-active")) {
            button.classList.remove("js-active");
         }
      });
   });
}
function displaySection(sectionName) {
   const sections = [
      document.querySelector("#cv"),
      document.querySelector("#projects"),
      document.querySelector("#contacts"),
   ];

   sections.forEach((section) => {
      if (section.id == sectionName) {
         if (!section.classList.contains("js-showSection")) {
            section.classList.remove("js-hide");
            section.classList.add("js-showSection");
            if (sectionName == "contacts") {
               imgContainer.classList.add("js-showLinks");
            } else {
               imgContainer.classList.remove("js-animateLink");
            }
         }
      } else {
         if (section.classList.contains("js-showSection")) {
            section.classList.remove("js-showSection");
         }
         section.classList.add("js-hide");
      }
   });
}
function projectDescriptionListener() {
   document.querySelectorAll(".projectDescription").forEach((projectDescription) => {
      projectDescription.addEventListener("mouseover", mouseOverListener);
      projectDescription.addEventListener("mouseleave", mouseLeaveListener);
   });
}
function mouseOverListener(e) {
   let target = e.target;
   let descriptionText = target.textContent;
   document
      .querySelector("body")
      .insertAdjacentHTML(
         "beforeend",
         `<div id="fullProjectDescription" style="top: ${e.pageY}px; left: ${e.pageX}px"></div>`
      );
   document.querySelector("#fullProjectDescription").textContent = descriptionText;
}
function mouseLeaveListener() {
   document.querySelector("#fullProjectDescription").remove();
}

const popMenuLinks = document.querySelector("#popMenuLinks");
popMenuLinks.style.setProperty("--js-popMenuLinksHeight", getComputedStyle(popMenuLinks).height);
popMenuLinks.addEventListener("animationend", (e) => {
   if (e.animationName == "popMenuHide") {
      popMenuLinks.style.visibility = "hidden";
   }
});

popMenuBtn.addEventListener("click", (e) => {
   popMenuBtn.classList.toggle("js-popMenuActive");
   if (popMenuBtn.classList.contains("js-popMenuActive")) {
      popMenuLinks.classList.remove("js-popMenuHide");
      popMenuLinks.style.visibility = "visible";
      popMenuLinks.classList.add("js-popMenuShow");
   }
   if (!popMenuBtn.classList.contains("js-popMenuActive")) {
      popMenuLinks.classList.remove("js-popMenuShow");
      popMenuLinks.classList.add("js-popMenuHide");
   }
});

const date = new Date();
const currentYearFirstDay = new Date(date.getFullYear(), 0, 1);
const birth = new Date(2002, 2, 4, 0, 0, 0);
const birthYearFirstDay = new Date(2002, 0, 1);
let age = date.getFullYear() - birth.getFullYear();
const currentYearDifference = date.getTime() - currentYearFirstDay.getTime();
const birthYearDifference = birth.getTime() - birthYearFirstDay.getTime();
if (currentYearDifference < birthYearDifference) {
   age--;
}
document.querySelector("#age").textContent = age;

const progressBars = document.querySelectorAll(".js-progressBar");
progressBars.forEach((progressBar) => {
   let fillProgressBar = progressBar.getAttribute("data-percent");
   progressBar.style.setProperty("--js-progressBarFill", fillProgressBar + "%");
});

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
