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
    buttonClick(hash);
}

function buttonClick(buttonAtr: string) {
    const navButtons = document.querySelectorAll("button[data-page]");
    navButtons.forEach(button => {
        button.classList.remove("bg-gray-300/60");
        
        button.addEventListener("click", () => {
        setActiveButton(button);

        const pageId = button.getAttribute("data-page");
        if (pageId) {
            window.location.hash = pageId;}
        });
    })
}

function setActiveButton(button: Element) {
    

    button.classList.remove("hover:bg-gray-300/60");
    button.classList.add("bg-gray-300/60");
}


window.addEventListener("hashchange", hashProcessing);
window.addEventListener("DOMContentLoaded", hashProcessing);

console.log(calc(5, 3));   