import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from '../../app/styles/Home.module.css';

interface GrossMarginChartProps {
  data: any[];
  darkMode: boolean;
}

const GrossMarginChartComponent: React.FC<GrossMarginChartProps> = ({ data, darkMode }) => {
  console.log('GrossMarginChart rendering, darkMode:', darkMode);
  console.log('GrossMarginChart data:', data);

  const textColor = darkMode ? '#f3f4f6' : '#1f2937';
  const gridColor = darkMode ? '#4b5563' : '#e5e7eb';

  return (
    <section className={`${styles.section} ${darkMode ? styles.darkSection : ''}`}>
      <h3 className={`${styles.sectionTitle} ${darkMode ? styles.darkSectionTitle : ''}`}>
        Gross Margin
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="year" stroke={textColor} />
          <YAxis stroke={textColor} />
          <Tooltip 
            contentStyle={{ backgroundColor: darkMode ? '#1f2937' : 'white', color: textColor, border: 'none' }}
            itemStyle={{ color: textColor }}
          />
          <Legend wrapperStyle={{ color: textColor }} />
          <Area type="monotone" dataKey="margin" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
};

export const GrossMarginChart = React.memo(GrossMarginChartComponent);