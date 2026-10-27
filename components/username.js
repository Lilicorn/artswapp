class AppUsername extends HTMLElement {
    connectedCallback() {
        this.ensureTextElement();
        this._mutationObserver = new MutationObserver(() => {
            this.ensureTextElement();
            this.fitText();
        });
        this._mutationObserver.observe(this, {
            childList: true,
            characterData: true,
            subtree: true
        });

        if (typeof ResizeObserver !== "undefined") {
            this._resizeObserver = new ResizeObserver(() => this.scheduleFit());
            this._resizeObserver.observe(this);
        }
        window.addEventListener("resize", this._onResize);

        this.fitText();
    }

    disconnectedCallback() {
        this._mutationObserver?.disconnect();
        this._resizeObserver?.disconnect();
        window.cancelAnimationFrame(this._fitFrame);
        window.removeEventListener("resize", this._onResize);
    }

    ensureTextElement() {
        if (this.firstElementChild?.classList.contains("app-username-text")) return;

        const text = document.createElement("span");
        text.className = "app-username-text";
        text.textContent = this.textContent;
        this.replaceChildren(text);
    }

    fitText() {
        const text = this.firstElementChild;
        if (!text?.classList.contains("app-username-text")) return;

        this.classList.remove("app-username--wrapped");
        text.style.removeProperty("font-size");
        const baseSize = Number.parseFloat(getComputedStyle(text).fontSize);
        const availableWidth = this.clientWidth;
        if (!baseSize || availableWidth <= 0 || !text.textContent) return;

        const measureWidth = () => this.scrollWidth;
        if (measureWidth() <= availableWidth) return;

        const minSize = Math.min(
            baseSize,
            Number.parseFloat(getComputedStyle(this).getPropertyValue("--app-username-min-size")) || 10
        );

        text.style.fontSize = `${minSize}px`;
        if (measureWidth() > availableWidth) {
            this.classList.add("app-username--wrapped");
            return;
        }

        let low = minSize;
        let high = baseSize;
        while (high - low > 0.1) {
            const middle = (low + high) / 2;
            text.style.fontSize = `${middle}px`;
            if (measureWidth() <= availableWidth) low = middle;
            else high = middle;
        }

        text.style.fontSize = `${low}px`;
    }

    scheduleFit() {
        if (this._fitFrame !== undefined) return;
        this._fitFrame = window.requestAnimationFrame(() => {
            this._fitFrame = undefined;
            this.fitText();
        });
    }

    _onResize = () => this.scheduleFit();
}

customElements.define("app-username", AppUsername);
