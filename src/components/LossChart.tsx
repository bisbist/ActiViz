import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from 'recharts';
import { motion } from 'framer-motion';

export const LossChart = ({ data }: { data: number[] }) => {
  const chartData = data.map((loss, index) => ({ epoch: index + 1, loss }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 w-full max-w-3xl mx-auto"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-200 mb-6">
        Loss Over Epochs
      </h2>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="epoch"
            label={{
              value: 'Epoch',
              position: 'insideBottom',
              offset: -10,
              style: { fill: '#4b5563' },
            }}
            tick={{ fill: '#4b5563' }}
          />
          <YAxis
            label={{
              value: 'Loss',
              angle: -90,
              position: 'insideLeft',
              style: { fill: '#4b5563' },
            }}
            tick={{ fill: '#4b5563' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '10px',
              fontSize: '14px',
            }}
          />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="loss"
            name="Loss"
            stroke="#6366f1"
            strokeWidth={2.5}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
            animationDuration={600}
            isAnimationActive
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
