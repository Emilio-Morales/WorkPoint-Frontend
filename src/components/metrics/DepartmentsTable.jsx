'use client'
import { columns, rows } from '@/lib/utils'
import { createTheme, ThemeProvider } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useTheme } from 'next-themes'

export default function DepartmentsTable() {
  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'

  const muiTheme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      background: {
        default: isDarkMode ? '#09090b' : '#f4f4f5',
        paper: isDarkMode ? '#18181b' : '#ffffff',
      },
      text: {
        primary: isDarkMode ? '#d1d5db' : '#374151',
        secondary: isDarkMode ? 'hsl(215, 15%, 75%)' : 'hsl(220, 20%, 35%)',
      },
    },
    components: {
      MuiDataGrid: {
        styleOverrides: {
          columnSeparator: {
            color: isDarkMode ? '#09090b' : '#f4f4f5',
          },
          footerContainer: {
            backgroundColor: isDarkMode ? '#09090b' : '#f4f4f5',
          },
        },
      },
      //   MuiTableCell: {
      //     styleOverrides: {
      //       borderColor: isDarkMode ? 'red' : 'blue',
      //     },
      //   },
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

  return (
    <ThemeProvider theme={muiTheme}>
      <DataGrid
        checkboxSelection
        rows={rows}
        columns={columns}
        getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        sx={{
          border: '1px',
          borderRadius: '0.5rem',
          borderColor: isDarkMode ? 'rgb(255 255 255 / 0.1)' : 'rgb(9 9 11 / 0.05)',
        }}
        density="compact"
        slotProps={{
          filterPanel: {
            filterFormProps: {
              logicOperatorInputProps: {
                variant: 'outlined',
                size: 'small',
              },
              columnInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              operatorInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              valueInputProps: {
                InputComponentProps: {
                  variant: 'outlined',
                  size: 'small',
                },
              },
            },
          },
        }}
      />
    </ThemeProvider>
  )
}
