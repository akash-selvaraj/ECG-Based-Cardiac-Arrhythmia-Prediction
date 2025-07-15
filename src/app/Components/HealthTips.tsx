import React from 'react';
import Image from 'next/image';
interface HealthTipsProps {
  arrhythmiaType: string;
}

const HealthTips: React.FC<HealthTipsProps> = ({ arrhythmiaType }) => {
  const tips: Record<string, string> = {
    N: "Keep up with regular exercise and a balanced diet for a healthy heart!",
    S: "Consult a doctor if you experience palpitations or irregular heartbeats.",
    V: "Avoid stimulants like caffeine and monitor symptoms with a healthcare provider.",
    F: "Fusion beats are typically rare; consult a specialist if they persist.",
    Q: "Ensure pacemaker devices are checked regularly if applicable.",
    M: "Noisy beats may indicate the need for further testing or adjustments in monitoring.",
  };

  const images: Record<string, string> = {
    N: "/images/normal.jpg",
    S: "/images/supraventricular.jpg",
    V: "/images/ventricular.png",
    F: "/images/fusion.jpg",
    Q: "/images/paced.png",
    M: "/images/miscellenous.jpg",
  };

  return (
    <div className="bg-white border border-pink-300 rounded-lg shadow-md p-4 mt-6 max-w-md mx-auto text-center">
      <Image 
        src={images[arrhythmiaType] || "/images/default.jpg"}
		width={500}
		height={500}
        alt={arrhythmiaType} 
        className="w-32 h-32 mx-auto rounded-full border-2 border-pink-200 mb-4"
      />
      <div className="text-gray-700">
        <h3 className="text-xl font-semibold text-pink-600 mb-2">Health Tips</h3>
        <p className="text-sm">{tips[arrhythmiaType] || "Stay healthy and monitor your heart regularly!"}</p>
      </div>
    </div>
  );
};

export default HealthTips;
