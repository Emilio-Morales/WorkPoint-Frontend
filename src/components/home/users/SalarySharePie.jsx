'use client'
import { createTheme, ThemeProvider } from '@mui/material'
import { PieChart } from '@mui/x-charts'
import { useTheme } from 'next-themes'

const SalarySharePie = ({ userSalary, departmentTotalSalary, userFirstName, userDepartment }) => {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  const userShare = (userSalary / departmentTotalSalary) * 100
  const restOfBudgetShare = 100 - userShare

  const pieChartData = [
    {
      id: 0,
      value: userShare,
      label: `${userFirstName}`,
    },
    {
      id: 1,
      value: restOfBudgetShare,
      label: `Department`,
    },
  ]

  const colorPalette = [isDarkMode ? '#78716c' : '#a8a29e', isDarkMode ? '#27272a' : '#d1d5db']

  const muiTheme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  })

  return (
    <ThemeProvider theme={muiTheme}>
      <PieChart
        series={[
          {
            data: pieChartData,
          },
        ]}
        colors={colorPalette}
      />
    </ThemeProvider>
  )
}

export default SalarySharePie
