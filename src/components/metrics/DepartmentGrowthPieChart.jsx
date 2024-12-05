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

// function PieCenterLabel({ primaryText, secondaryText }) {
//   const { width, height, left, top } = useDrawingArea()
//   const primaryY = top + height / 2 - 10
//   const secondaryY = primaryY + 24

//   return (
//     <React.Fragment>
//       <StyledText variant="primary" x={left + width / 2} y={primaryY}>
//         {primaryText}
//       </StyledText>
//       <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
//         {secondaryText}
//       </StyledText>
//     </React.Fragment>
//   )
// }

// PieCenterLabel.propTypes = {
//   primaryText: PropTypes.string.isRequired,
//   secondaryText: PropTypes.string.isRequired,
// }
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

// const colors = ['hsl(220, 20%, 65%)', 'hsl(220, 20%, 42%)', 'hsl(220, 20%, 35%)', 'hsl(220, 20%, 25%)']

export default function DepartmentGrowthPieChart({ pieChartData }) {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'
  const { totalEmployeesJoined, formattedData } = pieChartData

  console.log('pie chart data', formattedData)
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

  //   const colors = isDarkMode
  //     ? [
  //         '#0ea5e9', // sky-600
  //         '#0284c7', // sky-700
  //         '#2563eb', // indigo-600
  //         '#d946ef', // fuchsia-500
  //         '#f59e0b', // amber-500
  //         '#14b8a6', // teal-500
  //         '#4ade80', // green-400
  //         '#f97316', // orange-500
  //         '#c084fc', // violet-500
  //         '#8b5cf6', // indigo-500
  //         '#22c55e', // green-500
  //         '#f43f5e', // rose-500
  //       ]
  //     : [
  //         '#38bdf8', // sky-400
  //         '#60a5fa', // sky-300
  //         '#6366f1', // indigo-400
  //         '#f472b6', // pink-400
  //         '#fbbf24', // amber-300
  //         '#2dd4bf', // teal-300
  //         '#6ee7b7', // green-300
  //         '#fb923c', // orange-300
  //         '#a78bfa', // violet-300
  //         '#c4b5fd', // indigo-300
  //         '#86efac', // green-300
  //         '#fb7185', // rose-400
  //       ]

  //   const colors = isDarkMode
  //     ? [
  //         '#d97706', // amber-600
  //         '#facc15', // yellow-500
  //         '#16a34a', // green-600
  //         '#f472b6', // pink-400
  //         '#0284c7', // blue-600
  //         '#f87171', // red-500
  //         '#8b5cf6', // violet-500
  //         '#34d399', // emerald-400
  //         '#fb923c', // orange-400
  //         '#60a5fa', // blue-400
  //         '#4ade80', // green-400
  //         '#ec4899', // pink-500
  //       ]
  //     : [
  //         '#fde047', // yellow-300
  //         '#facc15', // yellow-400
  //         '#4ade80', // green-300
  //         '#f9a8d4', // pink-300
  //         '#93c5fd', // blue-300
  //         '#f87171', // red-400
  //         '#c084fc', // violet-400
  //         '#6ee7b7', // emerald-300
  //         '#fdba74', // orange-300
  //         '#93c5fd', // blue-300
  //         '#86efac', // green-300
  //         '#f472b6', // pink-400
  //       ]

  //   const colors = isDarkMode
  //     ? [
  //         '#16a34a', // Dark Green
  //         '#0ea5e9', // Light Blue
  //         '#d946ef', // Pinkish Purple
  //         '#f59e0b', // Golden Yellow
  //         '#3b82f6', // Blue
  //         '#ec4899', // Bright Pink
  //         '#f43f5e', // Red
  //         '#a855f7', // Bright Purple
  //         '#10b981', // Emerald Green
  //         '#fb923c', // Orange
  //         '#8b5cf6', // Violet
  //         '#fcd34d', // Light Yellow
  //       ]
  //     : [
  //         '#22c55e', // Bright Green
  //         '#38bdf8', // Sky Blue
  //         '#f472b6', // Pinkish Purple
  //         '#fbbf24', // Gold Yellow
  //         '#60a5fa', // Lighter Blue
  //         '#f9a8d4', // Light Pink
  //         '#fb7185', // Coral Red
  //         '#c084fc', // Lavender Purple
  //         '#34d399', // Bright Emerald
  //         '#fdba74', // Light Orange
  //         '#a78bfa', // Light Violet
  //         '#fde68a', // Cream Yellow
  //       ]

  //   const colors = isDarkMode
  //     ? [
  //         '#84cc16', // Lime green
  //         '#fbbf24', // Amber
  //         '#f472b6', // Pink
  //         '#60a5fa', // Blue
  //         '#34d399', // Emerald
  //         '#f87171', // Red
  //         '#facc15', // Yellow
  //         '#a78bfa', // Purple
  //         '#f97316', // Orange
  //         '#22d3ee', // Cyan
  //         '#c084fc', // Violet
  //         '#e879f9', // Magenta
  //       ]
  //     : [
  //         '#4d7c0f', // Darker Lime green
  //         '#d97706', // Dark Amber
  //         '#db2777', // Dark Pink
  //         '#2563eb', // Dark Blue
  //         '#059669', // Dark Emerald
  //         '#dc2626', // Dark Red
  //         '#ca8a04', // Dark Yellow
  //         '#7c3aed', // Dark Purple
  //         '#c2410c', // Dark Orange
  //         '#0891b2', // Dark Cyan
  //         '#9333ea', // Dark Violet
  //         '#c026d3', // Dark Magenta
  //       ]

  //
  //       ]
  //   const colors = isDarkMode
  //     ? [
  //         '#5b21b6', // purple-800
  //         '#b91c1c', // red-700
  //         '#065f46', // teal-800
  //         '#4338ca', // indigo-700
  //         '#b45309', // amber-700
  //         '#047857', // emerald-700
  //         '#7c3aed', // violet-700
  //         '#9d174d', // rose-700
  //         '#c2410c', // orange-700
  //         '#4f46e5', // blue-700
  //         '#059669', // green-700
  //         '#dc2626', // red-600
  //       ]
  //     : [
  //         '#c4b5fd', // purple-300
  //         '#fca5a5', // red-300
  //         '#6ee7b7', // teal-300
  //         '#a5b4fc', // indigo-300
  //         '#fdba74', // amber-300
  //         '#6ee7b7', // emerald-300
  //         '#c084fc', // violet-400
  //         '#f9a8d4', // rose-300
  //         '#fbbf24', // orange-300
  //         '#93c5fd', // blue-300
  //         '#86efac', // green-300
  //         '#f87171', // red-400
  //       ]

  //   const colors = isDarkMode
  //     ? [
  //         '#14532d', // Darker teal
  //         '#166534',
  //         '#15803d',
  //         '#16a34a',
  //         '#22c55e',
  //         '#4ade80',
  //         '#86efac',
  //         '#bbf7d0', // Lighter teal to emerald
  //         '#d9f99d',
  //         '#bef264',
  //         '#a3e635',
  //         '#84cc16',
  //       ]
  //     : [
  //         '#1e3a8a', // Darker blue
  //         '#1e40af',
  //         '#1d4ed8',
  //         '#2563eb',
  //         '#3b82f6',
  //         '#60a5fa',
  //         '#93c5fd',
  //         '#bfdbfe', // Lighter blue to greenish blue
  //         '#d1fae5',
  //         '#bbf7d0',
  //         '#86efac',
  //         '#4ade80',
  //       ]
  //   const colors = isDarkMode
  //     ? [
  //         '#1e3a8a', // Dark Indigo
  //         '#1e40af', // Royal Blue
  //         '#1d4ed8', // Blue
  //         '#2563eb', // Light Blue
  //         '#3b82f6', // Sky Blue
  //         '#60a5fa', // Soft Blue
  //         '#93c5fd', // Light Indigo
  //         '#bfdbfe', // Light Blue
  //         '#dbeafe', // Very Light Blue
  //         '#eff6ff', // Almost White Blue
  //         '#1e3a8a', // Dark Indigo
  //         '#1e40af', // Royal Blue
  //       ]
  //     : [
  //         '#3b82f6', // Sky Blue
  //         '#60a5fa', // Soft Blue
  //         '#93c5fd', // Light Indigo
  //         '#bfdbfe', // Light Blue
  //         '#dbeafe', // Very Light Blue
  //         '#1e3a8a', // Dark Indigo
  //         '#1e40af', // Royal Blue
  //         '#1d4ed8', // Blue
  //         '#2563eb', // Light Blue
  //         '#93c5fd', // Light Indigo
  //         '#bfdbfe', // Light Blue
  //         '#eff6ff', // Almost White Blue
  //       ]

  //   const colors = isDarkMode
  //     ? [
  //         '#064e3b', // Deep Teal
  //         '#065f46', // Pine Green
  //         '#047857', // Dark Emerald
  //         '#059669', // Emerald
  //         '#10b981', // Green
  //         '#34d399', // Light Green
  //         '#6ee7b7', // Very Light Green
  //         '#a7f3d0', // Mint Green
  //         '#d1fae5', // Very Pale Green
  //         '#def7ec', // Pale Mint
  //         '#064e3b', // Deep Teal
  //         '#065f46', // Pine Green
  //       ]
  //     : [
  //         '#34d399', // Light Green
  //         '#6ee7b7', // Very Light Green
  //         '#a7f3d0', // Mint Green
  //         '#d1fae5', // Very Pale Green
  //         '#def7ec', // Pale Mint
  //         '#047857', // Dark Emerald
  //         '#059669', // Emerald
  //         '#10b981', // Green
  //         '#065f46', // Pine Green
  //         '#a7f3d0', // Mint Green
  //         '#d1fae5', // Very Pale Green
  //         '#eff6ff', // Almost White
  //       ]

  //   const colors = isDarkMode
  //     ? [
  //         '#4c1d95', // Deep Violet
  //         '#5b21b6', // Dark Purple
  //         '#6d28d9', // Purple
  //         '#7c3aed', // Bright Purple
  //         '#8b5cf6', // Soft Purple
  //         '#a78bfa', // Lavender
  //         '#c4b5fd', // Very Light Lavender
  //         '#ddd6fe', // Light Lilac
  //         '#ede9fe', // Very Light Lilac
  //         '#f5f3ff', // Almost White Purple
  //         '#4c1d95', // Deep Violet
  //         '#5b21b6', // Dark Purple
  //       ]
  //     : [
  //         '#8b5cf6', // Soft Purple
  //         '#a78bfa', // Lavender
  //         '#c4b5fd', // Very Light Lavender
  //         '#ddd6fe', // Light Lilac
  //         '#ede9fe', // Very Light Lilac
  //         '#6d28d9', // Purple
  //         '#7c3aed', // Bright Purple
  //         '#5b21b6', // Dark Purple
  //         '#4c1d95', // Deep Violet
  //         '#a78bfa', // Lavender
  //         '#ddd6fe', // Light Lilac
  //         '#f5f3ff', // Almost White Purple
  //       ]

  //   const colors = isDarkMode
  //     ? [
  //         '#a16336', // Dark mode - deeper brownish-orange
  //         '#ae6f3e',
  //         '#b77b47',
  //         '#c08751',
  //         '#c9935a',
  //         '#d29f64',
  //         '#dbaa6d',
  //         '#e3b677',
  //         '#eac180',
  //         '#f2cd8a',
  //         '#f8d995',
  //         '#ffe39f', // Lightest version for dark mode
  //       ]
  //     : [
  //         '#e8c08f', // Light mode - matching lighter brownish-orange
  //         '#f2c999',
  //         '#f8d3a3',
  //         '#ffdda9',
  //         '#ffdcb3',
  //         '#ffe5bd',
  //         '#ffedc7',
  //         '#fff4d1',
  //         '#fff8db',
  //         '#fffbe5',
  //         '#fffeed',
  //         '#fffef7', // Lightest version for light mode
  //       ]

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
      {/* <CardContent> */}
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

// const colors = isDarkMode
//     ? [
//         '#a8a29e',
//         '#948e88',
//         '#87817b',
//         '#78716c',
//         '#69645f',
//         '#5d5853',
//         '#524f49',
//         '#484540',
//         '#3e3b37',
//         '#34312f',
//         '#2b2926',
//         '#211f1d',
//       ]
//     : [
//         '#d0c9c4',
//         '#c2bbb7',
//         '#b7b0ab',
//         '#a8a29e',
//         '#9f9893',
//         '#938d88',
//         '#8a847f',
//         '#857d78',
//         '#78716c',
//         '#6b635e',
//         '#5d5853',
//         '#484540',
