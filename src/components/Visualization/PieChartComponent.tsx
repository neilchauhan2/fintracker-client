import React, { useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
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
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer width='100%'
        height='100%'>
        <PieChart>
          <Pie
            data={data}
            dataKey='value'
            style={{
              fontSize: '12px'
            }}
            label={
              (item) => {
                return `${item.name}: ${item.value}`
              }}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}>{entry.name}</Cell>
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PieChartComponent;
