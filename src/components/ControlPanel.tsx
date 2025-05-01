// src/components/ControlPanel.tsx
import { useState } from 'react';

export const ControlPanel = ({
  onStart,
}: {
  onStart: (params: { activation: string; learningRate: number; epochs: number }) => void;
}) => {
  const [activation, setActivation] = useState('relu');
  const [learningRate, setLearningRate] = useState(0.01);
  const [epochs, setEpochs] = useState(50);

  return (
    <div className="space-y-2 p-4 max-w-md">
      <div>
        <label>Activation: </label>
        <select value={activation} onChange={e => setActivation(e.target.value)}>
          {['relu', 'sigmoid', 'tanh', 'linear'].map(opt => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Learning Rate: </label>
        <input
          type="number"
          value={learningRate}
          step={0.001}
          onChange={e => setLearningRate(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Epochs: </label>
        <input
          type="number"
          value={epochs}
          onChange={e => setEpochs(parseInt(e.target.value))}
        />
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() =>
        onStart({ activation, learningRate, epochs })}>
        Train Model
      </button>
    </div>
  );
};
