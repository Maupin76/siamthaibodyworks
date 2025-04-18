// ===== Hero Section Image Slideshow =====
const images = [
  "./images/aromaTherapy.jpg",
  "./images/aromaTherapy2.jpg",
  "./images/Stretch.jpg",
  "./images/heatTherapy.jpg"
];

const mainImage = document.querySelector('.hero-section__main-image');
let currentImageIndex = 0;

function changeImage() {
  if (!mainImage) return; // Safety check if image is missing

  mainImage.style.opacity = 0; // Fade out

  setTimeout(() => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    mainImage.src = images[currentImageIndex];
    mainImage.style.opacity = 1; // Fade back in
  }, 1000); // 1 second matches the CSS transition time
}

setInterval(changeImage, 3500); // Change every 5 seconds
