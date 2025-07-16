### ❤️ ECG Care – AI-Powered Cardiac Arrhythmia Detection System

**ECG Care** is a web-based deep learning platform designed to predict cardiac arrhythmias from ECG images. It supports instant analysis of uploaded ECG scans and delivers precise predictions using a fine-tuned **ResNet50 model** trained on annotated ECG images.

> Upload ECG Image → Predict Class → Visualize Signal → Receive Health Tips

---

## 💡 Key Features

* 📤 Upload `.jpg` ECG scan images
* 🧠 One-click **Prediction** using ResNet50
* 📈 Real-time waveform visualization
* 🩺 Display of **predicted arrhythmia class**
* 📋 Health suggestions based on condition
---

## 🧠 Supported Arrhythmia Categories

Based on **AAMI classification standards**, this model predicts five broad arrhythmia categories:

| Category | Includes Annotations                                                       |
| -------- | -------------------------------------------------------------------------- |
| **N**    | Normal, Left/Right Bundle Branch Block, Atrial Escape, Nodal Escape        |
| **S**    | Atrial Premature, Aberrant Atrial Premature, Nodal Premature, SV Premature |
| **V**    | Premature Ventricular Contraction (PVC), Ventricular Escape                |
| **F**    | Fusion of Ventricular and Normal                                           |
| **Q**    | Paced, Fusion of Paced and Normal, Unclassifiable                          |

---

## 🖼️ User Interface

<img width="1642" height="1075" alt="Untitled design" src="https://github.com/user-attachments/assets/aeafa54d-e033-4af5-93be-e07f9e6daea1" />
* Upload box with file name display
* ECG waveform plot using image input
* Red-highlighted arrhythmia alert
* Health guidance tailored to predicted class

---

## 📊 Dataset Used

**Source**: [ECG Image Dataset – Kaggle](https://www.kaggle.com/datasets/erhmrai/ecg-image-data)

* Pre-categorized ECG images into: `N`, `S`, `V`, `F`, `Q`
* Based on MIT-BIH records, converted to 2D image format
* Split: Training + Validation + Testing
* Augmentations: Rotation, noise injection, contrast boost
* Input Format: 2D ECG plots (`.jpg`)

---

## 🧱 System Architecture

<img width="4836" height="920" alt="diagram(1)" src="https://github.com/user-attachments/assets/03a328d8-c9cb-483d-a3ad-330f563c3de1" />

### Frontend – `Next.js v13 App Router`

* Pages: `layout.tsx`, `page.tsx`
* Components: `HealthTips.tsx`, `PredictionResult.tsx`
* Styling: TailwindCSS + PostCSS
* Plotting and UI logic

### Backend – `Python + Flask/FastAPI`

* Endpoint: `POST /predict` for image classification
* Inference via `resnet50_model2.keras`
* Model developed in: `Cardiac_Arrhythmia_ResNet_Train.ipynb`

---

## 🧰 Technology Stack

| Layer     | Tools & Frameworks                                   |
| --------- | ---------------------------------------------------- |
| Frontend  | React, Next.js (App Router), TailwindCSS, TypeScript |
| Backend   | Python 3.x, FastAPI or Flask, TensorFlow (Keras)     |
| ML Model  | ResNet50 (`.keras` weights), trained on ECG images   |
| Utilities | Plotting with Chart.js/Plotly, Axios, FormData API   |

---

## ⚙️ How It Works

1. **User uploads** an ECG `.jpg` image via UI
2. UI **sends request** to `/predict` API with image file
3. Backend **loads model** and runs inference
4. **JSON response** returned with class label + probability
5. UI updates with:

   * Predicted category (e.g., "Ventricular")
   * Signal display
   * Personalized health tips

---

## 🔁 Example API Interaction

**Endpoint**: `POST /predict`
**Content-Type**: `multipart/form-data`
**Field**: `file` = ECG image file

### Sample Response

```json
{
  "prediction": "V",
  "confidence": 0.91,
}
```

---

## 📁 Model Files

| File Name                               | Purpose                             |
| --------------------------------------- | ----------------------------------- |
| `resnet50_model2.keras`                 | Trained image classifier model      |
| `Cardiac_Arrhythmia_ResNet_Train.ipynb` | Training pipeline and preprocessing |
| `requirements.txt`                      | Backend environment dependencies    |

---

## ✅ Requirements

* Python 3.8+
* Node.js 14+
* Compatible with Windows/macOS/Linux
* No GPU required (optional for performance boost)

---

## 📝 License

This project is released under the **MIT License**.
Use freely and contribute responsibly.

---

## 🙌 Acknowledgments

* **Kaggle ECG Dataset** by [erhmrai](https://www.kaggle.com/datasets/erhmrai/ecg-image-data)
* MIT-BIH Arrhythmia Dataset (PhysioNet)
* TensorFlow/Keras for model development
* Next.js + TailwindCSS for modern UI
