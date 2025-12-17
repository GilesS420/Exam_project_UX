const hamburgerBtn = document.querySelector("#hamburgerToggle");
const navSecondary = document.querySelector("#navSecondary");
const icon = document.querySelector(".hamburger-icon");

hamburgerBtn.addEventListener("click", () =>{
    navSecondary.classList.toggle("hidden");

    const isHidden = navSecondary.classList.contains("hidden");

    icon.src = isHidden
    ? "static/assets/icons/Icon-hamburger.svg"
    : "static/assets/icons/Icon-close.svg";
    
});

