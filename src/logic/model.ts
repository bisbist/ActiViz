// src/logic/model.ts
import * as tf from '@tensorflow/tfjs';

export async function trainModel({
  activation = 'relu',
  learningRate = 0.01,
  epochs = 50,
  onEpochEnd,
}: {
  activation: tf.ActivationIdentifier;
  learningRate: number;
  epochs: number;
  onEpochEnd?: (epoch: number, loss: number) => void;
}) {
  const model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [2], units: 8, activation }));
  model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

  model.compile({
    optimizer: tf.train.adam(learningRate),
    loss: 'binaryCrossentropy',
    metrics: ['accuracy'],
  });

  const xs = tf.randomUniform([100, 2]);
  const ys = tf.cast(xs.sum(1).greater(1), 'float32');

  await model.fit(xs, ys, {
    epochs,
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        onEpochEnd?.(epoch, logs?.loss ?? 0);
      },
    },
  });

  return model;
}
