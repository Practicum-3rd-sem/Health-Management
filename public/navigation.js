// css for navgation menu

// add active class on hover
const list = document.querySelectorAll(".list");
function x() {
  list.forEach((item) => {
    item.classList.remove("active");
    this.classList.add("active");
  });
}

list.forEach((item) => {
  item.addEventListener("mouseover", x);
});
