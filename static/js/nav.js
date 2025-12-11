function hamburgerMenu() {
  var menu = document.getElementById("hamburger-links");
  if (menu.style.display === "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
} 

function hamburgerMenu() {
    document.getElementById("hamburger-links").classList.toggle("show");
}
