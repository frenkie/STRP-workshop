( function () {

    /******************************************************/
    // IMAGE LISTING
    var imageList = document.querySelector('.image-list');

    imageList.addEventListener( 'click', function ( e ) {

        var clickTarget = e.path.shift();

        switch ( clickTarget.tagName.toLowerCase() ) {

            case 'input':
                if ( clickTarget.checked ) {
                    selectImage( clickTarget.id );
                } else {
                    deselectImage( clickTarget.id );
                }
                break;

            case 'button':
                eraseImage( clickTarget.id.split('delete-').pop() );
                break;
        }

    }, false );

    function refreshImageListing () {

        var request = new XMLHttpRequest();
        var imageData;

        request.open('GET', '/list', true );

        request.onload = function () {
            if ( request.status >= 200 && request.status < 400 ) {
                imageData = JSON.parse( request.responseText );

                if ( imageData && imageData.files ) {

                    imageList.innerHTML = '';

                    imageData.files.forEach( function ( file ) {

                        var img = document.createElement('img');
                        var item = document.createElement('li');
                        var selected = document.createElement('input');
                        var selectLabel = document.createElement('label');
                        var deleteBtn = document.createElement('button');
                        var imageId = file.name.split('/').pop().split('.').shift();

                        img.src = '/'+ file.name;
                        item.appendChild( img );

                        selected.type = 'checkbox';
                        selected.id = imageId;
                        selected.checked = file.selected;
                        item.appendChild( selected );

                        selectLabel.innerHTML = ' selected';
                        selectLabel.setAttribute( 'for', imageId );
                        item.appendChild( selectLabel );

                        deleteBtn.id = 'delete-'+ imageId;
                        deleteBtn.innerHTML = 'delete';
                        item.appendChild( deleteBtn );

                        imageList.appendChild( item );
                    });
                }
            }

        };

        request.send();
    }

    function deselectImage ( imageName ) {

        var request = new XMLHttpRequest();

        request.open('GET', '/deselect/'+ imageName, true );

        request.onload = function () {
            refreshImageListing();
        };

        request.send();
    }

    function eraseImage ( imageName ) {

        var request = new XMLHttpRequest();

        request.open('GET', '/erase/'+ imageName, true );

        request.onload = function () {
            refreshImageListing();
        };

        request.send();
    }

    function selectImage ( imageName ) {

        var request = new XMLHttpRequest();

        request.open('GET', '/select/'+ imageName, true );

        request.onload = function () {
            refreshImageListing();
        };

        request.send();
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
    // INIT

    refreshImageListing();



})();