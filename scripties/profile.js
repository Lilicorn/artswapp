
window.addEventListener("resize", function() {
    document.getElementsByClassName("swapslots")[0].innerHTML = window.innerWidth <= 380 ? "0/5" : "0/5 slots";
});