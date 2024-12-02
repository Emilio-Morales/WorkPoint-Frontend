'use client'
import { formatCurrency } from '@/lib/utils'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import Stack from '@mui/material/Stack'
import { createTheme, styled } from '@mui/material/styles'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import { useDrawingArea } from '@mui/x-charts/hooks'
import { pieArcClasses, PieChart } from '@mui/x-charts/PieChart'
import { useTheme } from 'next-themes'
import PropTypes from 'prop-types'
import * as React from 'react'

// const data = [
//   { label: 'India', value: 50000 },
//   { label: 'USA', value: 35000 },
//   { label: 'Brazil', value: 10000 },
//   { label: 'Other', value: 5000 },
//   { label: 'fkfddks', value: 8000 },
// ]

// const departments = [
//   {
//     departmentName: 'India',
//     departmentBudget: 50,
//     departmentIcon: <IndiaFlag />,
//     color: 'hsl(220, 25%, 65%)',
//   },
//   {
//     departmentName: 'USA',
//     departmentBudget: 35,
//     departmentIcon: <UsaFlag />,
//     color: 'hsl(220, 25%, 45%)',
//   },
//   {
//     departmentName: 'Brazil',
//     departmentBudget: 10,
//     departmentIcon: <BrazilFlag />,
//     color: 'hsl(220, 25%, 30%)',
//   },
//   {
//     departmentName: 'Other',
//     departmentBudget: 5,
//     departmentIcon: <GlobeFlag />,
//     color: 'hsl(220, 25%, 20%)',
//   },
//   {
//     departmentName: 'fkfddks',
//     departmentBudget: 10,
//     departmentIcon: <GlobeFlag />,
//     color: 'hsl(220, 25%, 20%)',
//   },
// ]

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

export default function BudgetAllocationChart({ departments, pieChartData }) {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'
  const { totalBudget, formattedData } = pieChartData

  console.log('pie chart data', formattedData)
  const data = formattedData
  const muiTheme = createTheme({
    components: {
      MuiPieChart: {
        MuiPieArc: {
          styleOverrides: {
            root: {
              stroke: 'none', // Remove the stroke color
              strokeWidth: 0, // Set stroke width to 0
            },
          },
        },
      },
    },
  })

  const colors = isDarkMode
    ? ['#78716c', '#8e8781', '#6d6561', '#585250'] // Dark mode colors
    : ['#a8a29e', '#8e8985', '#e4e4e7', '#cccccf'] // Light mode colors

  console.log('pie arc classes', pieArcClasses)

  return (
    // <ThemeProvider theme={muiTheme}>
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
          sx={{ color: isDarkMode ? 'rgb(161 161 170)' : 'rgb(113 113 122)', fontWeight: 600 }}
        >
          Department Budget Allocation
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PieChart
            colors={colors}
            // segmentShowStroke={false}
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
              //   tooltip: {
              //     formatter: (params) => {
              //       return `fdfd$${params.value}`
              //     },
              //   },
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
            maxHeight: '200px',
            '&::-webkit-scrollbar': {
              display: 'none', // Hide scrollbar for Chrome, Safari, and Edge
            },
            '-ms-overflow-style': 'none', // Hide scrollbar for Internet Explorer
            'scrollbar-width': 'none', // Hide scrollbar for Firefox
          }}
        >
          {/* {
                departmentName: 'India',
                departmentBudget: 50,
                departmentIcon: <IndiaFlag />,
                color: 'hsl(220, 25%, 65%)',
            }, */}
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
                  <Typography variant="body2" sx={{ fontWeight: '500', color: isDarkMode ? 'white' : 'rgb(9, 9, 11)' }}>
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
                      backgroundColor: isDarkMode ? '#78716c' : '#a8a29e',
                    },
                  }}
                />
              </Stack>
            </Stack>
          ))}
        </Box>
      </CardContent>
    </Card>
    // </ThemeProvider>
  )
}

