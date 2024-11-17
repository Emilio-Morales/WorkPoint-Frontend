'use client'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { LineChart } from '@mui/x-charts/LineChart'
import { useTheme } from 'next-themes'

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  )
}

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

function formatData(data) {
  const propertiesToArray = Object.values(data)
  const dataArray = propertiesToArray[0]

  const rateOfChange = dataArray.map((value, index, array) => {
    if (index === 0) return 0 // No rate of change for the first month
    return value - array[index - 1] // Monthly difference
  })

  const result = []

  if (data['totalBudget']) {
    result.push({
      id: 'total-budget',
      label: 'Total Budget',
      showMark: false,
      curve: 'linear',
      // stack: 'total',
      // area: true,
      // stackOrder: 'ascending',
      // data: [300, 900, 600, 1200, 1500, 1800, 2400, 2100, 2700, 3000, 1800, 3300],
      data: rateOfChange,
      // data: [
      //   116256588, 119005117, 120860721, 122052533, 123900109, 125348984, 127686610, 129278440, 131404242,
      //   133122616, 136651613, 137692611.88000008,
      // ],
      // data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    })
  }

  if (data['totalActiveBudget']) {
    result.push({
      id: 'total-active-budget',
      label: 'Total Active Budget',
      showMark: false,
      curve: 'linear',
      // stack: 'total',
      // area: true,
      // stackOrder: 'ascending',
      // data: [500, 900, 700, 1400, 1100, 1700, 2300, 2000, 2600, 2900, 2300, 3200],
      data: rateOfChange,
    })
  }
  if (data['totalInactiveBudget']) {
    result.push({
      id: 'total-inactive-budget',
      label: 'Total Inactive Budget',
      showMark: false,
      curve: 'linear',
      // stack: 'total',
      // stackOrder: 'ascending',
      // data: [1000, 1500, 1200, 1700, 1300, 2000, 2400, 2200, 2600, 2800, 2500, 3000],
      data: rateOfChange,
      // area: true,
    })
  }

  return result
}

/* 
Budgets is expecting to recieve 1 of 3 properties:
  totalBudget,
  totalActiveBudget,
  totalInactiveBudget,

  All three of these are an array of numbers
*/
export default function BudgetRateOfChangeChart({ budgets }) {
  const budgetData = formatData(budgets)

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
        primary: isDarkMode ? '#FFFFFF' : 'hsl(220, 30%, 6%)',
        secondary: isDarkMode ? 'rgb(148, 160, 184)' : 'hsl(220, 20%, 35%)',
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
  const data = getAllMonths()

  const colorPalette = [muiTheme.palette.primary.light, muiTheme.palette.primary.main, muiTheme.palette.primary.dark]

  return (
    <ThemeProvider theme={muiTheme}>
      <Card variant="outlined" sx={{ width: '100%' }}>
        <CardContent sx={{}}>
          <Typography component="h2" variant="subtitle2" gutterBottom>
            Sessions
          </Typography>
          <Stack sx={{ justifyContent: 'space-between' }}>
            <Stack
              direction="row"
              sx={{
                alignContent: { xs: 'center', sm: 'flex-start' },
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography variant="h4" component="p">
                13,277
              </Typography>
              <Chip
                size="small"
                color="success"
                label="+35%"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  paddingLeft: '8px',
                  paddingRight: '8px',
                  border: '1px solid',
                  fontSize: '0.75rem',
                  borderRadius: '999px',
                  borderColor: isDarkMode ? 'hsl(120, 84%, 10%)' : 'hsl(120, 75%, 87%)',

                  backgroundColor: isDarkMode ? 'hsl(120, 87%, 6%)' : 'hsl(120, 80%, 98%)',
                  color: isDarkMode ? 'hsl(120, 61%, 77%)' : 'hsl(120, 59%, 30%)',
                  fontWeight: 600,
                }}
              />
            </Stack>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Sessions per day for the last 30 days
            </Typography>
          </Stack>
          <LineChart
            colors={colorPalette}
            xAxis={[
              {
                scaleType: 'point',
                data,
                tickInterval: (index, i) => (i + 1) % 2 === 0,
              },
            ]}
            series={budgetData}
            height={250}
            margin={{
              left: 90,
              right: 20,
              top: 20,
              bottom: 20,
            }}
            grid={{ horizontal: true }}
            sx={{
              '& .MuiAreaElement-series-total-inactive-budget': {
                fill: "url('#total-inactive-budget')",
              },
              '& .MuiAreaElement-series-total-active-budget': {
                fill: "url('#total-active-budget')",
              },
              '& .MuiAreaElement-series-total-budget': {
                fill: "url('#total-budget')",
              },
            }}
            slotProps={{
              legend: {
                hidden: true,
              },
            }}
            yAxis={[
              {
                // data: [totalBudget[totalBudget.length - 1], 108000000, 81000000, 54000000, 27000000, 0],
                // min: 50000000, // Set an appropriate minimum value that fits your data range
                // max: 200000000,
                // strict: true,
                // scaleType: 'linear',
                // tickInterval: [27000000, 54000000, 81000000, 108000000, 135000000],
                // tickInterval: (min, max) => {
                //   return (max - min) / 5 // Calculate the tick interval to divide the y-axis into approximately 5 intervals
                // },
              },
            ]}
          >
            {/* <AreaGradient color={muiTheme.palette.primary.dark} id="total-inactive-budget" />
            <AreaGradient color={muiTheme.palette.primary.main} id="total-active-budget" />
            <AreaGradient color={muiTheme.palette.primary.light} id="total-budget" /> */}

            <AreaGradient color="red" id="total-inactive-budget" />
            <AreaGradient color="green" id="total-active-budget" />
            <AreaGradient color="blue" id="total-budget" />
          </LineChart>
        </CardContent>
      </Card>
    </ThemeProvider>
  )
}
