'use client'
import { formatCurrency } from '@/lib/utils'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack'
import { createTheme, styled, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useDrawingArea } from '@mui/x-charts/hooks'
import { pieArcClasses, PieChart } from '@mui/x-charts/PieChart'
import { useTheme } from 'next-themes'
import PropTypes from 'prop-types'
import * as React from 'react'

const StyledText = styled('text', {
  shouldForwardProp: (prop) => prop !== 'variant',
})(({ theme }) => ({
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fill: (theme.vars || theme).palette.text.secondary,
  variants: [
    {
      props: {
        variant: 'primary',
      },
      style: {
        fontSize: theme.typography.h5.fontSize,
      },
    },
    {
      props: ({ variant }) => variant !== 'primary',
      style: {
        fontSize: theme.typography.body2.fontSize,
      },
    },
    {
      props: {
        variant: 'primary',
      },
      style: {
        fontWeight: theme.typography.h5.fontWeight,
      },
    },
    {
      props: ({ variant }) => variant !== 'primary',
      style: {
        fontWeight: theme.typography.body2.fontWeight,
      },
    },
  ],
}))

function PieCenterLabel({ primaryText, secondaryText, isDarkMode }) {
  const { width, height, left, top } = useDrawingArea()
  const primaryY = top + height / 2 - 10
  const secondaryY = primaryY + 24

  return (
    <React.Fragment>
      <StyledText
        variant="primary"
        x={left + width / 2}
        y={primaryY}
        sx={{
          fill: isDarkMode ? 'white' : 'rgb(9, 9, 11)',
        }}
      >
        ${primaryText}
      </StyledText>
      <StyledText
        variant="secondary"
        x={left + width / 2}
        y={secondaryY}
        sx={{
          fill: isDarkMode ? 'white' : 'rgb(9, 9, 11)',
        }}
      >
        {secondaryText}
      </StyledText>
    </React.Fragment>
  )
}

PieCenterLabel.propTypes = {
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
}

export default function BudgetAllocationChart({ departments, pieChartData }) {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'
  const { totalBudget, formattedData } = pieChartData

  const data = formattedData
  const muiTheme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      background: {
        default: isDarkMode ? '#18181b' : '#ffffff',
        paper: isDarkMode ? '#18181b' : '#ffffff',
      },
      text: {
        primary: isDarkMode ? '#fff !important' : 'hsl(220, 30%, 6%)',
        secondary: isDarkMode ? '#d1d5db' : 'hsl(220, 20%, 35%)',
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
    },
  })

  const colors = isDarkMode
    ? [
        '#b2805b',
        '#bf8e65',
        '#c99a70',
        '#d2a47a',
        '#dbaf85',
        '#e3ba90',
        '#eac49b',
        '#f0cea6',
        '#f5d8b1',
        '#f9e0bb',
        '#fbe7c4',
        '#ffeed0',
      ]
    : [
        '#d19f72',
        '#d8a87b',
        '#dfb186',
        '#e6bb91',
        '#ecc59c',
        '#f1cea6',
        '#f5d7b0',
        '#f8dfb9',
        '#fae7c2',
        '#fcf0ca',
        '#f4e3b8',
        '#f2deb0',
      ]

  return (
    <ThemeProvider theme={muiTheme}>
      <Card
        variant=""
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          flexGrow: 1,
          backgroundColor: 'transparent',
          border: 'none',
          borderWidth: 0,
        }}
      >
        <CardContent>
          <Typography
            component="h2"
            variant="subtitle2"
            sx={{ color: isDarkMode ? 'hsl(0, 0%, 100%)' : 'hsl(220, 30%, 6%)', fontWeight: 600 }}
          >
            Department Budget Allocation
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PieChart
              colors={colors}
              margin={{
                left: 80,
                right: 80,
                top: 80,
                bottom: 80,
              }}
              series={[
                {
                  data,
                  innerRadius: 75,
                  outerRadius: 100,
                  paddingAngle: 0,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                  valueFormatter: (value) => `${formatCurrency(value.value)}`,
                },
              ]}
              height={260}
              width={260}
              slotProps={{
                legend: { hidden: true },
              }}
              sx={{
                [`& .${pieArcClasses.root}`]: {
                  stroke: 'none',
                  strokeWidth: 0,
                },
              }}
            >
              <PieCenterLabel primaryText={totalBudget} secondaryText="Total" isDarkMode={isDarkMode} />
            </PieChart>
          </Box>
          <Box
            sx={{
              overflowY: 'auto',
              maxHeight: '270px',
              '&::-webkit-scrollbar': {
                display: 'none', // Hide scrollbar for Chrome, Safari, and Edge
              },
              '-ms-overflow-style': 'none', // Hide scrollbar for Internet Explorer
              'scrollbar-width': 'none', // Hide scrollbar for Firefox
            }}
          >
            {departments.map((department, index) => (
              <Stack key={index} direction="row" sx={{ alignItems: 'center', gap: 2, pb: 2 }}>
                {department.departmentIcon}
                <Stack sx={{ gap: 1, flexGrow: 1 }}>
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: '500', color: isDarkMode ? 'white' : 'rgb(9, 9, 11)' }}
                    >
                      {department.departmentName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: isDarkMode ? 'white' : 'rgb(9, 9, 11)' }}>
                      {department.departmentBudgetShare}%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    aria-label="Number of users by country"
                    value={department.departmentBudgetShare}
                    sx={{
                      backgroundColor: isDarkMode ? '#27272a' : '#d1d5db',
                      [`& .${linearProgressClasses.bar}`]: {
                        //   backgroundColor: country.color,
                        // backgroundColor: isDarkMode ? '#78716c' : '#a8a29e',
                        backgroundColor: colors[0],
                      },
                    }}
                  />
                </Stack>
              </Stack>
            ))}
          </Box>
        </CardContent>
      </Card>
    </ThemeProvider>
  )
}
