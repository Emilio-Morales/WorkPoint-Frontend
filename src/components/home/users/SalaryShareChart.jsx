'use client'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'
import { createTheme, ThemeProvider } from '@mui/material'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import { useTheme } from 'next-themes'
import * as React from 'react'

const SalaryShareChart = ({ userSalary, departmentTotalSalary, userFirstName }) => {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  const muiTheme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
    components: {
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            height: 10,
            borderRadius: 5,
            backgroundColor: isDarkMode ? '#1f2937' : '#e5e7eb', // Unfilled part
          },
          bar: {
            borderRadius: 5,
            backgroundColor: isDarkMode ? '#34d399' : '#16a34a', // Filled part
          },
        },
      },
    },
  })

  const userSharePercentage = ((userSalary / departmentTotalSalary) * 100).toFixed(1)
  const visualProgress = userSharePercentage < 10 ? 10 : userSharePercentage
  console.log('userSalary:', userSalary)
  console.log('departmentTotalSalary:', departmentTotalSalary)
  console.log('userSharePercentage:', userSharePercentage)

  //   const testLimit = 66

  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= userSharePercentage ? userSharePercentage : prevProgress + 1))
    }, 40)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="mx-auto h-44 w-full max-w-80 p-4">
      <ThemeProvider theme={muiTheme}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress variant="determinate" value={visualProgress} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {`${progress}%`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
      <div className="max-w-[90%]">
        <Badge color="amber">
          Salary for {userFirstName} represents {userSharePercentage}% of the department budget. This is equivalent to{' '}
          {formatCurrency(userSalary)} out of a total departmental budget of {formatCurrency(departmentTotalSalary)}.
        </Badge>
      </div>
    </div>
  )
}

export default SalaryShareChart
