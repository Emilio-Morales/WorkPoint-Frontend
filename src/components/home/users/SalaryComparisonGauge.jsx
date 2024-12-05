'use client'
import { createTheme, ThemeProvider } from '@mui/material'
import { Gauge, gaugeClasses } from '@mui/x-charts'
import { useTheme } from 'next-themes'

const SalaryComparisonGauge = ({ userSalary, companyAverageSalary }) => {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  const percentageOfAverage = (userSalary / companyAverageSalary) * 100
  // const percentageOfAverage = 120

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
          valueMax={200} // Still representing up to 200% of average
          startAngle={0} // Starts at 0 degrees
          endAngle={360} // Goes all the way around
          innerRadius="70%"
          outerRadius="100%"
          text={`${percentageOfAverage.toFixed(1)}%`}
          sx={{
            // Define custom styles for different gauge elements using gaugeClasses
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 40, // This sets the font size of the <text> element
              fill: isDarkMode ? '#d1d5db' : '#374151', // Adjust the value text color based on the theme
              // Target the <tspan> inside the valueText to make sure the style actually applies
              '& tspan': {
                fontSize: 40,
                fill: isDarkMode ? '#d1d5db' : '#09090b', // Ensure color change applies here
              },
            },
            [`& .${gaugeClasses.valueArc}`]: {
              fill: isDarkMode ? '#78716c  ' : '#a8a29e  ', // The color of the arc displaying the value
            },
            [`& .${gaugeClasses.referenceArc}`]: {
              fill: isDarkMode ? '#27272a' : '#e4e4e7', // The color of the arc displaying the range
            },
          }}
        />
      </div>
    </ThemeProvider>
  )
}

export default SalaryComparisonGauge
