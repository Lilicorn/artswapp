let previousColors = [];

function getRandomColorIndex(colors) {
    const availableColors = colors
        .map((_, index) => index)
        .filter((index) => !previousColors.includes(index));
    const random = availableColors[Math.floor(Math.random() * availableColors.length)];

    previousColors.push(random);
    if (previousColors.length > 2) previousColors.shift();
    return random;
}

function colorrandomizer(target = null){
    var colors = ["#ff4a6f", "#ff924a", "#7fd01c", "#4acfff", "#ad2dcd", "#ff69b4"];
    
    const everyone = target ? [target] : document.querySelectorAll('.randomizer');
    for(const e of everyone){
        const random = getRandomColorIndex(colors);
        e.style.setProperty("--accent-color", colors[random]);
    }

    if (!target) {
        const bi = getRandomColorIndex(colors);
        document.body.style.setProperty("--accent-color", colors[bi]);
    }
}


    let currentTitle = document.title;

    //a weblaphoz animáció
    /*const frames = [
        "icon/0.png", "icon/2.png", "icon/4.png", "icon/6.png", 
        "icon/8.png", "icon/10.png"
    ];
    const titles = [
        " ₊ ⊹ ⋆ .˚⋆ ",
        " ⊹ ⋆ .˚⋆ ₊ ",
        " ༝ ⋆ .˚⋆ ₊ ",
        " ⋆ .˚⋆ ₊ ⊹ ",
        " .˚⋆ ₊ ⊹ ⋆ ",
        " ˚⋆ ₊ ⊹ ⋆ ."
    ];
    
    const intro = [
        "ㅤㅤㅤㅤ",
        "ㅤㅤㅤㅤ"+ ".",
        "ㅤㅤㅤ"+ " .˚ ",
        "ㅤㅤ"+ " .˚⋆ ",
        "ㅤ"+ " .˚⋆ ₊ ",
        " .˚⋆ ₊ ⊹ ⋆ ",
        "˚⋆ ₊ ⊹ ⋆ ."
    ]*/
    const flicker=["♡︎⁠ ", "♥︎ "]

    //let i = 0; 
    let j = 1;
    let l = 0;
        setInterval(updateTitle,1000);
    
    

    function updateTitle() {
        document.title = flicker[l]+currentTitle;
        l = (l + 1) % flicker.length;
    }

    const thing = document.getElementById("navitems");
    const one = document.getElementById("desktopview");
    const two = document.getElementById("mobileview");
    const hamburger = document.getElementById("hamburber");

    function nav(){
        if (window.innerWidth <= 912) {
            two.appendChild(thing);
        } else {
            one.insertBefore(thing, one.querySelector(".searchbar"));
        }
    }


    nav();
    window.addEventListener("resize", nav);
    hamburger.addEventListener("click", () => {
        two.classList.toggle("menu-open");
        document.querySelector("#profile-dropdown-menu").classList.remove("menu-open");
   
    });
    /*two.addEventListener("mouseenter", () => {
         two.addEventListener("mouseleave", () => {
        two.classList.remove("menu-open");
    });
    });*/

    document.querySelector(".nav-pfp").addEventListener("click", () => {
        document.querySelector("#profile-dropdown-menu").classList.toggle("menu-open");
        two.classList.remove("menu-open");
    });

    /*document.querySelector("#profile-dropdown-menu").addEventListener("mouseenter", () => {
        document.querySelector("#profile-dropdown-menu").addEventListener("mouseleave", () => {
        document.querySelector("#profile-dropdown-menu").classList.remove("menu-open");
    });});*/
   
    for (const child of document.querySelector(".profile-dropdown-div").children) {
        if (child.id === "displaymode") continue;
        child.addEventListener("click", () => {
            window.location.href = "../pages/profile.html";
        });
    }



const clip = document.createElement("div");
clip.className = "clip";
clip.setAttribute("aria-hidden", "true");
const clipContent = document.createElement("div");
clipContent.className = "clip-content";
clip.append(clipContent);
document.body.append(clip);

const themeVariables = [
    "--accent-color",
    "--background-color",
    "--complementary",
    "--text-color",
    "--transition",
];
let transitionRunning = false;

function setModeIcon(isDark, target = document) {
    const icon = target.querySelector("#modeicon");
    if (!icon) return;

    icon.classList.toggle("fa-moon", isDark);
    icon.classList.toggle("fa-sun", !isDark);
}

function collectScrollPositions(source, clone, positions) {
    if (source instanceof HTMLElement && clone instanceof HTMLElement) {
        positions.push({
            element: clone,
            left: source.scrollLeft,
            top: source.scrollTop,
        });
    }

    Array.from(source.children).forEach((child, index) => {
        collectScrollPositions(child, clone.children[index], positions);
    });
}

function copyComponentState(source, clone) {
    if (source instanceof HTMLElement && clone instanceof HTMLElement) {
        if (source.localName === "app-card") {
            clone.user = source.user;
        }
    }

    Array.from(source.children).forEach((child, index) => {
        copyComponentState(child, clone.children[index]);
    });
}

setModeIcon(document.body.classList.contains("dark"));
document.getElementById("displaymode").addEventListener("click", (event) => {
    event.preventDefault();
    if (transitionRunning) return;
    transitionRunning = true;

    const body = document.body;
    const wasDark = body.classList.contains("dark");
    const willBeDark = !wasDark;
    const toggle = event.currentTarget;

    colorrandomizer();

    const scrollPositions = [];

    for (const child of body.children) {
        if (child !== clip) {
            const clone = child.cloneNode(true);
            copyComponentState(child, clone);
            clipContent.append(clone);
            collectScrollPositions(child, clone, scrollPositions);
        }
    }

    body.classList.toggle("dark", willBeDark);
    const targetStyles = getComputedStyle(body);
    for (const variable of themeVariables) {
        clipContent.style.setProperty(variable, targetStyles.getPropertyValue(variable));
    }
    body.classList.toggle("dark", wasDark);
    setModeIcon(willBeDark, clipContent);

    const toggleBounds = toggle.getBoundingClientRect();
    clip.style.setProperty("--origin-x", `${toggleBounds.left + toggleBounds.width / 2}px`);
    clip.style.setProperty("--origin-y", `${toggleBounds.top + toggleBounds.height / 2}px`);
    clipContent.scrollTop = window.scrollY;

    const onAnimationEnd = (animationEvent) => {
        if (animationEvent.target !== clip) return;
        clip.removeEventListener("animationend", onAnimationEnd);
        body.classList.toggle("dark", willBeDark);
        setModeIcon(willBeDark);

        window.setTimeout(() => {
            clipContent.replaceChildren();
            clipContent.removeAttribute("style");
            clip.style.removeProperty("--origin-x");
            clip.style.removeProperty("--origin-y");
            clip.classList.remove("anim");
            transitionRunning = false;
        }, 150);
    };

    clip.addEventListener("animationend", onAnimationEnd);
    requestAnimationFrame(() => {
        for (const { element, left, top } of scrollPositions) {
            element.scrollLeft = left;
            element.scrollTop = top;
        }

        clip.classList.add("anim");
    });
});
