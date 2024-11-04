'use client'
import { createTheme, ThemeProvider } from '@mui/material'
import { BarChart } from '@mui/x-charts'
import { useTheme } from 'next-themes'

const SalaryChart = ({ userSalary, minSalary, maxSalary, avgSalary }) => {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

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
            backgroundColor: isDarkMode ? '#18181b' : '#f3f4f6', // Tooltip background color
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
    {
      name: 'User Salary',
      Salary: userSalary,
    },
    {
      name: 'Minimum Salary',
      Salary: minSalary,
    },
    {
      name: 'Maximum Salary',
      Salary: maxSalary,
    },
    {
      name: 'Average Salary',
      Salary: avgSalary,
    },
  ]

  return (
    <ThemeProvider theme={muiTheme}>
      <div className="h-80 w-full max-w-3xl overflow-hidden rounded-lg bg-white dark:bg-zinc-900">
        <BarChart
          dataset={chartdata}
          // xAxis takes the labels that we want on the x-axis
          xAxis={[
            {
              scaleType: 'band',
              dataKey: 'name',
              categoryGapRatio: 0.7,
              barGapRatio: 1,
            },
          ]}
          // series uses the data values for y-axis
          series={[{ dataKey: 'Salary', label: 'Salary Amount', color: isDarkMode ? '#3b82f6' : '#6366f1' }]}
          className="p-4"
        />
      </div>
    </ThemeProvider>
  )
}

export default SalaryChart

const dataFormatter = (value) => {
  return formatCurrency(value)
}
