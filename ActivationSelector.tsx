import React, { useState } from 'react';

const ActivationSelector = () => {
  const [activation, setActivation] = useState<string>('relu');
  const [isTraining, setIsTraining] = useState<boolean>(false);

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Select Activation Function
      </h2>

      <label htmlFor="activation">Activation Function</label>
      <select
        id="activation"  // Matches with CSS selector
        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={activation}
        onChange={(e) => setActivation(e.target.value)}
        disabled={isTraining}
      >
        {['relu', 'sigmoid', 'tanh', 'linear'].map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};

export default ActivationSelector;
