import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

export const LossChart = ({ data }: { data: number[] }) => {
  const chartData = data.map((loss, index) => ({ epoch: index + 1, loss }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 h-full"
    >
      <h2 className="text-xl font-semibold mb-2 text-center">Loss Over Epochs</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="epoch" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="loss"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
            animationDuration={500}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
