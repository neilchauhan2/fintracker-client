import React, { useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { PieChartDataType } from '../../types';

type PieChartProps = {
  data: PieChartDataType[]
}
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChartComponent: React.FC<PieChartProps> = ({ data }) => {
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <PieChart
      width={600}
      height={400}
    >
      <Pie
        data={data}
        dataKey='value'
        label={
          (item) => {
            return `${item.name}: ${item.value}`
          }}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}>{entry.name}</Cell>
        ))}
      </Pie>
    </PieChart>
  )
}

export default PieChartComponent;
