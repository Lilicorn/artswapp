function updatetext(){
    const decor = document.querySelector(".tabthingies > span:not(.tab)");
    
    decor.innerText = 
    window.innerWidth <= 370 
        ? " " 
        : " ❤︎ ";
}

updatetext();
window.addEventListener("resize", updatetext);






const regisform = document.getElementById("registration");
const signinform = document.getElementById("signin");
const tabs = document.querySelectorAll(".tab");
// ezt majd maskepp kene
const registrationStatus = document.getElementById("registration-status");
const registrationStatusMessage = document.getElementById("registration-status-message");
const loginStatus = document.getElementById("login-status");

for(let i of document.querySelectorAll("input")){
    i.classList.add("randomizer");
}
for(let i of document.querySelectorAll('button[type="submit"]')){
    i.classList.add("randomizer");
}
colorrandomizer();

function setRegistrationStatus(message) {
    registrationStatusMessage.innerText += message; 
    registrationStatus.classList.toggle("is-visible", Boolean(message));
}

function setActiveTab(showLogin) {
    signinform.style.display = showLogin ? "grid" : "none";
    regisform.style.display = showLogin ? "none" : "grid";

    tabs[1].style.backgroundColor = showLogin ? "var(--complementary)" : "var(--background-color)";
    tabs[0].style.backgroundColor = showLogin ? "var(--background-color)" : "var(--complementary)";

    tabs[1].style.borderStyle = showLogin ? "solid" : "dashed";
    tabs[0].style.borderStyle = showLogin ? "dashed" : "solid";

}



function handleRegistration(event) {
    event.preventDefault();
    setRegistrationStatus("");

    const formData = new FormData(regisform);
    const displayname = String(formData.get("displayname")).trim();
    const username = String(formData.get("username")).trim();
    const email = String(formData.get("email")).trim();
    const password = String(formData.get("password"));
    const passconfirm = String(formData.get("passconfirm"));
    const errors = [];

    const uppercaseLetters = "AÁBCDEFGHIJKLMNOPQRSTUVWXYZÉÁÚŰÖŐÜÓÍ";
    const lowercaseLetters = "aábcdefghijklmnopqrstuvwxyzéáúűöőüóí";
    const specialCharacters = "!#%&?*-_@";
       

    if (!username) {
        errors.push(" - Username is required.");
    }

    if (!displayname) {
        displayname = username;
    }

    /*const allowedEmailDomains = [ // ezt majd maskepp kene sztem megint
        "gmail.com",
        "proton.me",
        "yahoo.com",
        "hotmail.com",
        "hbsz.edu.hu"
    ]; 
    const emailDomain = email.slice(email.lastIndexOf("@") + 1).toLowerCase();
    */

    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
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
    if (password !== passconfirm) {
        errors.push(" - The passwords do not match.");
    }

    if (errors.length > 0) {
        setRegistrationStatus(errors.join("\n\t"));
        return;
    }

    const registration = {
        email,
        password,
        username,
        displayname,
        newsletterOptIn: formData.has("newsletterOptIn")
    };

    setRegistrationStatus(
        `Backend registration is not connected. The account "${registration.username}" was not saved.`
    );
}

function handleLogin(event) {
    event.preventDefault();
    loginStatus.textContent =
        "Backend sign-in is not connected. Your credentials were not checked or saved.";
}

tabs[0].addEventListener("click", () => setActiveTab(false));
tabs[1].addEventListener("click", () => setActiveTab(true));
regisform.addEventListener("submit", handleRegistration);
signinform.addEventListener("submit", handleLogin);

setActiveTab(false);
