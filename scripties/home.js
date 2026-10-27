let laststate = null;
function loadingstuff(){
    let mobile = window.innerWidth <= 768 ? true : false;
    if(mobile === laststate) return;
    laststate = mobile;

    let en = mobile ? 5 : 10;
    generatecards("recommendedusers", en, "full.html", "compact");
    generatecards("recommendedauctions", en, "auctions.html", "compact");
    //generatecards("donatorleaderboard", en, "full.html");

    
    colorrandomizer();

}


window.addEventListener("load", loadingstuff);
window.addEventListener("resize", loadingstuff);