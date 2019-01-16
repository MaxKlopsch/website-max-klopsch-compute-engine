'use strict';

function toggleMenu() {
    var x = document.getElementById("nav");
    if (x.classList.contains("hiddenMobile")) {
        x.classList.remove("hiddenMobile");
    } else {
        x.classList.add("hiddenMobile");
    }
}