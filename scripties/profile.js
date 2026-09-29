

window.addEventListener("resize", function() {
    document.getElementsByClassName("swapslots")[0].innerText = 
    window.innerWidth <= 380 | (800 < window.innerWidth && window.innerWidth < 825) ? "0/5" 
    : "0/5 swaps";
});

document.getElementById("seemorebio").addEventListener("click", function(){
    document.getElementsByClassName("bio")[0].classList.toggle("open");
});

document.getElementById("seemoreportfolio").addEventListener("click", function(){
    document.getElementsByClassName("portfolio")[0].classList.toggle("open");
});

document.getElementById("seemoreswaps").addEventListener("click", function(){
    document.getElementsByClassName("swaps")[0].classList.toggle("open");
});

colorrandomizer();