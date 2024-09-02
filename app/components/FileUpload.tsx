import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import styles from './FileUpload.module.css'; // Add a CSS module for styling

function FileUpload({ onClose }: { onClose: () => void }) {
    const [error, setError] = useState<string | null>(null);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.type !== 'text/csv') {
            setError('Please upload a CSV file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = e.target?.result;
            if (typeof text === 'string') {
                const isValid = validateCSV(text);
                if (!isValid) {
                    setError('CSV format is incorrect.');
                    return;
                }

                const parsedData = parseCSV(text);
                console.log('Parsed Data:', parsedData); // Debugging: Log parsed data

                const response = await uploadData(parsedData);
                console.log('Upload Response:', response); // Debugging: Log upload response

                if (response.error) {
                    setError('Error inserting data into the database.');
                } else {
                    setError(null);
                    alert('Data uploaded successfully!');
                    onClose();
                }
            }
        };
        reader.readAsText(file);
    };

    const validateCSV = (text: string): boolean => {
        // Implement your CSV validation logic here
        return true;
    };

    const parseCSV = (text: string) => {
        // Implement your CSV parsing logic here
        const rows = text.split('\n').slice(1); // Remove header row
        const data = rows.map(row => {
            const [type, id, year, month, revenue, cost, margin, name, value, change, is_positive] = row.split(',');
            console.log('Parsed Row:', { type, id, year, month, revenue, cost, margin, name, value, change, is_positive }); // Debugging: Log each parsed row
            return { type, id, year, month, revenue, cost, margin, name, value, change, is_positive };
        }).filter(row => row.type); // Remove empty rows
        return data;
    };

    const uploadData = async (data: any[]) => {
        const revenueData = data.filter(row => row.type === 'revenue_data').map(row => {
            console.log('Revenue Value:', row.revenue); // Debugging: Log revenue value
            return {
                id: parseInt(row.id) || null,
                year: parseInt(row.year) || null,
                revenue: parseFloat(row.revenue) || null
            };
        });
        const revenueCostData = data.filter(row => row.type === 'revenue_cost_data').map(row => ({
            id: parseInt(row.id) || null,
            month: row.month || null,
            revenue: parseFloat(row.revenue) || null,
            cost: parseFloat(row.cost) || null
        }));
        const grossMarginData = data.filter(row => row.type === 'gross_margin_data').map(row => ({
            id: parseInt(row.id) || null,
            year: parseInt(row.year) || null,
            margin: parseFloat(row.margin) || null
        }));
        const metricsData = data.filter(row => row.type === 'metrics').map(row => ({
            id: parseInt(row.id) || null,
            name: row.name || null,
            value: row.value || null,
            change: row.change || null,
            is_positive: row.is_positive === 'true'
        }));

        console.log('Revenue Data:', revenueData); // Debugging: Log revenue data
        console.log('Revenue Cost Data:', revenueCostData); // Debugging: Log revenue cost data
        console.log('Gross Margin Data:', grossMarginData); // Debugging: Log gross margin data
        console.log('Metrics Data:', metricsData); // Debugging: Log metrics data

        const responses = await Promise.all([
            supabase.from('revenue_data').upsert(revenueData, { onConflict: 'id' }),
            supabase.from('revenue_cost_data').upsert(revenueCostData, { onConflict: 'id' }),
            supabase.from('gross_margin_data').upsert(grossMarginData, { onConflict: 'id' }),
            supabase.from('metrics').upsert(metricsData, { onConflict: 'id' })
        ]);

        return responses.find(response => response.error) || { error: null };
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                <h2 className={styles.modalTitle}>Upload CSV File</h2>
                <p className={styles.warning}>Only CSV files are allowed. Please ensure the file is in the correct format.</p>
                <input type="file" accept=".csv" onChange={handleFileUpload} className={styles.fileInput} />
                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
    );
}

export default FileUpload;