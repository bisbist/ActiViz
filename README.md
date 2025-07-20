# ActiViz

**ActiViz** is an interactive web application that visualizes how different neural network activation functions affect training, convergence, and optimization in real time. Inspired by educational tools like TensorFlow Playground, ActiViz allows users to experiment with various activation functions, learning rates, and architectures through a beautiful and responsive UI.

## ✨ Features

* 🎛 **Dynamic activation function selection** (ReLU, Sigmoid, Tanh, Linear)
* 📉 **Live loss curve plotting** over epochs
* 📊 **Interactive scatter plot of input features and labels**
* ⚙️ **Adjustable hyperparameters** like learning rate and epochs

## 🛠 Tech Stack

| Layer         | Technology                        |
| ------------- | --------------------------------- |
| Frontend      | React, TypeScript, Tailwind CSS   |
| Visualization | Recharts, Chart.js, Framer Motion |
| ML Engine     | TensorFlow.js                    |
| Build Tool    | Vite                              |

## 🏗 Project Structure

```
src/
├── components/
│   ├── ControlPanel.tsx      # UI for selecting activations, learning rate, epochs
│   ├── LossChart.tsx         # Line chart showing loss over time
│   └── InputScatterPlot.tsx  # Scatter plot of synthetic input data
├── logic/
│   └── model.ts              # TensorFlow.js model definition & training logic
├── App.tsx                   # Main React app
├── index.css                 # Global styles, theming, responsiveness
└── main.tsx                  # App entry point
```

## 🚀 Getting Started

### Prerequisites

* Node.js ≥ 16
* npm

### Setup

```bash
# Clone the repo
git clone https://github.com/bisbist/ActiViz.git
cd activiz

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit ➡️ **[http://localhost:5173](http://localhost:5173)**

## 🧪 How It Works

* **Synthetic data**: Generates 2D random points; labels are `1` if x₁ + x₂ > 1, else `0`.
* **Model**: Feedforward neural network with 3 hidden layers (64 units each) and user-selected activation function.
* **Output**: Sigmoid layer for binary classification.
* **Visualization**: Shows both feature space (scatter plot) and training performance (loss chart).

## 🔮 Planned Enhancements

* Add gradient and weight visualizations layer-wise.
* Enable multiple dataset selection.
* Export training animations as GIFs.
* Compare multiple optimizers (SGD, Adam, RMSProp).
* Provide explainable AI (XAI) overlays.

## 🌟 Acknowledgments

* Inspiration: TensorFlow Playground
