import "./styles.css";
import { calc } from "./test"

function openPage(pageId: string) {
    const pages = document.querySelectorAll(".page");
    pages.forEach(page => {
        page.classList.add("hidden");
    });
    const page = document.getElementById(pageId) || document.getElementById("page-home");
    if (page) {
        page.classList.remove("hidden");
    }
}

function hashProcessing() {
    const hash = window.location.hash.substring(1) || "home";
    openPage("page-" + hash);
    setActiveButton(hash);
}

function setActiveButton(buttonId: string) {
    const pagesButtons = Array.from(document.querySelectorAll("button[data-page]"));
    const button = document.querySelector(`nav [data-page="${buttonId}"]`);

    pagesButtons.forEach(button =>{
        button.classList.remove("bg-gray-300/60")
    });

    button.classList.add("bg-gray-300/60");
}

const navButtons = document.querySelectorAll("button[data-page]");
navButtons.forEach(button => {
    button.addEventListener("click", () => {

        const pageId = button.getAttribute("data-page");
        if (pageId) {
            window.location.hash = pageId;}
    });
})

window.addEventListener("hashchange", hashProcessing);
window.addEventListener("DOMContentLoaded", hashProcessing);

console.log(calc(5, 3));   