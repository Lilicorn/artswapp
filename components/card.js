import "./username.js";

class AppCard extends HTMLElement {
    static observedAttributes = [
        "variant",
        "username",
        "handle",
        "tags",
        "images",
        "profile-image",
        "profile-href",
        "button-label"
    ];

    set user(data) {
        this._user = data;
        if (this.isConnected) this.render();
    }

    get user() {
        return this._user;
    }

    connectedCallback() {
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
        const buttonLabel = user.buttonLabel ?? this.getAttribute("button-label") ?? "View Profile";
        const imageSources = Array.isArray(images) ? images : images.split(/\s+/).filter(Boolean);
        const tagNames = Array.isArray(tags) ? tags : tags.split(",").map(tag => tag.trim()).filter(Boolean);

        this.classList.add("card");
        this.classList.remove("card--compact", "card--full");
        this.classList.add(`card--${variant}`);
        this.setAttribute("role", "article");
        this.setAttribute("aria-label", displayName);

        const imageGallery = document.createElement("div");
        imageGallery.className = "cardimage";
        for (const source of imageSources) {
            const image = document.createElement("img");
            image.src = source;
            image.alt = displayName;
            image.draggable = false;
            imageGallery.appendChild(image);
        }

        const caption = document.createElement("div");
        caption.className = "cardcaption";

        const name = document.createElement("app-username");
        name.className = "display";
        name.textContent = displayName;

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
        caption.append(tagList, profilePicture);

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = buttonLabel;
        if (profileHref) {
            button.addEventListener("click", () => {
                window.location.assign(profileHref);
            });
        }

        this.replaceChildren(imageGallery, caption, button);
    }
}

customElements.define("app-card", AppCard);
