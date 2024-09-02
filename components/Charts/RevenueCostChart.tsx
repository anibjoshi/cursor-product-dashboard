import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from '../../app/styles/Home.module.css';

interface RevenueCostChartProps {
  data: any[];
  darkMode: boolean;
}

const RevenueCostChartComponent: React.FC<RevenueCostChartProps> = ({ data, darkMode }) => {
  console.log('RevenueCostChart rendering, darkMode:', darkMode);
  console.log('RevenueCostChart data:', data);

  const textColor = darkMode ? '#f3f4f6' : '#1f2937';
  const gridColor = darkMode ? '#4b5563' : '#e5e7eb';

  return (
    <section className={`${styles.section} ${darkMode ? styles.darkSection : ''}`}>
      <h3 className={`${styles.sectionTitle} ${darkMode ? styles.darkSectionTitle : ''}`}>
        Revenue vs Cost
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="name" stroke={textColor} />
          <YAxis stroke={textColor} />
          <Tooltip 
            contentStyle={{ backgroundColor: darkMode ? '#1f2937' : 'white', color: textColor, border: 'none' }}
            itemStyle={{ color: textColor }}
          />
          <Legend wrapperStyle={{ color: textColor }} />
          <Bar dataKey="revenue" fill="#3b82f6" />
          <Bar dataKey="cost" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

export const RevenueCostChart = React.memo(RevenueCostChartComponent);