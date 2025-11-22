document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    let currentImageIndex;
    const images = [];

    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        images.push(img.src);

        item.addEventListener('click', () => {
            lightbox.classList.add('active');
            lightboxImg.src = img.src;
            currentImageIndex = index;
        });
    });

    function showImage(index) {
        if (index >= images.length) {
            index = 0;
        } else if (index < 0) {
            index = images.length - 1;
        }
        lightboxImg.src = images[index];
        currentImageIndex = index;
    }

    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
    }

    if(prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage(currentImageIndex - 1);
        });
    }

    if(nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage(currentImageIndex + 1);
        });
    }

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
            } else if (e.key === 'ArrowLeft') {
                showImage(currentImageIndex - 1);
            } else if (e.key === 'ArrowRight') {
                showImage(currentImageIndex + 1);
            }
        }
    });
});
