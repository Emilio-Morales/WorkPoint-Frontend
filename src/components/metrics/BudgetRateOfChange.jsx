'use client'
import { formatCurrency } from '@/lib/utils'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { LineChart } from '@mui/x-charts/LineChart'
import { useTheme } from 'next-themes'

const colorMap = {
  light: {
    'total-budget': 'hsl(215, 15%, 75%)',
    'total-active-budget': 'hsl(144, 72%, 41%)',
    'total-inactive-budget': 'hsl(355, 98%, 66%)',
  },
  dark: {
    'total-budget': 'hsl(215, 15%, 40%)',
    'total-active-budget': 'hsl(144, 72%, 37%)',
    'total-inactive-budget': 'hsl(355, 98%, 39%)',
  },
}

function getAllMonths() {
  const months = []

  for (let month = 0; month < 12; month++) {
    const date = new Date(2023, month)
    const monthName = date.toLocaleDateString('en-US', {
      month: 'short',
    })
    months.push(monthName)
  }

  return months
}

function formatData(data, variant, isDarkMode) {
  const dataArray =
    variant === 'activeVsInactive'
      ? data['totalBudget']
      : variant === 'totalVsActive'
        ? data['totalActiveBudget']
        : data['totalInactiveBudget']

  const rateOfChange = dataArray.map((value, index, array) => {
    if (index === 0) return 0 // No rate of change for the first month
    return value - array[index - 1] // Monthly difference
  })

  const result = []
  const colors = isDarkMode ? colorMap.dark : colorMap.light

  if (data['totalBudget']) {
    result.push({
      id: 'total-budget',
      label: 'Total Budget Monthly Change',
      showMark: false,
      curve: 'linear',
      color: colors['total-budget'],
      data: rateOfChange,
    })
  } else if (data['totalActiveBudget']) {
    result.push({
      id: 'total-active-budget',
      label: 'Active Employee Budget Monthly Change',
      showMark: false,
      curve: 'linear',
      color: colors['total-active-budget'],
      data: rateOfChange,
    })
  } else if (data['totalInactiveBudget']) {
    result.push({
      id: 'total-inactive-budget',
      label: 'Inactive Employee Budget Monthly Change',
      showMark: false,
      curve: 'linear',
      color: colors['total-inactive-budget'],
      data: rateOfChange,
    })
  }

  return result
}

// Calculates next change over all months and returns appropriate text to be rendered.
function calculateNetChange(budget) {
  let budgetSum = 0
  budget.forEach((element) => {
    budgetSum += element
  })

  const result = formatCurrency(budgetSum)

  return result
}

/* 
Budgets is expecting to recieve 1 of 3 properties:
  totalBudget,
  totalActiveBudget,
  totalInactiveBudget,

  All three of these are an array of numbers
*/
export default function BudgetRateOfChangeChart({ budgets, heading, description, variant, metricType }) {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  const budgetData = formatData(budgets, variant, isDarkMode)
  const budgetSum = calculateNetChange(budgetData[0].data)

  const muiTheme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      background: {
        default: isDarkMode ? '#18181b' : '#ffffff',
        paper: isDarkMode ? '#18181b' : '#ffffff',
      },
      text: {
        primary: isDarkMode ? '#d1d5db' : '#374151',
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
  const data = getAllMonths()

  const colorPalette = [muiTheme.palette.primary.light, muiTheme.palette.primary.main, muiTheme.palette.primary.dark]

  return (
    <ThemeProvider theme={muiTheme}>
      <Card
        variant="outlined"
        sx={{
          width: '100%',
          border: '0',
          borderRadius: '0.5rem',
          borderColor: isDarkMode ? 'rgb(255 255 255 / 0.1)' : 'rgb(9 9 11 / 0.05)',
        }}
      >
        <CardContent sx={{}}>
          <Typography
            component="h2"
            variant="subtitle2"
            gutterBottom
            sx={{
              color: isDarkMode ? 'hsl(0, 0%, 100%)' : 'hsl(220, 30%, 6%)',
            }}
          >
            {heading}
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
              <Typography
                variant="h5"
                component="p"
                sx={{
                  color: isDarkMode ? 'hsl(0, 0%, 100%)' : 'hsl(220, 30%, 6%)',
                }}
              >
                {budgetSum}
              </Typography>
            </Stack>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {description}
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
              left: 65,
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
            yAxis={[{}]}
          ></LineChart>
        </CardContent>
      </Card>
    </ThemeProvider>
  )
}
