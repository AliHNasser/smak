/* Start Portfolio */
// Images Gallery v1.1
/* Start Get All The Gallery Images */
let requestGalleryImages = new XMLHttpRequest();
requestGalleryImages.open("GET", "../json/galleryImages.json");
requestGalleryImages.send();
requestGalleryImages.addEventListener("readystatechange", (ev) => {
    if (requestGalleryImages.readyState === 4 && requestGalleryImages.status === 200) {
        let jsObject = JSON.parse(requestGalleryImages.responseText)
        for (let i = 0; i < Object.keys(jsObject).length; i++) {
            const currentObject = jsObject[`${Object.keys(jsObject)[i]}`];
            let imageDiv = document.createElement("div");
            imageDiv.classList.add("image");
            const imageTypeAttribute = document.createAttribute("imagetype");
            imageDiv.setAttributeNode(imageTypeAttribute);
            imageDiv.setAttribute("imagetype", currentObject.imageType);
            const imageTitleAttribute = document.createAttribute("imageTitle");
            imageDiv.setAttributeNode(imageTitleAttribute);
            imageDiv.setAttribute("imageTitle", currentObject.imageTitle);
            const imageDescriptionAttribute = document.createAttribute("imageDescription");
            imageDiv.setAttributeNode(imageDescriptionAttribute);
            imageDiv.setAttribute("imageDescription", currentObject.imageDescription);
            // ******************************Internal Image******************************
            let internalImage = document.createElement("img");
            const srcAttribute = document.createAttribute("src");
            internalImage.setAttributeNode(srcAttribute);
            internalImage.setAttribute("src", currentObject.imageURL);
            const altAttribute = document.createAttribute("alt");
            internalImage.setAttributeNode(altAttribute);
            internalImage.setAttribute("alt", currentObject.imageAlt);
            imageDiv.appendChild(internalImage);
            // Append Image In Gallery
            document.querySelector(".portfolio .gallery").appendChild(imageDiv);
        }
/* End Get All The Gallery Images */

        // Add The Events On All Types
        const allTypes = document.querySelectorAll(".portfolio .container .shuffle ul li");
        const portfolioImages = document.querySelectorAll(".portfolio .gallery .image");

        allTypes.forEach((element) => {
            if (element.getAttribute("imageType") === "all") {
                element.addEventListener("click", () => {
                    document.querySelector(".portfolio .gallery").innerHTML = "";
                    let allImagesOfThisType = [];
                    portfolioImages.forEach((image) => {
                        allImagesOfThisType.push(image);
                    })
                    allImagesOfThisType.forEach((image) => {
                        document.querySelector(".portfolio .gallery").appendChild(image);
                    })
                })
            } else {
                element.addEventListener("click", () => {
                    document.querySelector(".portfolio .gallery").innerHTML = "";
                    let allImagesOfThisType = [];
                    portfolioImages.forEach((image) => {
                        allImagesOfThisType.push(image);
                    })
                    allImagesOfThisType.forEach((image) => {
                        if (image.getAttribute("imagetype") === element.getAttribute("imageType")) {
                            document.querySelector(".portfolio .gallery").appendChild(image);
                        }
                    })
                })
            }
        })

        portfolioImages.forEach((image) => {
            image.addEventListener("click", () => {
                if (document.querySelector(".portfolio .container").getElementsByClassName("current-image").length > 0) {
                    // Changing The Image
                    document.querySelector(".portfolio .container .current-image .image img").setAttribute("src", image.querySelector("img").getAttribute("src"));
                    document.querySelector(".portfolio .container .current-image .image img").setAttribute("alt", image.querySelector("img").getAttribute("alt"));
                    // Changing The Text Info
                    document.querySelector(".portfolio .container .current-image .text h2").innerHTML = image.getAttribute("imagetitle");
                    document.querySelector(".portfolio .container .current-image .text p").innerHTML = image.getAttribute("imagedescription");
                } else {
                    const currentImageDiv = document.createElement("div");
                    currentImageDiv.classList.add("current-image");
    
                    const imageDiv = document.createElement("div");
                    imageDiv.classList.add("image");
                    const internalImage = document.createElement("img");
                    const srcAttribute = document.createAttribute("src");
                    internalImage.setAttributeNode(srcAttribute);
                    internalImage.setAttribute("src", image.querySelector("img").getAttribute("src"));
                    const altAttribute = document.createAttribute("alt");
                    internalImage.setAttributeNode(altAttribute);
                    internalImage.setAttribute("alt", image.querySelector("img").getAttribute("alt"));
                    imageDiv.appendChild(internalImage);
                    currentImageDiv.appendChild(imageDiv);
    
                    const imageText = document.createElement("div");
                    imageText.classList.add("text");
                    const internalH2 = document.createElement("h2");
                    const internalH2Text = document.createTextNode(image.getAttribute("imagetitle"));
                    internalH2.appendChild(internalH2Text);
                    imageText.appendChild(internalH2);
                    const internalParagraph = document.createElement("p");
                    const internalParagraphText = document.createTextNode(image.getAttribute("imagedescription"));
                    internalParagraph.appendChild(internalParagraphText);
                    imageText.appendChild(internalParagraph);
                    const viewLink = document.createElement("a");
                    viewLink.addEventListener("click", (event) => {
                        const bigPictureDiv = document.createElement("div");
                        bigPictureDiv.classList.add("big-picture");
                        // Internal Image Div
                        const internalBigPictureDiv = document.createElement("div");
                        internalBigPictureDiv.classList.add("image");
                        // Internal img
                        const internalBigPictureImg = document.createElement("img");
                        const internalBigPictureImgSrc = document.createAttribute("src");
                        internalBigPictureImg.setAttributeNode(internalBigPictureImgSrc);
                        internalBigPictureImg.setAttribute("src", document.querySelector(".portfolio .container .current-image .image img").getAttribute("src"));
                        const internalBigPictureImgAlt = document.createAttribute("alt");
                        internalBigPictureImg.setAttributeNode(internalBigPictureImgAlt);
                        internalBigPictureImg.setAttribute("alt", document.querySelector(".portfolio .container .current-image .image img").getAttribute("alt"));
                        internalBigPictureDiv.appendChild(internalBigPictureImg);
                        bigPictureDiv.appendChild(internalBigPictureDiv);
                        // Exit Big Picture Button
                        const exitButton = document.createElement("i");
                        exitButton.classList.add("fas", "fa-times");
                        exitButton.addEventListener("click", () => document.querySelector(".portfolio .container .big-picture").remove());
                        bigPictureDiv.appendChild(exitButton);
                        document.querySelector(".portfolio .container .current-image").after(bigPictureDiv);
                        event.preventDefault();
                    })
                    const internalViewLinkText = document.createTextNode("View In Big Picture");
                    viewLink.appendChild(internalViewLinkText);
                    imageText.appendChild(viewLink);
                    currentImageDiv.appendChild(imageText);

                    const exitPreview = document.createElement("i");
                    exitPreview.classList.add("fas", "fa-times");
                    exitPreview.addEventListener("click", () => {
                        document.querySelector(".portfolio .container .current-image").remove();
                    })
                    currentImageDiv.appendChild(exitPreview);

                    document.querySelector(".portfolio .container .shuffle").after(currentImageDiv);
                }
            })
        })
    }
})
/* End Portfolio */
/* Start Skills */
const allSkills = document.querySelectorAll(".skills .container .circles .circle");
allSkills.forEach((element) => {
    element.children[0].children[0].innerHTML = `${element.children[0].getAttribute("percentage")}%`;
    element.children[0].querySelector(".fill").style.cssText = `width: ${element.children[0].getAttribute("percentage")}%`
});
/* End Skills */