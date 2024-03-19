document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('upload-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        var fileInput = document.getElementById('image-input');
        var imagePreview = document.getElementById('image-preview');

        // Check if a file is selected
        if (fileInput.files.length > 0) {
            var file = fileInput.files[0];
            var formData = new FormData();
            formData.append('file', file);

            // Send the file to the backend
            fetch('/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Display the preview image returned by the backend
                var imageElement = document.createElement('img');
                imageElement.src = 'data:image/jpeg;base64,' + data.preview;
                imageElement.setAttribute('alt', 'Uploaded Image');
                imageElement.setAttribute('id', 'uploaded-image');
                imagePreview.innerHTML = '';
                imagePreview.appendChild(imageElement);
            })
            .catch(error => console.error('Error:', error));
        }
    });
});