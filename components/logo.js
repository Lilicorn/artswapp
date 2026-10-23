class Logo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
         this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    flex: 0 0 180px;
                    width: 180px;
                    height: 65px;
                    overflow: hidden;
                    transition: transform 0.2s;
                }

                :host(:hover) {
                    transform: scale(1.05);
                }

                * {
                    box-sizing: border-box;
                    padding: 0;
                    margin: 0;
                }

                a {
                    display: block;
                    width: 100%;
                    height: 100%;
                }

                .logo {
                    position: relative;
                    width: 180px;
                    height: 65px;
                    margin: 0 auto;
                }

                img {
                    position: absolute;
                    z-index: 0;
                    height: 40px;
                    padding: 0;
                    transform: translateX(0) scale(1);
                    transform-origin: center;
                    transition: all 0.35s ease-out;
                }

                #a1 {
                    top: 10px;
                    left: 3px;
                }

                #r {
                    top: 13px;
                    left: 20px;
                }

                #t {
                    top: 10px;
                    left: 35px;
                }

                #S {
                    top: 7px;
                    left: 50px;
                    height: 50px;
                    scale: 1;
                    rotate: 0deg;
                    translate: 0 0;
                    transition: transform 0.4s ease-out, scale 0.4s ease-out, rotate 1.2s ease-in-out, top 0.3s;
                }

                #w {
                    top: 10px;
                    left: 75px;
                    height: 45px;
                }

                #a2 {
                    top: 10px;
                    left: 97px;
                }

                #p1 {
                    top: 11px;
                    left: 110px;
                    height: 45px;
                }

                #p2 {
                    top: 13px;
                    left: 127px;
                    height: 45px;
                }

                img:hover:not(#S) {
                    z-index: 1;
                    transform: translateY(0) scale(1.1);
                    animation: float 1s ease-in-out infinite alternate;
                }

                img:hover ~ img {
                    transform: translateX(5px) scale(1);
                }

                .logo:has(#r:hover) #a1,
                .logo:has(#t:hover) #r,
                .logo:has(#S:hover) #t,
                .logo:has(#w:hover) #S,
                .logo:has(#a2:hover) #w,
                .logo:has(#p1:hover) #a2,
                .logo:has(#p2:hover) #p1 {
                    transform: translateX(-5px) scale(1);
                }

                #S:hover {
                    top: 9px;
                    scale: 1.1;
                    rotate: 360deg;
                    animation: float 1s ease-in-out infinite alternate;
                }

                @keyframes float {
                    from {
                        translate: 0 2px;
                    }

                    to {
                        translate: 0 -2px;
                    }
                }
            </style>

            <a href="../pages/home.html">
            <div class="logo">
                <img src="../logo/a1.PNG" id="a1">
                <img src="../logo/r.PNG" id="r">
                <img src="../logo/t.PNG" id="t">
                <img src="../logo/S.PNG" id="S">
                <img src="../logo/w.PNG" id="w">
                <img src="../logo/a2.PNG" id="a2">
                <img src="../logo/p1.PNG" id="p1">
                <img src="../logo/p2.PNG" id="p2">
            </div>
            </a>
        `;
    }
}

customElements.define('site-logo', Logo);
