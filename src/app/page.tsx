'use client'
import { useState } from "react";
import axios from "axios";
import PredictionResult from "./Components/PredictionResult";
import HealthTips from "./Components/HealthTips";

export default function UploadPage() {
  const [image, setImage] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<{ class_label: string; details: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
      setPrediction(null); // Reset prediction when a new image is uploaded
    }
  };

  const handlePredict = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);
    setLoading(true); // Start loading

    try {
      const response = await axios.post("/predict", formData, {
        baseURL: "http://localhost:8000",
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPrediction(response.data);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    } finally {
      setLoading(false); // Stop loading once the response is received
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-red-200 p-6">
      <h1 className="text-3xl font-bold text-pink-700 mb-8">ECG Image Analysis</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-200 file:text-pink-700 hover:file:bg-pink-300"
        />
        <button
          onClick={handlePredict}
          className="mt-4 bg-pink-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 transition duration-200"
        >
          Predict
        </button>
      </div>

      {image && (
        <div className="mt-8">
          <img src={URL.createObjectURL(image)} alt="Uploaded ECG" className="w-64 h-auto rounded-lg shadow-md border-2 border-pink-300" />
        </div>
      )}

      {loading ? (
        <div className="mt-8">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-pink-500 animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-pink-500 animate-bounce delay-200"></div>
            <div className="w-4 h-4 rounded-full bg-pink-500 animate-bounce delay-400"></div>
          </div>
          <p className="text-pink-600 mt-4">Loading...</p>
        </div>
      ) : (
        <>
          {prediction && <PredictionResult prediction={prediction} />}
          {prediction && <HealthTips arrhythmiaType={prediction.class_label} />}
        </>
      )}
    </div>
  );
}
