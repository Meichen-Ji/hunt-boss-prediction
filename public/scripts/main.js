document.addEventListener('DOMContentLoaded', function () {
    const pieces = document.querySelector('.map-pieces');
    const piecesArr = Array.from(pieces.children);
    const resetBtn = document.getElementById('resetBtn');


    pieces.addEventListener('click', function (event) {
        // get all img in a list
        const imgs = document.querySelectorAll('img');
        // get the coordinates of the clicked position relative to the viewport
        const x = event.clientX;
        const y = event.clientY;
        // iterate over all the images
        imgs.forEach(img => {
            // create a canvas element
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            // set canvas dimensions equal to image dimensions
            canvas.width = img.width;
            canvas.height = img.height;
            // draw the image onto the canvas
            context.drawImage(img, 0, 0);
            // get the position of the image within the viewport
            const imgRect = img.getBoundingClientRect();
            // get the pixel data of the clicked coordinates on the canvas
            const pixel = context.getImageData(x - imgRect.left, y - imgRect.top, 1, 1).data;
            // if the pixel is not transparent, then add the selected class to img
            if (pixel[3] !== 0) {
                img.classList.toggle('selected');
                // break the loop
                return;
            }
        });
    });
    

    resetBtn.addEventListener('click', function () {
        piecesArr.forEach(piece => {
            piece.classList.remove('selected');
        });
    });

    document.getElementById('okBtn').addEventListener('click', function () {
        const selectedPieces = document.querySelectorAll('.map-piece');
        const selectedArray = Array.from(selectedPieces).map(piece => piece.classList.contains('selected') ? 0 : 1);
        alert(`Selected pieces array: [${selectedArray}]`);
    });
});
