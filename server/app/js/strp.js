( function () {

    /******************************************************/
    // IMAGE LISTING

    function refreshImageListing () {

    }

    /******************************************************/
    // IMAGE UPLOAD

    var uploading = false;
    var imageDropZone = document.querySelector( '.image-dropper' );
    var imagePreview = document.querySelector( '.image-preview' );
    var imageUploader = document.querySelector('.image-upload');

    imageDropZone.addEventListener( 'dragover', handleDragOver, false );
    imageDropZone.addEventListener( 'drop', handleImageDrop, false );

    imageUploader.addEventListener( 'click', doUpload, false );

    function doUpload () {
        var img = imagePreview.querySelector('img');
        var request = new XMLHttpRequest();

        if ( img && ! uploading ) {

            uploading = true;

            request.open('POST', '/upload', true);
            request.setRequestHeader('Content-Type', 'text/plain; charset=UTF-8');

            request.onload = function () {
                uploading = false;
                refreshImageListing();
            };

            request.onerror = function () {
                alert('There was an error while saving');
                uploading = false;

            }.bind( this );

            request.send( img.src );
        }
    }

    function handleDragOver ( e ) {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }

    function handleImageDrop ( e ) {
        e.stopPropagation();
        e.preventDefault();

        var files = e.dataTransfer.files;

        readImage( files[0] );
    }

    function readImage ( file ) {

        var reader = new FileReader();

        reader.onload = function ( e ) {

            onImageImported( e.target.result );

        }.bind( this );

        // Read in the Image file as a Data URL.
        reader.readAsDataURL( file );
    }

    function onImageImported ( imageData ) {
        var img = new Image();
        img.src = imageData;

        imagePreview.innerHTML = '';
        imagePreview.appendChild( img );
    }



    /******************************************************/
    // IMAGE ERASE


    /******************************************************/


})();