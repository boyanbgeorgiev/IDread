document.addEventListener("DOMContentLoaded", function () {
    var dropzone = document.getElementById("dropzone");
  
    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.classList.remove("border-indigo-600");
      var file = e.dataTransfer.files[0];
  
      // Save the file to the input
      var input = document.getElementById("file");
      input.files = e.dataTransfer.files;
  
      displayPreview(file);
    });
  
    var input = document.getElementById("file");
  
    input.addEventListener("change", (e) => {
      var file = e.target.files[0];
  
      displayPreview(file);
    });
  
    function displayPreview(file) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        alert("Only PNG and JPEG files are allowed.");
        return;
      }
  
      var reader = new FileReader();
  
      reader.onload = () => {
        var preview = document.getElementById("preview");
        preview.src = reader.result;
        preview.classList.remove("hidden");
  
        // Display file name
        var fileNameDisplay = document.getElementById("file-name");
        fileNameDisplay.textContent = file.name;
      };
  
      reader.readAsDataURL(file);
    }
  
    document.querySelector("#scan").addEventListener("submit", (e) => {
      e.preventDefault();
  
      var fileInput = document.querySelector("input#file");
  
      if (fileInput.files.length > 0) {
        var file = fileInput.files[0];
  
        var reader = new FileReader();
        reader.onloadend = function () {
          var img = new Image();
          img.onload = function () {
              // Create a canvas element to work with the image
              var canvas = document.createElement('canvas');
              var ctx = canvas.getContext('2d');
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0);
  
              // Perform OCR using Tesseract
              Tesseract.recognize(
                  canvas,
                  'eng', // Language code (e.g., 'eng' for English)
                  { logger: m => console.log(m) } // Optional logger
              ).then(({ data: { text } }) => {
                  // Display the extracted text
                  console.log(text);
                  let resultsElem = document.getElementById("results");
                  resultsElem.classList.remove("hidden");
                  let descElem = document.getElementById("shark-desc");
                  descElem.textContent = text;
              });
          };
          img.src = reader.result;
        };
        reader.readAsDataURL(file); // Converts the file to Base64
      }
    });
  });
