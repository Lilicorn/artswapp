function updatetext(){
    const decor = document.querySelector(".tabthingies > span:not(.tab)");
    
    decor.innerText = 
    window.innerWidth <= 370 
        ? " " 
        : " ❤︎ ";
}

updatetext();
window.addEventListener("resize", updatetext);






const regisform = document.getElementById("registration-1");
const regisform2 = document.getElementById("registration-2");
const signinform = document.getElementById("signin");
const tabs = document.querySelectorAll(".tab");
const registrationStatus = document.getElementById("registration-status");
const registrationStatusMessage = document.getElementById("registration-status-message");
const loginStatus = document.getElementById("login-status");
let registrationStep = 1;
let loginTabActive = false;

for(let i of document.querySelectorAll("input")){
    i.classList.add("randomizer");
}
for(let i of document.querySelectorAll('button[type="submit"]')){
    i.classList.add("randomizer");
}
colorrandomizer();

function setRegistrationStatus(message) {
    registrationStatusMessage.innerText = message;
    registrationStatus.classList.toggle("is-visible", Boolean(message));
}

function setRegistrationStep(step) {
    registrationStep = step;
    regisform.style.display = !loginTabActive && step === 1 ? "grid" : "none";
    regisform2.style.display = !loginTabActive && step === 2 ? "grid" : "none";
}

function setActiveTab(showLogin) {
    loginTabActive = showLogin;
    signinform.style.display = showLogin ? "grid" : "none";
    setRegistrationStep(registrationStep);

    tabs[1].style.backgroundColor = showLogin ? "var(--complementary)" : "var(--background-color)";
    tabs[0].style.backgroundColor = showLogin ? "var(--background-color)" : "var(--complementary)";

    tabs[1].style.borderStyle = showLogin ? "solid" : "dashed";
    tabs[0].style.borderStyle = showLogin ? "dashed" : "solid";

}



function validateRegistration(event) {
    event.preventDefault();
    setRegistrationStatus("");

    const firstStepData = new FormData(regisform);
    const email = String(firstStepData.get("email")).trim();
    const password = String(firstStepData.get("password"));
    const errors = [];

    const uppercaseLetters = "AÁBCDEFGHIJKLMNOPQRSTUVWXYZÉÁÚŰÖŐÜÓÍ";
    const lowercaseLetters = "aábcdefghijklmnopqrstuvwxyzéáúűöőüóí";
    const specialCharacters = "!#%&?*-_@";
       


    /*const allowedEmailDomains = [ // ezt majd maskepp kene sztem megint
        "gmail.com",
        "proton.me",
        "yahoo.com",
        "hotmail.com",
        "hbsz.edu.hu"
    ]; 
    const emailDomain = email.slice(email.lastIndexOf("@") + 1).toLowerCase();
    */

    if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        errors.push(" - Email format is invalid.");
    }

    if (password.length < 8) {
        errors.push(" - Password must be at least 8 characters long.");
    }
    if (![...password].some(character => specialCharacters.includes(character))) {
        errors.push(`- Password must include a special character (${specialCharacters}).`);
    }
    if (!/\d/.test(password)) {
        errors.push(" - Password must include a number.");
    }
    if (![...password].some(character => uppercaseLetters.includes(character))) {
        errors.push(" - Password must include an uppercase letter.");
    }

    if (errors.length > 0) {
        setRegistrationStatus(errors.join("\n\t"));
        return;
    }

    setRegistrationStep(2);
}

function handleRegistration(event) {
    event.preventDefault();
    setRegistrationStatus("");

    const firstStepData = new FormData(regisform);
    const secondStepData = new FormData(regisform2);
    const username = String(secondStepData.get("username")).trim();
    const displaynameInput = String(secondStepData.get("displayname")).trim();
    const errors = [];

    if(username == "") errors.push("we need a username");

    const registration = {
        email: String(firstStepData.get("email")).trim(),
        password: String(firstStepData.get("password")),
        username,
        displayname: displaynameInput || username,
        newsletterOptIn: secondStepData.has("newsletterOptIn")
    };

    setRegistrationStatus(
        `Backend registration is not connected. The account "${registration.username}" was not saved.`
    );
}

function handleLogin(event) {
    event.preventDefault();
    loginStatus.textContent =
        "Backend sign-in is not connected. Your credentials were not checked or saved.";
    window.setTimeout(() => {
        if (window.parent === window) {
            window.location.href = "profile.html";
            return;
        }

        window.parent.postMessage("artswapp-sign-in-complete", "*");
    }, 1500);
}

tabs[0].addEventListener("click", () => setActiveTab(false));
tabs[1].addEventListener("click", () => setActiveTab(true));
regisform.addEventListener("submit", validateRegistration);
regisform2.addEventListener("submit", handleRegistration);
document.getElementById("registration-back").addEventListener("click", () => setRegistrationStep(1));
signinform.addEventListener("submit", handleLogin);

setActiveTab(false);