export function SitemarkIcon() {
  return (
    <SvgIcon sx={{ height: 21, width: 100 }}>
      <svg width={86} height={19} viewBox="0 0 86 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#B4C0D3"
          d="m.787 12.567 6.055-2.675 3.485 2.006.704 6.583-4.295-.035.634-4.577-.74-.422-3.625 2.817-2.218-3.697Z"
        />
        <path
          fill="#00D3AB"
          d="m10.714 11.616 5.352 3.908 2.112-3.767-4.295-1.725v-.845l4.295-1.76-2.112-3.732-5.352 3.908v4.013Z"
        />
        <path
          fill="#4876EF"
          d="m10.327 7.286.704-6.583-4.295.07.634 4.577-.74.422-3.66-2.816L.786 6.617l6.055 2.676 3.485-2.007Z"
        />
        <path
          fill="#4876EE"
          d="M32.507 8.804v6.167h2.312v-7.86h-3.366v1.693h1.054ZM32.435 6.006c.212.22.535.33.968.33.434 0 .751-.11.953-.33.213-.23.318-.516.318-.86 0-.354-.105-.641-.318-.86-.202-.23-.52-.345-.953-.345-.433 0-.756.115-.968.344-.202.22-.303.507-.303.86 0 .345.101.632.303.861ZM24.46 14.799c.655.296 1.46.444 2.413.444.896 0 1.667-.139 2.312-.416.645-.277 1.141-.664 1.488-1.162.357-.506.535-1.094.535-1.764 0-.65-.169-1.2-.506-1.649-.328-.459-.785-.818-1.373-1.076-.587-.267-1.266-.435-2.037-.502l-.809-.071c-.481-.039-.828-.168-1.04-.388a1.08 1.08 0 0 1-.318-.774c0-.23.058-.44.173-.631.116-.201.29-.359.52-.474.241-.114.535-.172.882-.172.366 0 .67.067.91.201.053.029.104.059.15.09l.012.009.052.037c.146.111.263.243.35.395.125.21.188.444.188.703h2.311c0-.689-.159-1.286-.476-1.793-.318-.516-.776-.913-1.373-1.19-.588-.287-1.296-.43-2.124-.43-.79 0-1.474.133-2.052.4a3.131 3.131 0 0 0-1.358 1.12c-.318.487-.477 1.066-.477 1.735 0 .927.314 1.673.94 2.237.626.564 1.464.89 2.514.976l.794.071c.645.058 1.113.187 1.401.388a.899.899 0 0 1 .434.788 1.181 1.181 0 0 1-.231.717c-.154.201-.38.36-.68.474-.298.115-.669.172-1.112.172-.49 0-.89-.067-1.199-.2-.308-.144-.539-.33-.694-.56a1.375 1.375 0 0 1-.216-.746h-2.297c0 .679.168 1.281.505 1.807.337.517.834.928 1.489 1.234ZM39.977 15.07c-.8 0-1.445-.095-1.936-.286a2.03 2.03 0 0 1-1.084-.99c-.221-.469-.332-1.1-.332-1.893V8.789h-1.2V7.11h1.2V4.988h2.153V7.11h2.312V8.79h-2.312v3.198c0 .373.096.66.289.86.202.192.486.287.852.287h1.17v1.937h-1.112Z"
        />
        <path
          fill="#4876EE"
          fillRule="evenodd"
          d="M43.873 14.899c.52.23 1.117.344 1.791.344.665 0 1.252-.115 1.763-.344.51-.23.934-.55 1.271-.96.337-.412.564-.88.679-1.407h-2.124c-.096.24-.279.44-.549.603-.27.162-.616.244-1.04.244-.262 0-.497-.031-.704-.093a1.572 1.572 0 0 1-.423-.194 1.662 1.662 0 0 1-.636-.803 3.159 3.159 0 0 1-.163-.645h5.784v-.775a4.28 4.28 0 0 0-.463-1.98 3.686 3.686 0 0 0-1.343-1.477c-.578-.382-1.291-.574-2.139-.574-.645 0-1.223.115-1.733.345-.501.22-.92.52-1.257.903a4.178 4.178 0 0 0-.78 1.305c-.174.478-.26.98-.26 1.506v.287c0 .507.086 1.004.26 1.492.183.478.443.913.78 1.305.347.382.775.688 1.286.918Zm-.094-4.674.02-.09a2.507 2.507 0 0 1 .117-.356c.145-.354.356-.622.636-.804.104-.067.217-.123.339-.165.204-.071.433-.107.686-.107.395 0 .723.09.983.272.27.173.472.426.607.76a2.487 2.487 0 0 1 .16.603h-3.57c.006-.038.013-.076.022-.113Z"
          clipRule="evenodd"
        />
        <path
          fill="#4876EE"
          d="M50.476 14.97V7.112h1.835v1.98a4.54 4.54 0 0 1 .173-.603c.202-.536.506-.937.91-1.205.405-.277.9-.416 1.488-.416h.101c.598 0 1.094.139 1.489.416.404.268.707.67.91 1.205l.016.04.013.037.028-.077c.212-.536.52-.937.925-1.205.405-.277.901-.416 1.489-.416h.1c.598 0 1.098.139 1.503.416.414.268.727.67.94 1.205.211.535.317 1.205.317 2.008v4.475h-2.312v-4.604c0-.43-.115-.78-.346-1.047-.222-.268-.54-.402-.954-.402-.414 0-.742.139-.982.416-.241.268-.362.626-.362 1.076v4.56h-2.326v-4.603c0-.43-.115-.78-.346-1.047-.222-.268-.535-.402-.94-.402-.423 0-.756.139-.996.416-.241.268-.362.626-.362 1.076v4.56h-2.311Z"
        />
        <path
          fill="#4876EE"
          fillRule="evenodd"
          d="M68.888 13.456v1.515h1.834v-4.82c0-.726-.144-1.319-.433-1.778-.289-.468-.712-.817-1.271-1.047-.549-.23-1.228-.344-2.037-.344a27.76 27.76 0 0 0-.896.014c-.318.01-.626.024-.924.043l-.229.016a36.79 36.79 0 0 0-.552.042v1.936a81.998 81.998 0 0 1 1.733-.09 37.806 37.806 0 0 1 1.171-.025c.424 0 .732.1.925.301.193.201.289.502.289.904v.029h-1.43c-.704 0-1.325.09-1.864.272-.54.172-.959.445-1.257.818-.299.363-.448.832-.448 1.405 0 .526.12.98.361 1.363.24.373.573.66.997.86.433.201.934.302 1.502.302.55 0 1.012-.1 1.388-.302.385-.2.683-.487.895-.86a2.443 2.443 0 0 0 .228-.498l.018-.056Zm-.39-1.397v-.63h-1.445c-.405 0-.718.1-.939.3-.212.192-.318.455-.318.79 0 .157.026.3.08.429a.99.99 0 0 0 .238.345c.221.191.534.287.939.287a2.125 2.125 0 0 0 .394-.038c.106-.021.206-.052.3-.092.212-.095.385-.253.52-.473.135-.22.212-.526.23-.918Z"
          clipRule="evenodd"
        />
        <path
          fill="#4876EE"
          d="M72.106 14.97V7.11h1.835v2.595c.088-.74.31-1.338.665-1.791.481-.603 1.174-.904 2.08-.904h.303v1.98h-.578c-.635 0-1.127.172-1.473.516-.347.334-.52.822-.52 1.463v4.001h-2.312ZM79.92 11.298h.767l2.499 3.672h2.6l-3.169-4.51 2.606-3.35h-2.427l-2.875 3.737V4.5h-2.312v10.47h2.312v-3.672Z"
        />
      </svg>
    </SvgIcon>
  )
}

