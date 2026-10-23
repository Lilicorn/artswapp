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
                    transition: 0.5s, background-color 0.0s, color 0.0s;
                    position: absolute;
                    visibility: hidden;
                    opacity: 0;
                    box-sizing: border-box;
                    width: 20vw;
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

                 .pos-top-right{
                    top: 115%;
                    right: 80%;
                    border-radius: 30px 0 30px 30px;
                }

                .pos-bottom-left{
                    bottom: 140%;
                    left: 100%;
                    border-radius: 30px 30px 30px 0;
                    transform-origin: bottom left;
                }

                
                :host([open]) .tooltip-container {
                    visibility: visible;
                    opacity: 1;
                    animation: hoverbubble 0.7s;
                }

                .tooltip-container > bubble-arrow {
                    position: absolute;
                    width: 25px;
                    height: 30px;
                    pointer-events: none;
                }

                .pos-bottom-left > bubble-arrow {
                    bottom: -27px;
                    left: -8px;
                    --arrow-rotation: 0deg;
                }

                .pos-top-right > bubble-arrow {
                    top: -27px;
                    right: -3px;
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
                
            </style>
            <div class="tooltip-container ${position}">
            <bubble-arrow class="dropdown-arrow" aria-hidden="true"></bubble-arrow>
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
