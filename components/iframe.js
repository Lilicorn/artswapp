class AppIframe extends HTMLElement {
    static observedAttributes = ["src", "title", "framecolor"];

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
        const frameColor = this.getAttribute("framecolor") || "var(--accent-color)";
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: grid;
                    place-items: center;
                    grid-template-rows: minmax(0, 1fr);
                    --accent-color: ${frameColor};
                }
                iframe {
                    display: block;
                    width: 100%;
                    height: 100%;
                    min-width: 0;
                    min-height: 0;
                    box-sizing: border-box;
                    border: 5px solid var(--accent-color);
                    border-bottom-width: 15px;
                    border-radius: 32px;
                    background: var(--background-color);
                }
                @media (max-width: 912px) {
                    iframe {
                        border-width: 4px 4px 12px;
                    }
                }
                @media (max-width: 500px) {
                    iframe {
                        border-width: 3px 3px 9px;
                    }
                }
                @media (max-width: 370px) {
                    iframe {
                        border-width: 2px 2px 6px;
                    }
                }
                    button {
                        position: absolute;
                        top: calc(max(12px, env(safe-area-inset-top)) + 14px);
                        right: calc(max(12px, 5vw) + 14px);
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