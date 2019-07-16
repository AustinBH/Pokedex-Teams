const hamSpan = document.querySelector("#ham-span");
  hamSpan.addEventListener("click", () => {
    openNav();
  })

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("hamburger-main").style.marginLeft = "250px";
}
