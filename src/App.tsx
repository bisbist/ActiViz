import { useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { trainModel, getTrainedModel } from './logic/model';
import { LossChart } from './components/LossChart';
import { ControlPanel } from './components/ControlPanel';
import { InputScatterPlot } from './components/InputScatterPlot';
import { PredictionInput } from './components/PredictionInput'; // Make sure this component exists

function App() {
  const [losses, setLosses] = useState<number[]>([]);
  const [inputPoints, setInputPoints] = useState<{ x: number; y: number; label: number }[]>([]);
  const [predictionResult, setPredictionResult] = useState<{
    x: number;
    y: number;
    class: number;
    prob: number;
  } | null>(null);

  const handleStart = async ({ activation, learningRate, epochs, batchSize }: any) => {
    setLosses([]);
    setPredictionResult(null);
    await trainModel({
      activation,
      learningRate,
      epochs,
      batchSize,
      onEpochEnd: (epoch, loss) => {
        setLosses(prev => [...prev, loss]);
      },
      onSamplesReady: (samples) => {
        setInputPoints(samples);
      },
    });
  };

  const handlePredict = async (x: number, y: number) => {
    const model = getTrainedModel();
    if (!model) return;
    const input = tf.tensor2d([[x, y]]);
    const output = model.predict(input) as tf.Tensor;
    const prob = (await output.array()) as number[][];
    const p = prob[0][0];
    const predictedClass = p > 0.5 ? 1 : 0;
    setPredictionResult({ x, y, class: predictedClass, prob: p });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ActiViz: Activation Function Visualizer</h1>
      <ControlPanel onStart={handleStart} />

      <div className="flex space-x-4">
        {/* Input Scatter Plot */}
        <div className="w-1/2">
          <InputScatterPlot data={inputPoints} />
        </div>

        {/* Loss vs Epoch Chart */}
        <div className="w-1/2">
          <LossChart data={losses} />
        </div>
      </div>

      <div className="mt-6">
        <PredictionInput onPredict={handlePredict} />

        {predictionResult && (
          <div className="mt-2 text-sm text-gray-700">
            <strong>Prediction:</strong> Class {predictionResult.class}{' '}
            (Confidence: {(predictionResult.class === 1
              ? predictionResult.prob
              : 1 - predictionResult.prob).toFixed(2)})
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