export function IndiaFlag() {
  return (
    <SvgIcon>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
        <g clipPath="url(#a)">
          <mask id="b" maskUnits="userSpaceOnUse" x="-4" y="0" width="32" height="24">
            <path d="M-4 0h32v24H-4V0Z" fill="#fff" />
          </mask>
          <g mask="url(#b)">
            <path fillRule="evenodd" clipRule="evenodd" d="M-4 0v24h32V0H-4Z" fill="#F7FCFF" />
            <mask id="c" maskUnits="userSpaceOnUse" x="-4" y="0" width="32" height="24">
              <path fillRule="evenodd" clipRule="evenodd" d="M-4 0v24h32V0H-4Z" fill="#fff" />
            </mask>
            <g mask="url(#c)" fillRule="evenodd" clipRule="evenodd">
              <path d="M-4 0v8h32V0H-4Z" fill="#FF8C1A" />
              <path d="M-4 16v8h32v-8H-4Z" fill="#5EAA22" />
              <path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0Zm7 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" fill="#3D58DB" />
              <path
                d="m12 12.9-.6 3 .4-3-1.5 2.8 1.2-3L9.4 15l2-2.4-2.8 1.6 2.6-1.8-3 .7 3-1H8l3.2-.2-3-1 3 .8-2.6-1.9 2.8 1.7-2-2.5 2.1 2.3-1.2-3 1.5 2.9-.4-3.2.6 3.2.6-3.2-.4 3.2 1.5-2.8-1.2 2.9L14.6 9l-2 2.5 2.8-1.7-2.6 1.9 3-.8-3 1 3.2.1-3.2.1 3 1-3-.7 2.6 1.8-2.8-1.6 2 2.4-2.1-2.3 1.2 3-1.5-2.9.4 3.2-.6-3.1Z"
                fill="#3D58DB"
              />
            </g>
          </g>
        </g>
        <defs>
          <clipPath id="a">
            <rect width="24" height="24" rx="12" fill="#fff" />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  )
}

