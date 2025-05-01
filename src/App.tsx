// src/App.tsx
import { useState } from 'react';
import { trainModel } from './logic/model';
import { LossChart } from './components/LossChart';
import { ControlPanel } from './components/ControlPanel';

function App() {
  const [losses, setLosses] = useState<number[]>([]);

  const handleStart = async ({ activation, learningRate, epochs }: any) => {
    setLosses([]);
    await trainModel({
      activation,
      learningRate,
      epochs,
      onEpochEnd: (epoch, loss) => {
        setLosses(prev => [...prev, loss]);
      },
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ActiViz: Activation Function Visualizer</h1>
      <ControlPanel onStart={handleStart} />
      <LossChart data={losses} />
    </div>
  );
}

export default App;
