'use client'
import { createTheme, ThemeProvider } from '@mui/material'
import { Gauge, gaugeClasses } from '@mui/x-charts'
import { useTheme } from 'next-themes'

const SalaryComparisonGauge = ({ userSalary, companyAverageSalary }) => {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  const percentageOfAverage = (userSalary / companyAverageSalary) * 100

  const muiTheme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  })

  return (
    <ThemeProvider theme={muiTheme}>
      <div className="mx-auto h-full max-h-80 w-full max-w-80 p-2">
        <Gauge
          value={percentageOfAverage}
          valueMin={0}
          valueMax={200}
          startAngle={0}
          endAngle={360}
          innerRadius="70%"
          outerRadius="100%"
          text={`${percentageOfAverage.toFixed(1)}%`}
          sx={{
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 40,
              fill: isDarkMode ? '#d1d5db' : '#374151',

              '& tspan': {
                fontSize: 40,
                fill: isDarkMode ? '#d1d5db' : '#09090b',
              },
            },
            [`& .${gaugeClasses.valueArc}`]: {
              fill: isDarkMode ? '#78716c  ' : '#a8a29e  ',
            },
            [`& .${gaugeClasses.referenceArc}`]: {
              fill: isDarkMode ? '#27272a' : '#e4e4e7',
            },
          }}
        />
      </div>
    </ThemeProvider>
  )
}

export default SalaryComparisonGauge
