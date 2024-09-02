'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, MoonIcon, SunIcon, UploadIcon } from '@radix-ui/react-icons'
import dynamic from 'next/dynamic'
import { supabase } from '@/lib/supabaseClient'
import styles from './styles/Home.module.css'
import FileUpload from './components/FileUpload'

const RevenueChart = dynamic(() => import('@/components/Charts/RevenueChart').then((mod) => mod.RevenueChart), { ssr: false })
const RevenueCostChart = dynamic(() => import('@/components/Charts/RevenueCostChart').then((mod) => mod.RevenueCostChart), { ssr: false })
const GrossMarginChart = dynamic(() => import('@/components/Charts/GrossMarginChart').then((mod) => mod.GrossMarginChart), { ssr: false })

const MetricCard = ({ title, value, change, isPositive, darkMode }) => (
  <Card className={styles.section}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className={`${styles.metricLabel} ${darkMode ? styles.darkMetricLabel : ''}`}>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className={`${styles.metricValue} ${darkMode ? styles.darkMetricValue : ''}`}>{value}</div>
      <p className={`${styles.metricChange} ${isPositive ? styles.positiveChange : styles.negativeChange}`}>
        {isPositive ? <ArrowUpIcon className="mr-1" /> : <ArrowDownIcon className="mr-1" />}
        {change}
      </p>
    </CardContent>
  </Card>
)

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [revenueData, setRevenueData] = useState([])
  const [revenueCostData, setRevenueCostData] = useState([])
  const [grossMarginData, setGrossMarginData] = useState([])
  const [metricsData, setMetricsData] = useState([])
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false)

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDarkMode)

    const fetchData = async () => {
      const { data: revenue } = await supabase.from('revenue_data').select('*')
      const { data: revenueCost } = await supabase.from('revenue_cost_data').select('*')
      const { data: grossMargin } = await supabase.from('gross_margin_data').select('*')
      const { data: metrics } = await supabase.from('metrics').select('*')

      setRevenueData(revenue || [])
      setRevenueCostData(revenueCost || [])
      setGrossMarginData(grossMargin || [])
      setMetricsData(metrics || [])
    }

    fetchData()
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', darkMode.toString())
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleOpenFileUpload = () => {
    setIsFileUploadOpen(true)
  }

  const handleCloseFileUpload = () => {
    setIsFileUploadOpen(false)
  }

  return (
    <div className={`${styles.container} ${darkMode ? styles.darkContainer : ''}`}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>X Product Dashboard</h1>
          <div className={styles.iconContainer}>
            <button onClick={toggleDarkMode} className={styles.darkModeToggle} style={{ padding: '10px' }}>
              {darkMode ? <SunIcon style={{ color: 'white', width: '24px', height: '24px' }} /> : <MoonIcon style={{ color: 'white', width: '24px', height: '24px' }} />}
            </button>
            <button onClick={handleOpenFileUpload} className={styles.uploadButton} style={{ marginLeft: '20px', padding: '10px' }}>
              <UploadIcon style={{ color: 'white', width: '24px', height: '24px' }} />
            </button>
          </div>
        </div>
        
        {/* North Star Metrics */}
        <section className={`${styles.section} ${darkMode ? styles.darkSection : ''}`}>
          <h2 className={`${styles.sectionTitle} ${darkMode ? styles.darkSectionTitle : ''}`}>North Star Metrics</h2>
          <div className={`${styles.grid} ${styles.gridCols5}`}>
            <MetricCard
              title="Revenue YTD"
              value={`$${revenueData.reduce((acc, item) => acc + item.revenue, 0)}`}
              change="10%"
              isPositive={true}
              darkMode={darkMode}
            />
            <MetricCard
              title="Gross Margin"
              value={`${grossMarginData.reduce((acc, item) => acc + item.margin, 0) / grossMarginData.length}%`}
              change="5%"
              isPositive={true}
              darkMode={darkMode}
            />
            <MetricCard
              title="YoY Growth Rate"
              value="15%"
              change="5%"
              isPositive={true}
              darkMode={darkMode}
            />
            <MetricCard
              title="Daily Active Users"
              value="1,200"
              change="8%"
              isPositive={true}
              darkMode={darkMode}
            />
            <MetricCard
              title="Net Promoter Score"
              value="75"
              change="3%"
              isPositive={true}
              darkMode={darkMode}
            />
          </div>
        </section>

        {/* Growth Metrics */}
        <section className={`${styles.section} ${darkMode ? styles.darkSection : ''}`}>
          <h2 className={`${styles.sectionTitle} ${darkMode ? styles.darkSectionTitle : ''}`}>Growth Metrics</h2>
          <div className={`${styles.grid} ${styles.gridCols2}`}>
            <RevenueChart data={revenueData} darkMode={darkMode} />
            <Card className={`${styles.section} ${darkMode ? styles.darkSection : ''}`}>
              <CardHeader>
                <CardTitle className={darkMode ? styles.darkSectionTitle : ''}>Key Growth Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={styles.grid}>
                  <div>
                    <h3 className="text-lg font-medium">Total Customers</h3>
                    <p className="text-3xl font-bold">10,000</p>
                    <p className={`${styles.positiveChange} flex items-center`}><ArrowUpIcon className="mr-1" /> 12% vs last quarter</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Average Revenue per Account</h3>
                    <p className="text-3xl font-bold">$220</p>
                    <p className={`${styles.positiveChange} flex items-center`}><ArrowUpIcon className="mr-1" /> 5% vs last quarter</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Churn Rate</h3>
                    <p className="text-3xl font-bold">5%</p>
                    <p className={`${styles.negativeChange} flex items-center`}><ArrowDownIcon className="mr-1" /> 1% vs last quarter</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Profitability Metrics */}
        <section className={`${styles.section} ${darkMode ? styles.darkSection : ''}`}>
          <h2 className={`${styles.sectionTitle} ${darkMode ? styles.darkSectionTitle : ''}`}>Profitability Metrics</h2>
          <div className={`${styles.grid} ${styles.gridCols2}`}>
            <div className={`${styles.chartContainer} ${darkMode ? styles.darkChartContainer : ''}`}>
              <RevenueCostChart data={revenueCostData} darkMode={darkMode} />
            </div>
            <div className={`${styles.chartContainer} ${darkMode ? styles.darkChartContainer : ''}`}>
              <GrossMarginChart data={grossMarginData} darkMode={darkMode} />
            </div>
            <Card className={`${styles.section} ${darkMode ? styles.darkSection : ''} ${styles.gridCols2}`}>
              <CardHeader>
                <CardTitle className={darkMode ? styles.darkSectionTitle : ''}>Key Profitability Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`${styles.grid} ${styles.gridCols3}`}>
                  <div>
                    <h3 className="text-lg font-medium">Lifetime Value</h3>
                    <p className="text-3xl font-bold">$1,500</p>
                    <p className={`${styles.positiveChange} flex items-center`}><ArrowUpIcon className="mr-1" /> 10% vs last year</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Net Revenue Retention</h3>
                    <p className="text-3xl font-bold">110%</p>
                    <p className={`${styles.positiveChange} flex items-center`}><ArrowUpIcon className="mr-1" /> 5% vs last year</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Customer Acquisition Cost</h3>
                    <p className="text-3xl font-bold">$200</p>
                    <p className={`${styles.negativeChange} flex items-center`}><ArrowDownIcon className="mr-1" /> 8% vs last year</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
      {isFileUploadOpen && <FileUpload onClose={handleCloseFileUpload} />}
    </div>
  )
}