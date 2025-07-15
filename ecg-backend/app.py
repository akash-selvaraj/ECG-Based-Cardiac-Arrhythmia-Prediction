from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from io import BytesIO
from PIL import Image
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*']
)

# Load the saved model
model = load_model(r'D:\projects\ecg\ecg-backend\trained_model\resnet50_model2.keras')

# Class mapping
class_mapping = {0: 'F', 1: 'M', 2: 'N', 3: 'Q', 4: 'S', 5: 'V'}

# Function to load and preprocess the image
def preprocess_image(img: Image.Image, target_size=(224, 224)):
    img = img.resize(target_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0
    return img_array

# Prediction route
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Load the image
    contents = await file.read()
    img = Image.open(BytesIO(contents))

    # Convert to RGB (if needed) and to JPG format
    if img.format != 'JPEG':
        img = img.convert('RGB')

    # Preprocess the image
    img_array = preprocess_image(img)

    # Make prediction
    prediction = model.predict(img_array)
    predicted_class_idx = np.argmax(prediction, axis=1)[0]

    # Map predicted index to class label
    predicted_class_label = class_mapping[predicted_class_idx]
    print("Predicted class:", predicted_class_label)
    
    return JSONResponse({"class_label": predicted_class_label, "details": f"Prediction details for {predicted_class_label}"})
