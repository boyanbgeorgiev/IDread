from flask import Flask, request, jsonify
from PIL import Image
import pytesseract

app = Flask(__name__)

@app.route('/api/scan', methods=['POST'])
def scan_image():
    # Check if a file is present in the request
    if 'image' not in request.json:
        return jsonify({'error': 'No image provided'}), 400

    # Extract image data from the request
    image_base64 = request.json['image']

    try:
        # Decode base64 image data
        image_data = image_base64.split('base64,')[1].encode()

        # Convert base64 image data to PIL Image object
        image = Image.open(BytesIO(base64.b64decode(image_data)))

        # Perform OCR using Tesseract
        extracted_text = pytesseract.image_to_string(image)

        # Return the extracted text as JSON response
        return jsonify({'text': extracted_text}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
