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

window.addEventListener("message", event => {
    if (event.data !== "artswapp-sign-in-complete") return;

    const signInFrame = [...document.querySelectorAll("app-iframe")].find(appFrame =>
        appFrame.getAttribute("title") === "Sign in" &&
        appFrame.shadowRoot?.querySelector("iframe")?.contentWindow === event.source
    );
    if (!signInFrame) return;

    signInFrame.remove();
    window.location.href = "profile.html";
});

document.getElementById("sign-out-link").addEventListener("click", event => {
    event.preventDefault();

    const signInFrame = document.createElement("app-iframe");
    signInFrame.setAttribute("src", event.currentTarget.href);
    signInFrame.setAttribute("title", "Sign in");
    signInFrame.setAttribute("frameless", "");
    signInFrame.style.setProperty("--app-iframe-horizontal-inset", "max(8px, 2vw)");
    document.body.appendChild(signInFrame);
});