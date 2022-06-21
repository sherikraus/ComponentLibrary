const menuLabels = document.querySelectorAll(".is-folder");

menuLabels.forEach(function(label) {
  label.addEventListener("click", function(e){
    const subMenu = e.target.nextElementSibling;
    subMenu.classList.toggle("is-hidden");
    subMenu.parentNode.querySelector('.is-folder').classList.toggle('is-open');
  });
});

const hamburger = document.querySelector(".navbar-burger");
const sideNav = document.querySelector("aside");
hamburger.addEventListener("click", function(){
  sideNav.classList.toggle("is-hidden-mobile")
}  
);

document.querySelector("#show-code").addEventListener("click", function(e){
  document.querySelector("pre.closed").classList.remove("closed");
});
