class AppIframe extends HTMLElement {
    static observedAttributes = ["src", "title"];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        if (this.isConnected) this.render();
    }

    #syncTheme() {
        const iframe = this.shadowRoot.querySelector("iframe");
        const embeddedBody = iframe?.contentDocument?.body;
        if (!embeddedBody) return;

        const isDark = document.body.classList.contains("dark");
        embeddedBody.classList.toggle("dark", isDark);

        const modeIcon = iframe.contentDocument.getElementById("modeicon");
        modeIcon?.classList.toggle("fa-moon", isDark);
        modeIcon?.classList.toggle("fa-sun", !isDark);
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: grid;
                    place-items: center;
                }
                iframe {
                    display: block;
                    width: 90vw;
                    height: 90vh;
                    box-sizing: border-box;
                    border: 5px var(--accent-color) solid;
                    border-bottom-width: 10px;
                    border-radius: 32px;
                    background: var(--background-color);
                }
                    button {
                        position: absolute;
                        top: calc(5vh + 14px);
                        right: calc(5vw + 14px);
                        z-index: 1;
                        display: grid;
                        place-items: center;
                        width: 40px;
                        height: 40px;
                        padding: 0;
                        border: 0;
                        border-radius: 50%;
                        background: var(--accent-color);
                        color: var(--background-color);
                        cursor: pointer;
                        font-weight: bold;
                    }
            </style>
            <iframe></iframe>
            <button type="button">X</button>
        `;

        const iframe = this.shadowRoot.querySelector("iframe");
        iframe.addEventListener("load", () => this.#syncTheme());
        iframe.src = this.getAttribute("src") || "about:blank";
        iframe.title = this.getAttribute("title") || "user's profile";
        this.shadowRoot.querySelector("button").addEventListener("click", () => this.remove());
    }
}

customElements.define("app-iframe", AppIframe);