import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';

let trainedModel: tf.LayersModel | null = null;

export async function trainModel({
  activation = 'relu',
  learningRate = 0.01,
  epochs = 50,
  batchSize = 100,
  onEpochEnd,
  onSamplesReady,
}: {
  activation: 'relu' | 'sigmoid' | 'tanh' | 'linear';
  learningRate: number;
  epochs: number;
  batchSize: number;
  onEpochEnd?: (epoch: number, loss: number) => void;
  onSamplesReady?: (points: { x: number; y: number; label: number }[]) => void;
}) {
  await tf.setBackend('webgl');
  await tf.ready();

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
  const totalSamples = 100;
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

  // console.log('--- Sample Input Data ---');
  // for (let i = 0; i < 350; i++) {
  //   const [x1, x2] = xsArray[i];
  //   const y = ysArray[i];
  //   const sum = x1 + x2;  // Calculate the sum of x1 and x2
  //   console.log(`Input ${i}: [${x1.toFixed(3)}, ${x2.toFixed(6)}], Sum: ${sum.toFixed(6)}, Label: ${y}`);
  // }  
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


  // Pass the data to onSamplesReady
  onSamplesReady?.(labeledPoints);

  const t0 = performance.now();

  // await model.fit(xs, ys, {
  //   epochs,
  //   batchSize,
  //   callbacks: {
  //     onEpochEnd: async (epoch, logs) => {
  //       // onEpochEnd?.(epoch, logs?.loss ?? 0);
  //       const loss = logs?.loss ?? 0;
  //       const acc = logs?.acc ?? logs?.accuracy ?? 0;  // 'acc' for older TF.js versions
  //       console.log(`Epoch ${epoch + 1}: loss = ${loss.toFixed(4)}, accuracy = ${acc.toFixed(4)}`);
  //       onEpochEnd?.(epoch, loss);
  //     },
  //   },
  // });

  const epochAccuracies: number[] = [];

  await model.fit(xs, ys, {
    epochs,
    batchSize,
    callbacks: {
      // onEpochEnd: async (epoch, logs) => {
      //   const loss = logs?.loss ?? 0;
      //   const acc = logs?.acc ?? logs?.accuracy ?? 0;
      //   console.log(`Epoch ${epoch + 1}: loss = ${loss.toFixed(4)}, accuracy = ${acc.toFixed(4)}`);

      //   epochAccuracies.push(acc);
      //   onEpochEnd?.(epoch, loss);
      // },
      onEpochEnd: async (epoch, logs) => {
        const loss = logs?.loss ?? 0;
        const acc = logs?.acc ?? logs?.accuracy ?? 0;
        console.log(`Epoch ${epoch + 1}: loss = ${loss.toFixed(4)}, accuracy = ${acc.toFixed(4)}`);
        epochAccuracies.push(acc);
        onEpochEnd?.(epoch, loss);

        // // Log weights and biases layer-wise
        // console.log(`\n--- Weights and Biases at Epoch ${epoch + 1} ---`);
        // model.layers.forEach((layer, layerIdx) => {
        //   const weights = layer.getWeights();
        //   if (weights.length > 0) {
        //     const kernel = weights[0];
        //     const bias = weights[1] || null;

        //     kernel.data().then(kernelVals => {
        //       console.log(`Layer ${layerIdx + 1} - Kernel shape: [${kernel.shape}], Sample: ${Array.from(kernelVals).slice(0, 5).map(v => v.toFixed(4))}`);
        //     });

        //     if (bias) {
        //       bias.data().then(biasVals => {
        //         console.log(`Layer ${layerIdx + 1} - Bias shape: [${bias.shape}], Sample: ${Array.from(biasVals).slice(0, 5).map(v => v.toFixed(4))}`);
        //       });
        //     }
        //   }
        // });
      },
    },
  });

  const avgAccuracy =
    epochAccuracies.reduce((sum, a) => sum + a, 0) / epochAccuracies.length;
  console.log(`\nAverage Training Accuracy: ${(avgAccuracy * 100).toFixed(2)}%`);


  const t1 = performance.now();
  console.log(`Model training took ${((t1 - t0) / 1000).toFixed(2)} seconds`);
  console.log('--- Model Summary ---');
  model.summary();
  trainedModel = model;
  return model;
}

export function getTrainedModel(): tf.LayersModel | null {
  return trainedModel;
}