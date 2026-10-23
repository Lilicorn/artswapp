function updatetext(){
    const swapslots = document.querySelector(".swapslots");
    
    swapslots.innerText = 
    window.innerWidth <= 400 
        ? "0/5" 
        : "0/5 swaps";
}

updatetext();
window.addEventListener("resize", updatetext);

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