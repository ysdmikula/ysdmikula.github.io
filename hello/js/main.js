M.AutoInit();

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
   anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
         target.scrollIntoView({
            behavior: "smooth",
            block: "start",
         });
      }
   });
});

const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const nav = document.querySelector("nav");

mobileMenuBtn.addEventListener("click", () => {
   if (nav.style.display === "flex") {
      nav.style = "";
   } else {
      nav.style.display = "flex";
      nav.style.flexDirection = "column";
      nav.style.position = "absolute";
      nav.style.top = "100%";
      nav.style.left = "0";
      nav.style.right = "0";
      nav.style.background = "#f8f8f8";
      nav.style.padding = "1rem";
      nav.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
   }
});

window.addEventListener("resize", (e) => {
   if (nav.style.display === "flex" && window.innerWidth > 768 && nav.style != "") {
      console.log("yo");
      nav.style = "";
   }
});

const menuButtons = document.querySelectorAll(".menu-card[data-category]");
const menusContainer = document.querySelector(".menus-container");
const menuSections = document.querySelectorAll(".menu-category");

const menuGrid = document.querySelector(".menu-grid");
function scrollButtonIntoView(button) {
   if (menuGrid && button) {
      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;
      const gridScrollLeft = menuGrid.scrollLeft;
      const gridWidth = menuGrid.offsetWidth;

      if (buttonLeft < gridScrollLeft) {
         menuGrid.scrollTo({
            left: buttonLeft - 50,
            behavior: "smooth",
         });
      } else if (buttonLeft + buttonWidth > gridScrollLeft + gridWidth) {
         menuGrid.scrollTo({
            left: buttonLeft + buttonWidth - gridWidth + 20,
            behavior: "smooth",
         });
      }
   }
}

menuButtons.forEach((button) => {
   button.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = button.getAttribute("data-category");
      const targetSection = document.querySelector("#" + targetId);

      if (targetSection && menusContainer) {
         const sectionTop = targetSection.offsetTop - menusContainer.offsetTop;

         menusContainer.scrollTo({
            top: sectionTop,
            behavior: "instant",
         });
      }
   });
});

if (menusContainer) {
   menusContainer.addEventListener("scroll", () => {
      const scrollPosition = menusContainer.scrollTop + 100;

      let currentSection = "";

      menuSections.forEach((section) => {
         const sectionTop = section.offsetTop - menusContainer.offsetTop;
         const sectionHeight = section.offsetHeight;

         if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.id;
         }
      });

      menuButtons.forEach((button) => {
         const wasActive = button.classList.contains("active");
         button.classList.remove("active");
         const targetId = button.getAttribute("data-category");

         if (targetId === currentSection) {
            button.classList.add("active");
            if (!wasActive) {
               scrollButtonIntoView(button);
            }
         }
      });
   });
}