export function UsaFlag() {
  return (
    <SvgIcon>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_983_1725)">
          <path fillRule="evenodd" clipRule="evenodd" d="M-4 0H28V24H-4V0Z" fill="#F7FCFF" />
          <path fillRule="evenodd" clipRule="evenodd" d="M-4 14.6667V16.6667H28V14.6667H-4Z" fill="#E31D1C" />
          <path fillRule="evenodd" clipRule="evenodd" d="M-4 18.3333V20.3333H28V18.3333H-4Z" fill="#E31D1C" />
          <path fillRule="evenodd" clipRule="evenodd" d="M-4 7.33325V9.33325H28V7.33325H-4Z" fill="#E31D1C" />
          <path fillRule="evenodd" clipRule="evenodd" d="M-4 22V24H28V22H-4Z" fill="#E31D1C" />
          <path fillRule="evenodd" clipRule="evenodd" d="M-4 11V13H28V11H-4Z" fill="#E31D1C" />
          <path fillRule="evenodd" clipRule="evenodd" d="M-4 0V2H28V0H-4Z" fill="#E31D1C" />
          <path fillRule="evenodd" clipRule="evenodd" d="M-4 3.66675V5.66675H28V3.66675H-4Z" fill="#E31D1C" />
          <path d="M-4 0H16V13H-4V0Z" fill="#2E42A5" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M-2.27876 2.93871L-3.00465 3.44759L-2.75958 2.54198L-3.4043 1.96807H-2.56221L-2.27978 1.229L-1.94861 1.96807H-1.23075L-1.79479 2.54198L-1.57643 3.44759L-2.27876 2.93871ZM1.72124 2.93871L0.995357 3.44759L1.24042 2.54198L0.595707 1.96807H1.43779L1.72022 1.229L2.05139 1.96807H2.76925L2.20521 2.54198L2.42357 3.44759L1.72124 2.93871ZM4.99536 3.44759L5.72124 2.93871L6.42357 3.44759L6.20517 2.54198L6.76927 1.96807H6.05137L5.72022 1.229L5.43779 1.96807H4.59571L5.24042 2.54198L4.99536 3.44759ZM9.72127 2.93871L8.99537 3.44759L9.24047 2.54198L8.59567 1.96807H9.43777L9.72027 1.229L10.0514 1.96807H10.7693L10.2052 2.54198L10.4236 3.44759L9.72127 2.93871ZM-3.00465 7.44759L-2.27876 6.93871L-1.57643 7.44759L-1.79479 6.54198L-1.23075 5.96807H-1.94861L-2.27978 5.229L-2.56221 5.96807H-3.4043L-2.75958 6.54198L-3.00465 7.44759ZM1.72124 6.93871L0.995357 7.44759L1.24042 6.54198L0.595707 5.96807H1.43779L1.72022 5.229L2.05139 5.96807H2.76925L2.20521 6.54198L2.42357 7.44759L1.72124 6.93871ZM4.99536 7.44759L5.72124 6.93871L6.42357 7.44759L6.20517 6.54198L6.76927 5.96807H6.05137L5.72022 5.229L5.43779 5.96807H4.59571L5.24042 6.54198L4.99536 7.44759ZM9.72127 6.93871L8.99537 7.44759L9.24047 6.54198L8.59567 5.96807H9.43777L9.72027 5.229L10.0514 5.96807H10.7693L10.2052 6.54198L10.4236 7.44759L9.72127 6.93871ZM-3.00465 11.4476L-2.27876 10.9387L-1.57643 11.4476L-1.79479 10.542L-1.23075 9.96807H-1.94861L-2.27978 9.229L-2.56221 9.96807H-3.4043L-2.75958 10.542L-3.00465 11.4476ZM1.72124 10.9387L0.995357 11.4476L1.24042 10.542L0.595707 9.96807H1.43779L1.72022 9.229L2.05139 9.96807H2.76925L2.20521 10.542L2.42357 11.4476L1.72124 10.9387ZM4.99536 11.4476L5.72124 10.9387L6.42357 11.4476L6.20517 10.542L6.76927 9.96807H6.05137L5.72022 9.229L5.43779 9.96807H4.59571L5.24042 10.542L4.99536 11.4476ZM9.72127 10.9387L8.99537 11.4476L9.24047 10.542L8.59567 9.96807H9.43777L9.72027 9.229L10.0514 9.96807H10.7693L10.2052 10.542L10.4236 11.4476L9.72127 10.9387ZM12.9954 3.44759L13.7213 2.93871L14.4236 3.44759L14.2052 2.54198L14.7693 1.96807H14.0514L13.7203 1.229L13.4378 1.96807H12.5957L13.2405 2.54198L12.9954 3.44759ZM13.7213 6.93871L12.9954 7.44759L13.2405 6.54198L12.5957 5.96807H13.4378L13.7203 5.229L14.0514 5.96807H14.7693L14.2052 6.54198L14.4236 7.44759L13.7213 6.93871ZM12.9954 11.4476L13.7213 10.9387L14.4236 11.4476L14.2052 10.542L14.7693 9.96807H14.0514L13.7203 9.229L13.4378 9.96807H12.5957L13.2405 10.542L12.9954 11.4476ZM-0.278763 4.93871L-1.00464 5.44759L-0.759583 4.54198L-1.40429 3.96807H-0.562213L-0.279783 3.229L0.0513873 3.96807H0.769247L0.205207 4.54198L0.423567 5.44759L-0.278763 4.93871ZM2.99536 5.44759L3.72124 4.93871L4.42357 5.44759L4.20521 4.54198L4.76925 3.96807H4.05139L3.72022 3.229L3.43779 3.96807H2.59571L3.24042 4.54198L2.99536 5.44759ZM7.72127 4.93871L6.99537 5.44759L7.24047 4.54198L6.59567 3.96807H7.43777L7.72027 3.229L8.05137 3.96807H8.76927L8.20517 4.54198L8.42357 5.44759L7.72127 4.93871ZM-1.00464 9.44759L-0.278763 8.93871L0.423567 9.44759L0.205207 8.54198L0.769247 7.96807H0.0513873L-0.279783 7.229L-0.562213 7.96807H-1.40429L-0.759583 8.54198L-1.00464 9.44759ZM3.72124 8.93871L2.99536 9.44759L3.24042 8.54198L2.59571 7.96807H3.43779L3.72022 7.229L4.05139 7.96807H4.76925L4.20521 8.54198L4.42357 9.44759L3.72124 8.93871ZM6.99537 9.44759L7.72127 8.93871L8.42357 9.44759L8.20517 8.54198L8.76927 7.96807H8.05137L7.72027 7.229L7.43777 7.96807H6.59567L7.24047 8.54198L6.99537 9.44759ZM11.7213 4.93871L10.9954 5.44759L11.2405 4.54198L10.5957 3.96807H11.4378L11.7203 3.229L12.0514 3.96807H12.7693L12.2052 4.54198L12.4236 5.44759L11.7213 4.93871ZM10.9954 9.44759L11.7213 8.93871L12.4236 9.44759L12.2052 8.54198L12.7693 7.96807H12.0514L11.7203 7.229L11.4378 7.96807H10.5957L11.2405 8.54198L10.9954 9.44759Z"
            fill="#F7FCFF"
          />
        </g>
        <defs>
          <clipPath id="clip0_983_1725">
            <rect width="24" height="24" rx="12" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  )
}
export function BrazilFlag() {
  return (
    <SvgIcon>
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_983_1741)">
          <path fillRule="evenodd" clipRule="evenodd" d="M-4 0.5V24.5H28V0.5H-4Z" fill="#009933" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.9265 4.20404L24.1283 12.7075L11.7605 20.6713L-0.191406 12.5427L11.9265 4.20404Z"
            fill="#FFD221"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.9265 4.20404L24.1283 12.7075L11.7605 20.6713L-0.191406 12.5427L11.9265 4.20404Z"
            fill="url(#paint0_linear_983_1741)"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 17.7C14.7614 17.7 17 15.4614 17 12.7C17 9.93853 14.7614 7.69995 12 7.69995C9.2386 7.69995 7 9.93853 7 12.7C7 15.4614 9.2386 17.7 12 17.7Z"
            fill="#2E42A5"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.379 15.07L10.1556 15.1874L10.1983 14.9387L10.0176 14.7626L10.2673 14.7263L10.379 14.5L10.4907 14.7263L10.7404 14.7626L10.5597 14.9387L10.6024 15.1874L10.379 15.07Z"
            fill="#F7FCFF"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.379 15.07L12.1556 15.1874L12.1983 14.9387L12.0176 14.7626L12.2673 14.7263L12.379 14.5L12.4907 14.7263L12.7404 14.7626L12.5597 14.9387L12.6024 15.1874L12.379 15.07Z"
            fill="#F7FCFF"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.379 16.27L12.1556 16.3874L12.1983 16.1387L12.0176 15.9625L12.2673 15.9262L12.379 15.7L12.4907 15.9262L12.7404 15.9625L12.5597 16.1387L12.6024 16.3874L12.379 16.27Z"
            fill="#F7FCFF"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.379 12.07L11.1556 12.1874L11.1983 11.9387L11.0176 11.7626L11.2673 11.7263L11.379 11.5L11.4907 11.7263L11.7404 11.7626L11.5597 11.9387L11.6024 12.1874L11.379 12.07Z"
            fill="#F7FCFF"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.379 14.07L11.1556 14.1874L11.1983 13.9387L11.0176 13.7626L11.2673 13.7263L11.379 13.5L11.4907 13.7263L11.7404 13.7626L11.5597 13.9387L11.6024 14.1874L11.379 14.07Z"
            fill="#F7FCFF"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.97859 13.07L9.75519 13.1874L9.79789 12.9387L9.61719 12.7626L9.86689 12.7263L9.97859 12.5L10.0903 12.7263L10.34 12.7626L10.1593 12.9387L10.2019 13.1874L9.97859 13.07Z"
            fill="#F7FCFF"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.5783 13.87L8.3549 13.9875L8.3976 13.7388L8.2168 13.5626L8.4666 13.5263L8.5783 13.3L8.6899 13.5263L8.9397 13.5626L8.759 13.7388L8.8016 13.9875L8.5783 13.87Z"
            fill="#F7FCFF"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.1798 10.47L12.9565 10.5875L12.9991 10.3387L12.8184 10.1626L13.0682 10.1263L13.1798 9.90002L13.2915 10.1263L13.5413 10.1626L13.3605 10.3387L13.4032 10.5875L13.1798 10.47Z"
            fill="#F7FCFF"
          />
          <path
            d="M7 12L7.5 10C11.6854 10.2946 14.6201 11.2147 17 13.5L16.5 15C14.4373 13.0193 10.7839 12.2664 7 12Z"
            fill="#F7FCFF"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_983_1741"
            x1="27.9997"
            y1="24.5"
            x2="27.9997"
            y2="0.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFC600" />
            <stop offset="1" stopColor="#FFDE42" />
          </linearGradient>
          <clipPath id="clip0_983_1741">
            <rect y="0.5" width="24" height="24" rx="12" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  )
}

export function GlobeFlag() {
  return (
    <SvgIcon>
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_986_1789)">
          <circle cx="12" cy="12.5" r="12" fill="#007FFF" />
          <path
            d="M12 0.5C5.376 0.5 0 5.876 0 12.5C0 19.124 5.376 24.5 12 24.5C18.624 24.5 24 19.124 24 12.5C24 5.876 18.624 0.5 12 0.5ZM10.8 22.016C6.06 21.428 2.4 17.396 2.4 12.5C2.4 11.756 2.496 11.048 2.652 10.352L8.4 16.1V17.3C8.4 18.62 9.48 19.7 10.8 19.7V22.016ZM19.08 18.968C18.768 17.996 17.88 17.3 16.8 17.3H15.6V13.7C15.6 13.04 15.06 12.5 14.4 12.5H7.2V10.1H9.6C10.26 10.1 10.8 9.56 10.8 8.9V6.5H13.2C14.52 6.5 15.6 5.42 15.6 4.1V3.608C19.116 5.036 21.6 8.48 21.6 12.5C21.6 14.996 20.64 17.264 19.08 18.968Z"
            fill="#3EE07F"
          />
        </g>
        <defs>
          <clipPath id="clip0_986_1789">
            <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  )
}
