// src/components/ControlPanel.tsx
import { useState } from 'react';

export const ControlPanel = ({
  onStart,
  isTraining = false,
}: {
  onStart: (params: { activation: string; learningRate: number; epochs: number }) => void;
  isTraining?: boolean;
}) => {
  const [activation, setActivation] = useState('relu');
  const [learningRate, setLearningRate] = useState(0.01);
  const [epochs, setEpochs] = useState(50);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 max-w-md mx-auto space-y-4 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800">Model Configuration</h2>

      <div className="flex flex-col gap-3">
        <label className="font-medium text-gray-700">
          Activation Function
          <select
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={activation}
            onChange={(e) => setActivation(e.target.value)}
            disabled={isTraining}
          >
            {['relu', 'sigmoid', 'tanh', 'linear'].map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </label>

        <label className="font-medium text-gray-700">
          Learning Rate ({learningRate.toFixed(3)})
          <input
            type="range"
            min={0.001}
            max={0.1}
            step={0.001}
            value={learningRate}
            onChange={(e) => setLearningRate(parseFloat(e.target.value))}
            disabled={isTraining}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="font-medium text-gray-700">
          Epochs
          <input
            type="number"
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={epochs}
            onChange={(e) => setEpochs(parseInt(e.target.value))}
            disabled={isTraining}
          />
        </label>
      </div>

      <button
        className={`w-full py-2 rounded-md text-white font-medium transition-all duration-200 ${isTraining
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
          }`}
        onClick={() => onStart({ activation, learningRate, epochs })}
        disabled={isTraining}
      >
        {isTraining ? 'Training...' : 'Train Model'}
      </button>
    </div>
  );
};
