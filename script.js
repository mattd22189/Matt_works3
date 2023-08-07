
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".background");
  const images = document.querySelectorAll(".bounce-image");
  let isDragging = false;
  let offset = { x: 0, y: 0 };
  let currentImage = null;

  images.forEach(image => {
      image.addEventListener("mouseover", () => {
          image.style.transform = "scale(1.2)";
      });

      image.addEventListener("mouseout", () => {
          image.style.transform = "scale(1)";
      });

      image.addEventListener("mousedown", e => {
          isDragging = true;
          currentImage = e.target;
          offset.x = e.clientX - currentImage.getBoundingClientRect().left;
          offset.y = e.clientY - currentImage.getBoundingClientRect().top;
      });

      image.addEventListener("mouseup", () => {
          isDragging = false;
          currentImage = null;
      });
  });

  function animateImages() {
      images.forEach(image => {
          const containerWidth = container.offsetWidth - image.offsetWidth;
          const containerHeight = container.offsetHeight - image.offsetHeight;

          let x = Math.random() * containerWidth;
          let y = Math.random() * containerHeight;

          let xDirection = 1;
          let yDirection = 1;

          let speedX = 1 + Math.random() * 2;
          let speedY = 1 + Math.random() * 2;

          function moveImage() {
              if (isDragging && currentImage === image) {
                  x = event.clientX - container.getBoundingClientRect().left - offset.x;
                  y = event.clientY - container.getBoundingClientRect().top - offset.y;
              } else {
                  x += xDirection * speedX;
                  y += yDirection * speedY;

                  if (x <= 0 || x >= containerWidth) {
                      xDirection *= -1;
                  }

                  if (y <= 0 || y >= containerHeight) {
                      yDirection *= -1;
                  }
              }

              image.style.left = `${x}px`;
              image.style.top = `${y}px`;

              requestAnimationFrame(moveImage);
          }

          requestAnimationFrame(moveImage);
      });
  }

  animateImages();
});