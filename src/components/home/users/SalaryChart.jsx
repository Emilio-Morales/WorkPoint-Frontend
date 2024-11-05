'use client'
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material'
import { BarChart } from '@mui/x-charts'
import { useTheme } from 'next-themes'

const SalaryChart = ({ userSalary, minSalary, maxSalary, avgSalary }) => {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  const isSmallScreen = useMediaQuery('(max-width: 640px)')
  const isMobile320 = useMediaQuery('(max-width: 320px)')
  const isMobile364 = useMediaQuery('(max-width: 364px)')

  // Less than 320px is 150 mt, less than 364px is 120 mt, less than 640px is 100 mt, greater than 640px is 50 mt
  const chartMarginTop = isSmallScreen ? (isMobile364 ? (isMobile320 ? 150 : 120) : 100) : 50

  const muiTheme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      background: {
        default: isDarkMode ? '#18181b' : '#ffffff',
      },
      text: {
        primary: isDarkMode ? '#d1d5db' : '#374151',
      },
    },
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: isDarkMode ? '#18181b !important' : '#f3f4f6', // Tooltip background color
            color: isDarkMode ? '#d1d5db' : '#374151', // Tooltip text color
          },
        },
      },
      MuiChart: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#18181b' : '#f4f4f5',
            '& .MuiChart-tickLabel': {
              fill: isDarkMode ? '#9ca3af' : '#4b5563', // Tick label color
            },
            '& .MuiChart-axisLabel': {
              fill: isDarkMode ? '#d1d5db' : '#374151', // Axis label color
            },
            '& .MuiChartsLegend-series text': {
              fill: isDarkMode ? '#d1d5db' : '#374151', // Legend label color
            },
          },
        },
      },
    },
  })

  const chartdata = [
    { name: 'User Salary', value: userSalary ?? 0, color: isDarkMode ? '#0ea5e9' : '#3b82f6' },
    { name: 'Minimum Salary', value: minSalary ?? 0, color: isDarkMode ? '#f97316' : '#fb923c' },
    { name: 'Maximum Salary', value: maxSalary ?? 0, color: isDarkMode ? '#84cc16' : '#a3e635' },
    { name: 'Average Salary', value: avgSalary ?? 0, color: isDarkMode ? '#eab308' : '#facc15' },
  ]

  // Create the series dynamically from the chartdata
  const seriesData = chartdata.map((item) => ({
    data: [item.value],
    label: item.name,
    color: item.color,
    valueFormatter: (value) => `$${value.toLocaleString()}`,
  }))

  return (
    <ThemeProvider theme={muiTheme}>
      <div className="inline-flex h-80 w-full justify-center rounded-lg bg-white dark:bg-zinc-900">
        <BarChart
          yAxis={[
            {
              data: [''],
              scaleType: 'band',
              categoryGapRatio: 0.1,
              barGapRatio: 1,
              label: 'Salaries',
            },
          ]}
          series={seriesData}
          className=""
          layout="horizontal"
          grid={{ vertical: true }}
          margin={{ top: chartMarginTop }}
          tooltip={{
            formatter: (params) => {
              return `$${params.value}`
            },
          }}
        />
      </div>
    </ThemeProvider>
  )
}

export default SalaryChart

const dataFormatter = (value) => {
  return formatCurrency(value)
}
