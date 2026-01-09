M.AutoInit();
// document.addEventListener("DOMContentLoaded", function () {
//    var elems = document.querySelectorAll(".materialboxed");
//    var instances = M.Materialbox.init(elems, options);
// });

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

// Mobile menu toggle
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
