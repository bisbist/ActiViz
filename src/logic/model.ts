import * as tf from '@tensorflow/tfjs';

let trainedModel: tf.LayersModel | null = null;

export async function trainModel({
  activation = 'relu',
  learningRate = 0.01,
  epochs = 50,
  onEpochEnd,
  onSamplesReady,
}: {
  activation: tf.ActivationIdentifier;
  learningRate: number;
  epochs: number;
  onEpochEnd?: (epoch: number, loss: number) => void;
  onSamplesReady?: (points: { x: number; y: number; label: number }[]) => void;
}) {
  const model = tf.sequential();
  // model.add(tf.layers.dense({ inputShape: [2], units: 32, activation: 'relu' }));
  // model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
  // model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
  model.add(tf.layers.dense({ inputShape: [2], units: 32, activation }));
  model.add(tf.layers.dense({ units: 32, activation }));
  model.add(tf.layers.dense({ units: 32, activation }));
  model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

  model.compile({
    optimizer: tf.train.adam(learningRate),
    loss: 'binaryCrossentropy',
    metrics: ['accuracy'],
  });

  // const xs = tf.randomUniform([500, 2]);
  // const ys = tf.cast(xs.sum(1).greater(1), 'float32');

  const samples: number[][] = [];
  const labels: number[] = [];
  const borderlineWidth = 0.05;
  const totalSamples = 500;
  let class0 = 0, class1 = 0;

  while (samples.length < totalSamples) {
    const x = Math.random();
    const y = Math.random();
    const sum = x + y;

    // Force balanced class counts
    if (sum < 1 - borderlineWidth && class0 < totalSamples / 2) {
      samples.push([x, y]);
      labels.push(0);
      class0++;
    } else if (sum > 1 + borderlineWidth && class1 < totalSamples / 2) {
      samples.push([x, y]);
      labels.push(1);
      class1++;
    } else if (
      sum >= 1 - borderlineWidth &&
      sum <= 1 + borderlineWidth &&
      samples.length < totalSamples
    ) {
      // Include borderline cases equally split
      samples.push([x, y]);
      labels.push(sum > 1 ? 1 : 0);
    }
  }

  const xs = tf.tensor2d(samples);
  const ys = tf.tensor1d(labels, 'float32');


  const xsArray = await xs.array() as number[][];
  const ysArray = await ys.array() as number[];

  // const labeledPoints = xsArray.map((xy, i) => ({
  //   x: xy[0],
  //   y: xy[1],
  //   label: ysArray[i],
  // }));

  // onSamplesReady?.(labeledPoints);

  // Prepare data for plotting
  const labeledPoints = xsArray.map((xy, i) => ({
    x: xy[0],
    y: xy[1],
    label: ysArray[i],
  }));

  // console.log('--- Sample Input Data ---');
  // for (let i = 0; i < 50; i++) {
  //   const [x1, x2] = xsArray[i];
  //   const y = ysArray[i];
  //   console.log(`Input ${i}: [${x1.toFixed(3)}, ${x2.toFixed(3)}], Label: ${y}`);
  // }

  // Pass the data to onSamplesReady
  onSamplesReady?.(labeledPoints);

  await model.fit(xs, ys, {
    epochs,
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        onEpochEnd?.(epoch, logs?.loss ?? 0);
      },
    },
  });

  trainedModel = model;
  return model;
}

export function getTrainedModel(): tf.LayersModel | null {
  return trainedModel;
}