'use strict';

function toggleMenu() {
    var x = document.getElementById("nav");
    if (x.classList.contains("hiddenMobile")) {
        x.classList.remove("hiddenMobile");
    } else {
        x.classList.add("hiddenMobile");
    }
}

const acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
    if (i === 0) {
        acc[i].classList.toggle("active");
        acc[i].nextElementSibling.style.maxHeight = acc[i].nextElementSibling.scrollHeight + "px";
    }
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}