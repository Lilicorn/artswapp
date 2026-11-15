const registrationForm = document.getElementById("regisztracio");
const loginForm = document.getElementById("bejelentkezes");
const tabs = document.querySelectorAll(".ful");
const registrationStatus = document.getElementById("registration-status");
const registrationStatusMessage = document.getElementById("registration-status-message");
const loginStatus = document.getElementById("login-status");

for(let i of document.querySelectorAll("input")){
    i.classList.add("randomizer");
}
colorrandomizer();


function setRegistrationStatus(message) {
    registrationStatusMessage.innerText += message; 
    registrationStatus.classList.toggle("is-visible", Boolean(message));
}

function setActiveTab(showLogin) {
    loginForm.style.display = showLogin ? "grid" : "none";
    registrationForm.style.display = showLogin ? "none" : "grid";

    tabs[1].style.backgroundColor = showLogin ? "var(--complementary)" : "var(--background-color)";
    tabs[0].style.backgroundColor = showLogin ? "var(--background-color)" : "var(--complementary)";

    tabs[1].style.borderStyle = showLogin ? "solid" : "dashed";
    tabs[0].style.borderStyle = showLogin ? "dashed" : "solid";

}



function handleRegistration(event) {
    event.preventDefault();
    setRegistrationStatus("");

    const formData = new FormData(registrationForm);
    const displayName = String(formData.get("displayname")).trim();
    const username = String(formData.get("username")).trim();
    const email = String(formData.get("email")).trim();
    const password = String(formData.get("password"));
    const passwordConfirmation = String(formData.get("passwordConfirmation"));
    const errors = [];

    const uppercaseLetters = "AÁBCDEFGHIJKLMNOPQRSTUVWXYZÉÁÚŰÖŐÜÓÍ";
    const lowercaseLetters = "aábcdefghijklmnopqrstuvwxyzéáúűöőüóí";
    const nameCharacters = new Set([...uppercaseLetters, ...lowercaseLetters, " "]);
    const displayNameIsValid =
        [...displayName].every(character => nameCharacters.has(character)) &&
        displayName.trim().split(/\s+/).length >= 2;

    if (!displayNameIsValid) {
        errors.push(" - Display name must contain only letters and spaces, and have at least two parts.");
    }
    if (!username) {
        errors.push(" - Username is required.");
    }

    const allowedEmailDomains = [
        "gmail.com",
        "freemail.hu",
        "citromail.hu",
        "yahoo.com",
        "hotmail.com",
        "hbsz.edu.hu"
    ];
    const emailDomain = email.slice(email.lastIndexOf("@") + 1).toLowerCase();
    if (!allowedEmailDomains.includes(emailDomain)) {
        errors.push(" - Use an email address from an accepted provider.");
    }

    const specialCharacters = "!#%&?*-_@";
    const hasUppercase = [...password].some(character => uppercaseLetters.includes(character));
    if (password.length < 8) {
        errors.push(" - Password must be at least 8 characters long.");
    }
    if (![...password].some(character => specialCharacters.includes(character))) {
        errors.push(`- Password must include a special character (${specialCharacters}).`);
    }
    if (!/\d/.test(password)) {
        errors.push(" - Password must include a number.");
    }
    if (!hasUppercase) {
        errors.push(" - Password must include an uppercase letter.");
    }
    if (password !== passwordConfirmation) {
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
        displayName,
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
registrationForm.addEventListener("submit", handleRegistration);
loginForm.addEventListener("submit", handleLogin);

setActiveTab(false);
