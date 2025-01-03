'use client'
import { createTheme, styled, ThemeProvider } from '@mui/material/styles'
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
        {primaryText}
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

export default function DepartmentGrowthPieChart({ pieChartData }) {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'
  const { totalEmployeesJoined, formattedData } = pieChartData

  const data = formattedData
  const muiTheme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      background: {
        default: isDarkMode ? '#18181b' : '#ffffff',
        paper: isDarkMode ? '#18181b' : '#ffffff',
      },
      text: {
        primary: isDarkMode ? '#fff ' : 'hsl(220, 30%, 6%)',
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
        '#b2805b', // Deep warm brownish-orange
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
        '#ffeed0', // Lightest warm tone for dark mode
      ]
    : [
        '#d19f72', // Medium warm brownish-orange
        '#d8a87b',
        '#dfb186',
        '#e6bb91',
        '#ecc59c',
        '#f1cea6',
        '#f5d7b0',
        '#f8dfb9',
        '#fae7c2',
        '#fcf0ca',
        '#f4e3b8', // Adjusted for better contrast
        '#f2deb0', // Adjusted for better contrast
      ]

  return (
    <ThemeProvider theme={muiTheme}>
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
            innerRadius: 40,
            outerRadius: 90,
            paddingAngle: 0,
            highlightScope: { faded: 'global', highlighted: 'item' },
            valueFormatter: (value) => `${value.value} new employees`,
          },
        ]}
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
        <PieCenterLabel primaryText={totalEmployeesJoined} secondaryText="Joined" isDarkMode={isDarkMode} />
      </PieChart>
    </ThemeProvider>
  )
}
