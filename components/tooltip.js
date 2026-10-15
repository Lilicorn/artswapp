class tolltip extends HTMLElement{

    #initialized = false


    connectedCallback(){
        if (!this.#initialized) {
            this.#initialize()
            this.#initialized = true
        }
    }

    #initialize(){
        let root = this.attachShadow({mode: 'open'})
        root.innerHTML =  `
    <style>
        position: absolute;
    visibility: hidden;
    opacity: 0;

    color: var(--text-color);
    font-size: 0.9rem;
    font-weight: lighter;
    text-align: left;
    background-color: var(--complementary);
    border: 2px solid var(--text-color);
    border-bottom: 4px solid var(--text-color);
    padding: 10px 15px;
    width: 15vw;
    
    transform-origin: top right;
    transition: opacity 0.5s;

    z-index: 10;
    top: 115%; 
    right: 80%;
    border-radius: 30px 0px 30px 30px;
    </style>
    <div class="tooltip">hi</div>
    `
    }

   
}
customElements.define("tooltip", tolltip);