let val = 100;
const loader = document.querySelector("#loader");
let interval = setInterval(() => {
    val = val - 0.1;
    loader.style.setProperty("--height", val + "%");
    if (val < 40) {
        clearInterval(interval);   
        //simulation
        loader.style.setProperty("--height", 0 + "%");
        document.querySelector("#circleLoader").style.setProperty("animation", "none");
        loader.style.opacity = "0";
        loader.addEventListener("transitionend", () => {
            document.querySelector("#loader").remove();
        });
      };
}, 10)

// window.onload = (event) => {
//     clearInterval(interval);
//     loader.style.setProperty("--height", 0 + "%");
//     document.querySelector("#circleLoader").style.setProperty("animation", "none");
//     loader.style.opacity = "0";
//     loader.addEventListener("transitionend", () => {
//         document.querySelector("#loader").remove();
//     });
// }