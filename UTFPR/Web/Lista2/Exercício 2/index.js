let principal = document.getElementById("principal");
let images = document.querySelectorAll("div > .secundaria");

images.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    principal.src = element.src;
  });
});
