'use client'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { areaElementClasses } from '@mui/x-charts/LineChart'
import { SparkLineChart } from '@mui/x-charts/SparkLineChart'
import { useTheme } from 'next-themes'

function getDaysInMonth(month, year) {
  const date = new Date(year, month, 0)
  const monthName = date.toLocaleDateString('en-US', {
    month: 'short',
  })
  const daysInMonth = date.getDate()
  const days = []
  let i = 1
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`)
    i += 1
  }
  return days
}

function getAllMonths() {
  const months = []

  // Loop through months from 0 to 11 (JavaScript months are 0-indexed)
  for (let month = 0; month < 12; month++) {
    const date = new Date(2023, month) // Year can be any year
    const monthName = date.toLocaleDateString('en-US', {
      month: 'short',
    })
    months.push(monthName)
  }

  return months
}

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.3} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  )
}

function StatCard({ title, value, interval, trend, data }) {
  //   const muiTheme = muiUseTheme()

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

  muiTheme.palette.mode = isDarkMode ? 'dark' : 'light'

  //   const daysInWeek = getDaysInMonth(4, 2024)
  const months = getAllMonths()

  console.log('theme.palette: ', muiTheme.palette)
  console.log('muiTheme.palette.mode:', muiTheme.palette.mode)
  console.log('muiTheme:', muiTheme)

  //   muiTheme.palette.background.default = isDarkMode ? '#18181b' : '#ffffff'
  //   muiTheme.palette.background.paper = isDarkMode ? '#18181b' : '#ffffff'

  const trendColors = {
    up: muiTheme.palette.mode === 'light' ? muiTheme.palette.success.main : muiTheme.palette.success.dark,
    down: muiTheme.palette.mode === 'light' ? muiTheme.palette.error.main : muiTheme.palette.error.dark,
    neutral: muiTheme.palette.mode === 'light' ? muiTheme.palette.grey[400] : muiTheme.palette.grey[700],
  }

  const labelColors = {
    up: 'success',
    down: 'error',
    neutral: 'default',
  }

  const color = labelColors[trend]
  const chartColor = trendColors[trend]
  const trendValues = { up: '+25%', down: '-25%', neutral: '+5%' }

  return (
    <ThemeProvider theme={muiTheme}>
      <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
        <CardContent>
          <Typography component="h2" variant="subtitle2" gutterBottom>
            {title}
          </Typography>
          <Stack direction="column" sx={{ justifyContent: 'space-between', flexGrow: '1', gap: 1 }}>
            <Stack sx={{ justifyContent: 'space-between' }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" component="p">
                  {value}
                </Typography>
                <Chip size="small" color={color} label={trendValues[trend]} />
              </Stack>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {interval}
              </Typography>
            </Stack>
            <Box sx={{ width: '100%', height: 50 }}>
              <SparkLineChart
                colors={[chartColor]}
                data={data}
                area
                showHighlight
                showTooltip
                xAxis={{
                  scaleType: 'band',
                  data: months, // Use the correct property 'data' for xAxis
                }}
                sx={{
                  [`& .${areaElementClasses.root}`]: {
                    fill: `url(#area-gradient-${value})`,
                  },
                }}
              >
                <AreaGradient color={chartColor} id={`area-gradient-${value}`} />
              </SparkLineChart>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </ThemeProvider>
  )
}

export default StatCard
