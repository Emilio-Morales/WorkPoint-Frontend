'use client'
import { createTheme, ThemeProvider } from '@mui/material'
import { BarChart } from '@mui/x-charts/BarChart'
import { useTheme } from 'next-themes'

export default function SalaryQuartileChart({ userSalary, minSalary, maxSalary }) {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  const muiTheme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      background: {
        default: isDarkMode ? '#18181b' : '#ffffff',
        paper: isDarkMode ? '#18181b' : '#ffffff',
      },
      text: {
        primary: isDarkMode ? '#d1d5db' : '#374151',
      },
    },
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: isDarkMode ? '#18181b !important' : '#f3f4f6',
            color: isDarkMode ? '#d1d5db' : '#374151',
          },
        },
      },
      MuiChart: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#18181b' : '#f4f4f5',
            '& .MuiChart-tickLabel': {
              fill: isDarkMode ? '#9ca3af' : '#4b5563',
            },
            '& .MuiChart-axisLabel': {
              fill: isDarkMode ? '#d1d5db' : '#374151',
            },
            '& .MuiChartsLegend-series text': {
              fill: isDarkMode ? '#d1d5db' : '#374151',
            },
          },
        },
      },
    },
  })

  const colorPalette = [isDarkMode ? '#0ea5e9  ' : '#3b82f6  ', isDarkMode ? '#d97706   ' : '#f59e0b   ']

  const q1End = minSalary + (maxSalary - minSalary) * 0.25
  const q2End = minSalary + (maxSalary - minSalary) * 0.5
  const q3End = minSalary + (maxSalary - minSalary) * 0.75

  const userQuartile = userSalary <= q1End ? 'Q1' : userSalary <= q2End ? 'Q2' : userSalary <= q3End ? 'Q3' : 'Q4'

  const seriesData = [
    {
      data: [q1End],
      label: userQuartile === 'Q1' ? 'User Salary' : undefined,
      color: userQuartile === 'Q1' ? colorPalette[0] : colorPalette[1],
      valueFormatter: () => {
        return `Q1: $${minSalary.toLocaleString()} - $${q1End.toLocaleString()}`
      },
    },
    {
      data: [q2End],
      label: userQuartile === 'Q2' ? 'User Salary' : undefined,
      color: userQuartile === 'Q2' ? colorPalette[0] : colorPalette[1],
      valueFormatter: () => {
        return `Q2: $${q1End.toLocaleString()} - $${q2End.toLocaleString()}`
      },
    },
    {
      data: [q3End],
      label: userQuartile === 'Q3' ? 'User Salary' : undefined,
      color: userQuartile === 'Q3' ? colorPalette[0] : colorPalette[1],
      valueFormatter: () => {
        return `Q3: $${q2End.toLocaleString()} - $${q3End.toLocaleString()}`
      },
    },
    {
      data: [maxSalary],
      label: userQuartile === 'Q4' ? 'User Salary' : undefined,
      color: userQuartile === 'Q4' ? colorPalette[0] : colorPalette[1],
      valueFormatter: () => {
        return `Q4: $${q3End.toLocaleString()} - $${maxSalary.toLocaleString()}`
      },
    },
  ]

  return (
    <ThemeProvider theme={muiTheme}>
      <div className="inline-flex h-full max-h-80 w-full justify-center rounded-lg bg-white dark:bg-zinc-900">
        <BarChart
          xAxis={[
            {
              data: [''],
              scaleType: 'band',
              categoryGapRatio: 0.1,
              barGapRatio: 1,
              label: 'Quartiles',
            },
          ]}
          series={seriesData}
          className="p-2"
        />
      </div>
    </ThemeProvider>
  )
}
