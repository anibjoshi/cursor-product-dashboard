import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from '../../app/styles/Home.module.css';

interface RevenueChartProps {
  data: any[];
  darkMode: boolean;
}

const RevenueChartComponent: React.FC<RevenueChartProps> = ({ data, darkMode }) => {
  console.log('RevenueChart rendering, darkMode:', darkMode);
  console.log('RevenueChart data:', data);

  const textColor = darkMode ? '#f3f4f6' : '#1f2937';
  const gridColor = darkMode ? '#4b5563' : '#e5e7eb';

  return (
    <section className={`${styles.section} ${darkMode ? styles.darkSection : ''}`}>
      <h3 className={`${styles.sectionTitle} ${darkMode ? styles.darkSectionTitle : ''}`}>
        3 Year Revenue Chart
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="name" stroke={textColor} />
          <YAxis stroke={textColor} />
          <Tooltip 
            contentStyle={{ backgroundColor: darkMode ? '#1f2937' : 'white', color: textColor, border: 'none' }}
            itemStyle={{ color: textColor }}
          />
          <Legend wrapperStyle={{ color: textColor }} />
          <Line type="monotone" dataKey="revenue" stroke="#3b82f6" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export const RevenueChart = React.memo(RevenueChartComponent);