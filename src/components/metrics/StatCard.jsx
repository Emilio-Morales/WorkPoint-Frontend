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

function StatCard({ title, value, interval, trend, data, rate }) {
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
        primary: isDarkMode ? '#d1d5db' : 'hsl(220, 30%, 6%)',
        secondary: isDarkMode ? 'hsl(215, 15%, 75%)' : 'hsl(220, 20%, 35%)',
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
  const months = getAllMonths()
  // const trendColors = {
  //   up: muiTheme.palette.mode === 'light' ? 'hsl(120, 59%, 30%)' : 'hsl(120, 75%, 16%)',
  //   down: muiTheme.palette.mode === 'light' ? 'hsl(0, 90%, 40%)' : 'hsl(0, 94%, 18%)',
  //   neutral: muiTheme.palette.mode === 'light' ? 'hsl(220, 20%, 65%)' : 'hsl(220, 20%, 25%)',
  // }
  const trendColors = {
    up: muiTheme.palette.mode === 'light' ? 'hsl(144, 72%, 41%)' : 'hsl(144, 72%, 37%)',
    down: muiTheme.palette.mode === 'light' ? 'hsl(355, 98%, 66%)' : 'hsl(355, 98%, 39%)',
    neutral: muiTheme.palette.mode === 'light' ? 'hsl(220, 20%, 65%)' : 'hsl(220, 20%, 25%)',
  }

  const labelColors = {
    up: 'success',
    down: 'error',
    neutral: 'default',
  }

  const color = labelColors[trend]
  const chartColor = trendColors[trend]
  const trendValues = { up: `+${rate}%`, down: `-${rate}%`, neutral: '+5%' }

  return (
    <ThemeProvider theme={muiTheme}>
      <Card variant="outlined" sx={{ height: '100%', flexGrow: 1 }}>
        <CardContent>
          <Typography
            component="h2"
            variant="subtitle2"
            gutterBottom
            sx={{
              fontWeight: 500,

              color: isDarkMode ? '#FFFFFF' : 'hsl(220, 30%, 6%)',
            }}
          >
            {title}
          </Typography>
          <Stack direction="column" sx={{ justifyContent: 'space-between', flexGrow: '1', gap: 1 }}>
            <Stack sx={{ justifyContent: 'space-between' }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography
                  variant="h4"
                  component="p"
                  sx={{
                    fontWeight: 600,
                    color: isDarkMode ? '#FFFFFF' : 'hsl(220, 30%, 6%)',
                    fontSize: '1.5rem',
                    lineHeight: '1.5',
                  }}
                >
                  {value}
                </Typography>
                <Chip
                  size="small"
                  color={color}
                  label={trendValues[trend]}
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    border: '1px solid',
                    fontSize: '0.75rem',
                    borderRadius: '999px',
                    borderColor:
                      trend === 'up'
                        ? isDarkMode
                          ? 'hsl(120, 84%, 10%)'
                          : 'hsl(120, 75%, 87%)'
                        : isDarkMode
                          ? 'hsl(0, 95%, 12%)'
                          : 'hsl(0, 92%, 90%)', // Conditional colors based on trend type
                    backgroundColor:
                      trend === 'up'
                        ? isDarkMode
                          ? 'hsl(120, 87%, 6%)'
                          : 'hsl(120, 80%, 98%)'
                        : isDarkMode
                          ? 'hsl(0, 93%, 6%)'
                          : 'hsl(0, 100%, 97%)', // Conditional colors for joined vs exited
                    color:
                      trend === 'up'
                        ? isDarkMode
                          ? 'hsl(120, 61%, 77%)'
                          : 'hsl(120, 59%, 30%)'
                        : isDarkMode
                          ? 'hsl(0, 94%, 80%)'
                          : 'hsl(0, 59%, 30%)', // Text color
                    fontWeight: 600,
                  }}
                />
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
