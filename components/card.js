import "./username.js";

class AppCard extends HTMLElement {
    static observedAttributes = [
        "variant",
        "username",
        "handle",
        "tags",
        "images",
        "profile-image",
        "profile-href"
    ];

    set user(data) {
        this._user = data;
        if (this.isConnected) this.render();
    }

    get user() {
        return this._user;
    }

    connectedCallback() {
        if (!this._tapToExpandHandler) {
            this._tapToExpandHandler = event => {
                if (
                    event.detail === 0 ||
                    !window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
                    !this.classList.contains("card--compact") ||
                    (event.target instanceof Element && event.target.closest("button"))
                ) return;

                this.classList.toggle("card--expanded");
            };
            this.addEventListener("click", this._tapToExpandHandler);
        }

        this.render();
    }

    attributeChangedCallback() {
        if (this.isConnected) this.render();
    }

    render() {
        const user = this._user || {};
        const variant = this.getAttribute("variant") === "full" ? "full" : "compact";
        const displayName = user.displayName ?? this.getAttribute("username") ?? "displayname";
        const username = user.username ?? this.getAttribute("handle") ?? "";
        const tags = user.tags ?? this.getAttribute("tags") ?? [];
        const images = user.images ?? this.getAttribute("images") ?? [];
        const profileImage = user.profileImage ?? this.getAttribute("profile-image");
        const profileHref = user.profileHref ?? this.getAttribute("profile-href");
        const imageSources = Array.isArray(images) ? images : images.split(/\s+/).filter(Boolean);
        const tagNames = Array.isArray(tags) ? tags : tags.split(",").map(tag => tag.trim()).filter(Boolean);
        const isAuction = Boolean(user.auction?.endsAt || this.getAttribute("ends-at"));

        this.classList.add("card");
        this.classList.remove("card--compact", "card--full");
        this.classList.add(`card--${variant}`);

        const imageGallery = document.createElement("div");
        imageGallery.className = "cardimage";
        for (const source of imageSources) {
            const image = document.createElement("img");
            image.src = source;
            image.alt = displayName + "'s art";
            image.draggable = false;
            imageGallery.appendChild(image);
        }
        if(isAuction) imageGallery.style.overflow = "hidden";

        const caption = document.createElement("div");
        caption.className = "cardcaption";

        const name = document.createElement("app-username");
        name.className = "display";
        name.textContent = displayName;

        //aukciohoz
        this._clearTimer();

        let infoBlock;
        if (isAuction) {
            const endsAt = user.auction?.endsAt ?? this.getAttribute("ends-at");
            const timerBox = document.createElement("div");
            timerBox.className = "cardauctiontimer";

            
            const countdown = document.createElement("span");
            countdown.className = "cardtimervalue";

            timerBox.append(countdown);
            this._mountTimer(countdown, endsAt);
            infoBlock = timerBox;
            } 
            else {
                const tagList = document.createElement("tags");
                    const tagItems = document.createElement("div");
                    tagItems.className = "cardtagitems";
                    if (tagNames.length > 0) {
                        const tagIntro = document.createElement("span");
                        tagIntro.className = "cardtaglabel";
                        tagIntro.textContent = user.tagsLabel || "Because you're interested in:";
                        tagList.appendChild(tagIntro);
                    }
                    for (const tagName of tagNames) {
                        const tag = document.createElement("tag");
                        tag.textContent = tagName;
                        tagItems.appendChild(tag);
                    }
                    tagList.appendChild(tagItems);
                infoBlock = tagList;
            }


        

        const profilePicture = document.createElement("div");
        profilePicture.className = "cardpfp";
        if (profileImage) {
            const profileImageElement = document.createElement("img");
            profileImageElement.src = profileImage;
            profileImageElement.alt = "";
            profilePicture.appendChild(profileImageElement);
        }

        caption.append(name);
        if (username) {
            const handle = document.createElement("app-username");
            handle.className = "cardhandle handle";
            handle.textContent = username;
            caption.appendChild(handle);
        }
        caption.append(infoBlock, profilePicture);

        
        //gomb

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = isAuction
            ?  "View Auction"
            :  "View Profile";

        if (isAuction) {
            button.addEventListener("click", () => {
                this.dispatchEvent(new CustomEvent("open-an-auction", {
                    bubbles: true,
                    composed: true,
                    detail: {
                        url: user.auction?.href || profileHref,
                        name: displayName,
                        //endsAt: user.auction?.endsAt ?? this.getAttribute("ends-at"),
                        color: getComputedStyle(this).getPropertyValue("--accent-color").trim()
                    }
                }));
            });
        } 
        else if (profileHref) {
            button.addEventListener("click", () => {
                this.dispatchEvent(new CustomEvent("open-a-profile", {
                    bubbles: true,
                    composed: true,
                    detail: {
                        url: profileHref,
                        name: displayName,
                        color: getComputedStyle(this).getPropertyValue("--accent-color").trim()
                    }
                }));
            });
        }

        this.replaceChildren(imageGallery, caption, button);
    }



    //aukciohoz
        disconnectedCallback() {
            this._clearTimer();
        }

        _clearTimer() {
            if (this._timerInterval) {
                clearInterval(this._timerInterval);
                this._timerInterval = null;
            }
        }

        _formatRemaining(endsAt) {
            const target = typeof endsAt === "number" ? endsAt : new Date(endsAt).getTime();
            const diff = target - Date.now();
            if (Number.isNaN(diff) || diff <= 0) return "Auction ended";

            const totalSec = Math.floor(diff / 1000);
            const hours = Math.floor(totalSec / 3600);
            const minutes = Math.floor((totalSec % 3600) / 60);
            const seconds = totalSec % 60;

            return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
        }

        _mountTimer(timerElement, endsAt) {
            this._clearTimer();
            const update = () => {
                timerElement.textContent = `⏳ ${this._formatRemaining(endsAt)}`;
            };
            update();
            this._timerInterval = setInterval(update, 1000);
        }
}

customElements.define("app-card", AppCard);
