class BubbleArrow extends HTMLElement {
    constructor() {
        super();

        const root = this.attachShadow({ mode: "open" });
        root.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 25px;
                    height: 30px;
                    pointer-events: none;
                }

                svg {
                    display: block;
                    width: 100%;
                    height: 100%;
                    overflow: visible;
                    transform: rotate(var(--arrow-rotation, 0deg));
                    transform-origin: top right;
                }

                .fill {
                    fill: var(--complementary, white);
                }

                .outline {
                    fill: none;
                    stroke: var(--text-color, black);
                    stroke-width: 18;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                }

                .outline-top {
                    fill: none;
                    stroke: var(--complementary, white);
                    stroke-width: 18;
                    stroke-linecap: round;
                }
            </style>

            <svg viewBox="0 0 200 200" aria-hidden="true">
                <!-- 1. Réteg: Teljes belső kitöltés -->
                <path class="fill" d="M 135 10 L 55 10 L 20 85 L 65 95 L 42 178 L 155 90 L 115 80 Z" />

                <!-- 2. Réteg: Felső él (háttérszínű) -->
                <path class="outline-top" d="M 135 10 L 55 10" />

                <!-- 3. Réteg: Fekete keret a rajzod szerinti START -> STOP vonalon -->
                <path class="outline" d="M 135 10 L 115 80 L 155 90 L 42 178 L 65 95 L 20 85 L 55 10" />
            </svg>
        `;
    }
}

customElements.define("bubble-arrow", BubbleArrow);