from flask import Flask, request, jsonify
from PIL import Image
import io

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload():
    # Check if the POST request has the file part
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    # If the user does not select a file, the browser submits an empty file without a filename
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    # Process the uploaded image
    image = Image.open(io.BytesIO(file.read()))

    # Generate a smaller preview image
    preview_image = image.copy()
    preview_image.thumbnail((300, 300))  # Resize to maximum 300x300 pixels

    # Convert the preview image to bytes for sending back to the frontend
    preview_bytes = io.BytesIO()
    preview_image.save(preview_bytes, format='JPEG')
    preview_bytes.seek(0)

    return jsonify({'preview': preview_bytes.read().decode('latin1')})

if __name__ == '__main__':
    app.run(debug=True)
