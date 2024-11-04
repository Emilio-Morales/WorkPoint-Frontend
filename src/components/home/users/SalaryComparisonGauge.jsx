'use client'
import { Gauge, gaugeClasses } from '@mui/x-charts'
import { useTheme } from 'next-themes'

const SalaryComparisonGauge = ({ userSalary, companyAverageSalary }) => {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  // const percentageOfAverage = (userSalary / companyAverageSalary) * 100;
  const percentageOfAverage = 120

  const gaugeColor =
    percentageOfAverage < 90
      ? 'red' // Below average
      : percentageOfAverage <= 110
        ? 'orange' // Near average
        : 'green' // Above average

  return (
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
              fill: isDarkMode ? '#d1d5db' : '#374151', // Ensure color change applies here
            },
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: gaugeColor, // The color of the arc displaying the value
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: isDarkMode ? '#4b5563' : '#e5e7eb', // The color of the arc displaying the range
          },
        }}
      />
    </div>
  )
}

export default SalaryComparisonGauge
