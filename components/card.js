class ArtCard extends HTMLElement {
    static observedAttributes = [
        "variant",
        "username",
        "tags",
        "images",
        "profile-image",
        "profile-href",
        "button-label"
    ];

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        if (this.isConnected) this.render();
    }

    render() {
        const variant = this.getAttribute("variant") === "full" ? "full" : "compact";
        const usernameText = this.getAttribute("username") || "displayname";
        const tagsText = this.getAttribute("tags") || "";
        const imageSources = (this.getAttribute("images") || "").split(/\s+/).filter(Boolean);

        this.classList.add("card");
        this.classList.remove("card--compact", "card--full");
        this.classList.add(`card--${variant}`);
        this.setAttribute("role", "article");
        this.setAttribute("aria-label", usernameText);

        const imageGallery = document.createElement("div");
        imageGallery.className = "cardimage";
        for (const source of imageSources) {
            const image = document.createElement("img");
            image.src = source;
            image.alt = usernameText;
            imageGallery.appendChild(image);
        }

        const caption = document.createElement("div");
        caption.className = "cardcaption";

        const username = document.createElement("username");
        username.textContent = usernameText;

        const tags = document.createElement("tags");
        const tagNames = tagsText.split(",").map(tag => tag.trim()).filter(Boolean);
        if (tagNames.length > 0) {
            const tagIntro = document.createElement("span");
            tagIntro.textContent = "Because you're interested in:";
            tags.append(tagIntro, document.createElement("br"));
        }
        for (const tagName of tagNames) {
            const tag = document.createElement("tag");
            tag.textContent = tagName;
            tags.appendChild(tag);
        }

        const profilePicture = document.createElement("div");
        profilePicture.className = "cardpfp";
        const profileImageSource = this.getAttribute("profile-image");
        if (profileImageSource) {
            const profileImage = document.createElement("img");
            profileImage.src = profileImageSource;
            profileImage.alt = "";
            profilePicture.appendChild(profileImage);
        }

        caption.append(username, tags, profilePicture);

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = this.getAttribute("button-label") || "View Profile";
        const profileHref = this.getAttribute("profile-href");
        if (profileHref) {
            button.addEventListener("click", () => {
                window.location.assign(profileHref);
            });
        }

        this.replaceChildren(imageGallery, caption, button);
    }
}

customElements.define("art-card", ArtCard);
