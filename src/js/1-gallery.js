import images from './imagesData.json';
import { createGalleryImagesTemplate } from './render-functions';
import SimpleLightbox from "simplelightbox";

function initGallery() {
  const galleryList = document.querySelector(".gallery");
  galleryList.innerHTML = createGalleryImagesTemplate(images);
  
  applyGalleryStyles(galleryList);
  initLightbox();
  applyGalleryItemsStyles();
}

function applyGalleryStyles(galleryElement) {
  const styles = {
    listStyleType: "none",
    width: "1128px",
    height: "648px",
    padding: "24px 156px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
    background: "#FFF",
    position: "relative"
  };
  
  Object.assign(galleryElement.style, styles);
}

function initLightbox() {
  new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250
  });
}

function applyGalleryItemsStyles() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  
  galleryItems.forEach(item => {
    item.style.width = "360px";
    item.style.height = "200px";
    
    const img = item.querySelector("img");
    if (img) {
      img.style.width = "360px";
      img.style.height = "200px";
    }
  });
}


initGallery();