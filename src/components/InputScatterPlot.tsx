import {
    ScatterChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Scatter,
    Legend,
    ResponsiveContainer,
    LabelList,
  } from 'recharts';
  
  interface Props {
    data: { x: number; y: number; label: number }[];
  }
  
  export function InputScatterPlot({ data }: Props) {
    const positivePoints = data.filter(d => d.label === 1);
    const negativePoints = data.filter(d => d.label === 0);
  
    return (
      <div className="w-full h-64 mt-8">
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name="X1" />
            <YAxis type="number" dataKey="y" name="X2" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
  
            {/* Class 0 - Red */}
            <Scatter name="Class 0 (Red)" data={negativePoints} fill="#FF6347">
              {/* Optionally label each point */}
              {/* <LabelList dataKey="label" position="top" /> */}
            </Scatter>
  
            {/* Class 1 - Green */}
            <Scatter name="Class 1 (Green)" data={positivePoints} fill="#32CD32">
              {/* Optionally label each point */}
              {/* <LabelList dataKey="label" position="top" /> */}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    );
  }
  