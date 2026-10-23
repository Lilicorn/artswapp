const clip = document.querySelector(".clip");
const clipContent = clip.querySelector(".clip-content");
const themeVariables = [
	"--accent-color",
	"--background-color",
	"--complementary",
	"--text-color",
	"--transition",
];
let transitionRunning = false;

document.addEventListener("click", (event) => {
	const toggle = event.target instanceof Element
		? event.target.closest("#displaymode")
		: null;
	if (!toggle) return;

	event.preventDefault();
	event.stopImmediatePropagation();
	if (transitionRunning) return;
	transitionRunning = true;

	const body = document.body;
	const wasDark = body.classList.contains("dark");
	const willBeDark = !wasDark;

	if (typeof window.colorrandomizer === "function") {
		window.colorrandomizer();
	}

	for (const child of body.children) {
		if (child !== clip) clipContent.append(child.cloneNode(true));
	}

	body.classList.toggle("dark", willBeDark);
	const targetStyles = getComputedStyle(body);
	for (const variable of themeVariables) {
		clipContent.style.setProperty(variable, targetStyles.getPropertyValue(variable));
	}
	body.classList.toggle("dark", wasDark);

	const clonedIcon = clipContent.querySelector("#modeicon");
	if (clonedIcon) {
		clonedIcon.classList.toggle("fa-moon", willBeDark);
		clonedIcon.classList.toggle("fa-sun", !willBeDark);
	}

	const finishTransition = () => {
		body.classList.toggle("dark", willBeDark);

		const modeIcon = document.querySelector("#modeicon");
		if (modeIcon) {
			modeIcon.classList.toggle("fa-moon", willBeDark);
			modeIcon.classList.toggle("fa-sun", !willBeDark);
		}

		window.setTimeout(() => {
			clipContent.replaceChildren();
			clipContent.removeAttribute("style");
			clip.style.removeProperty("--origin-x");
			clip.style.removeProperty("--origin-y");
			clip.classList.remove("anim");
			transitionRunning = false;
		}, 150);
	};

	const onAnimationEnd = (animationEvent) => {
		if (animationEvent.target !== clip) return;
		clip.removeEventListener("animationend", onAnimationEnd);
		finishTransition();
	};

	const toggleBounds = toggle.getBoundingClientRect();
	clip.style.setProperty("--origin-x", `${toggleBounds.left + toggleBounds.width / 2}px`);
	clip.style.setProperty("--origin-y", `${toggleBounds.top + toggleBounds.height / 2}px`);
	clipContent.scrollTop = window.scrollY;
	clip.addEventListener("animationend", onAnimationEnd);
	clip.classList.add("anim");
}, true);
