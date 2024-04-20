document.addEventListener('DOMContentLoaded', function () {
    const pieces = document.querySelector('.map-pieces');
    const piecesArr = Array.from(pieces.children);
    const resetBtn = document.getElementById('resetBtn');

    // display the selected data at the bottom of the page
    const dataGreyArr = document.querySelector('.data-grey');
    const dataBossloc = document.querySelector('.data-bossloc');


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
        cleanUpSelected();
        dataGreyArr.textContent = '';
        dataBossloc.textContent = '';
    });

    // select greyed out pieces
    document.getElementById('okBtn').addEventListener('click', function () {
        const selectedPieces = document.querySelectorAll('.map-piece');
        const selectedArray = Array.from(selectedPieces).map(piece => piece.classList.contains('selected') ? 0 : 1);
        
        // display the selected pieces array at the bottom of the page, separated by underscores

        // alert(`${mapNum}\nSelected pieces array: [${selectedArray}]`);
        dataGreyArr.textContent = selectedArray.join('_');
        cleanUpSelected();
    });

    // select boss location
    document.getElementById('okBtn2').addEventListener('click', function () {
        // get index of selected pieces
        const selectedPieces = document.querySelectorAll('.map-piece');
        const selectedArray = Array.from(selectedPieces).map(piece => piece.classList.contains('selected') ? 1 : 0);
        // check how many pieces are selected
        if (selectedArray.filter(piece => piece === 1).length !== 1) {
            dataBossloc.textContent = "0 or more than one piece selected";
        } else {
            const selectedIdx = selectedArray.indexOf(1);
            dataBossloc.textContent = selectedIdx;
        }
        cleanUpSelected();
    });

    function cleanUpSelected() {
        piecesArr.forEach(piece => {
            piece.classList.remove('selected');
        });
    }
});
