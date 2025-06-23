const header = document.querySelector(".header");
const root = document.querySelector("#root");

if (header && root) {
  const hasSearch = header.querySelector(".search");
  const hasDropdown = header.querySelector(".productsDropdown-wrapper");

  if (hasSearch || hasDropdown) {
    root.classList.add("root-active");
  } else {
    root.classList.remove("root-active");
  }
}
