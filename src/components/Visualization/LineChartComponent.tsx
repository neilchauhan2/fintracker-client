import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { LineChartDataType } from '../../types';

type LineChartProps = {
  data: LineChartDataType[]
}

const LineChartComponent: React.FC<LineChartProps> = ({ data }) => {
  return (
    <LineChart
      width={600}
      height={400}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="income" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="expense" stroke="#82ca9d" />
    </LineChart>
  )
}

export default LineChartComponent;