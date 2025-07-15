import React from 'react';

interface PredictionResultProps {
  prediction: { class_label: string; details: string };
}

const PredictionResult: React.FC<PredictionResultProps> = ({ prediction }) => {
  const getStyles = (classLabel: string) => {
    switch (classLabel) {
      case "N": return { color: "text-green-600", borderColor: "border-green-400", fullName: "Normal" };
      case "S": return { color: "text-orange-600", borderColor: "border-orange-400", fullName: "Supraventricular" };
      case "V": return { color: "text-red-600", borderColor: "border-red-400", fullName: "Ventricular" };
      case "F": return { color: "text-blue-600", borderColor: "border-blue-400", fullName: "Fusion" };
      case "Q": return { color: "text-purple-600", borderColor: "border-purple-400", fullName: "Paced" };
      case "M": return { color: "text-gray-600", borderColor: "border-gray-400", fullName: "Miscellaneous" };
      default: return { color: "text-black", borderColor: "border-black", fullName: "Unknown" };
    }
  };

  const { color, borderColor, fullName } = getStyles(prediction.class_label);

  return (
    <div className={`border-2 ${borderColor} rounded-lg p-4 mt-6 max-w-md mx-auto text-center`}>
      <h2 className={`text-xl font-semibold ${color} mb-2`}>Predicted Class: {fullName}</h2>
    </div>
  );
};

export default PredictionResult;
