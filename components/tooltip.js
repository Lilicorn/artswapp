class tooltipThing extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        if (!this.parentElement) {
            return;
        }

        const position = this.getAttribute('position') === 'top-right'
            ? 'pos-top-right'
            : 'pos-bottom-left';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: absolute;
                    inset: 0;
                    display: block;
                    z-index: 10;
                }

                .tooltip-container {
                    position: absolute;
                    visibility: hidden;
                    opacity: 0;
                    box-sizing: border-box;
                    width: 15vw;
                    padding: 10px 15px;
                    color: var(--text-color);
                    font-family: inherit;
                    font-size: 0.9rem;
                    font-weight: lighter;
                    text-align: left;
                    white-space: normal;
                    background-color: var(--complementary);
                    border: 2px solid var(--tooltip-border-color, var(--text-color));
                    border-bottom: 4px solid var(--tooltip-border-color, var(--text-color));
                    transition: opacity 0.5s;
                    transform-origin: top right;
                    pointer-events: auto;
                }

                .pos-bottom-left {
                    top: 115%;
                    right: 80%;
                    border-radius: 30px 0 30px 30px;
                }

                .pos-top-right {
                    bottom: 125%;
                    left: 100%;
                    border-radius: 30px 30px 30px 0;
                    transform-origin: bottom left;
                }

                :host([open]) .tooltip-container {
                    visibility: visible;
                    opacity: 1;
                    animation: hoverbubble 0.7s;
                }

                @keyframes hoverbubble {
                    0% {
                        transition-timing-function: ease-out;
                        transform: rotate(10deg) scale(1.2);
                    }
                    30% {
                        transition-timing-function: ease-in-out;
                        transform: rotate(-15deg);
                    }
                    70% {
                        transition-timing-function: ease-in-out;
                        transform: rotate(5deg) scale(0.95);
                    }
                    100% {
                        transition-timing-function: ease-in-out;
                        transform: rotate(0deg) scale(1);
                    }
                }

                @media (max-width: 912px) {
                    .tooltip-container {
                        width: 30vw;
                        padding: 10px 13px;
                    }

                    .pos-top-right {
                        width: 22vw;
                    }
                }
            </style>

            <div class="tooltip-container ${position}">
                <slot></slot>
            </div>
        `;

        this.trigger = this.parentElement;
        this.showTooltip = () => this.setAttribute('open', '');
        this.hideTooltip = event => {
            if (event.relatedTarget && this.trigger.contains(event.relatedTarget)) {
                return;
            }
            this.removeAttribute('open');
        };

        this.trigger.addEventListener('mouseenter', this.showTooltip);
        this.trigger.addEventListener('mouseleave', this.hideTooltip);
        this.trigger.addEventListener('focusin', this.showTooltip);
        this.trigger.addEventListener('focusout', this.hideTooltip);
    }

    
}

customElements.define('my-tooltip', tooltipThing);
