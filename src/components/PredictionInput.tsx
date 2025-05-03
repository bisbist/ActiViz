import { useState } from 'react';

interface Props {
  onPredict: (x: number, y: number) => void;
}

export function PredictionInput({ onPredict }: Props) {
  const [x, setX] = useState('');
  const [y, setY] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const xVal = parseFloat(x);
    const yVal = parseFloat(y);
    if (!isNaN(xVal) && !isNaN(yVal)) {
      onPredict(xVal, yVal);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <h2 className="text-lg font-semibold">Predict Class for New Point</h2>
      <div className="flex gap-2">
        <input
          type="number"
          value={x}
          onChange={(e) => setX(e.target.value)}
          placeholder="Feature 1"
          className="border p-2 rounded w-24"
        />
        <input
          type="number"
          value={y}
          onChange={(e) => setY(e.target.value)}
          placeholder="Feature 2"
          className="border p-2 rounded w-24"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Predict
        </button>
      </div>
    </form>
  );
}
