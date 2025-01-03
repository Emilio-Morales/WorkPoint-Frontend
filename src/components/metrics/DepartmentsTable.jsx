'use client'
import { columns } from '@/lib/utils'
import { createTheme, ThemeProvider } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'

function CustomColumnHeader(props) {
  const { colDef } = props

  return <div className="font-semibold text-zinc-950 dark:text-white">{colDef.headerName}</div>
}

export default function DepartmentsTable({ rowData }) {
  const router = useRouter()

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

          filterForm: ({ theme }) => ({
            gap: theme.spacing(1),
            alignItems: 'flex-end',
          }),
          columnsManagementHeader: ({ theme }) => ({
            paddingRight: theme.spacing(3),
            paddingLeft: theme.spacing(3),
          }),
          columnHeaderTitleContainer: {
            flexGrow: 1,
            justifyContent: 'space-between',
          },
          columnHeaderDraggableContainer: { paddingRight: 2 },
          columnHeaderTitle: {
            fontWeight: '500 !important',
            color: isDarkMode ? '#ffffff' : '#18181b',
          },
        },
      },
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
      MuiChip: {
        styleOverrides: {
          root: ({ ownerState }) => {
            // Determine the styles based on the Chip color
            const isSuccess = ownerState.color === 'success'
            const isError = ownerState.color === 'error'

            return {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              paddingLeft: '4px',
              paddingRight: '4px',
              border: '1px solid',
              fontSize: '0.75rem',
              borderRadius: '999px',
              fontWeight: 600,
              borderColor: isSuccess
                ? isDarkMode
                  ? 'hsl(120, 84%, 10%)'
                  : 'hsl(120, 75%, 87%)'
                : isError
                  ? isDarkMode
                    ? 'hsl(0, 95%, 12%)'
                    : 'hsl(0, 92%, 90%)'
                  : undefined,
              backgroundColor: isSuccess
                ? isDarkMode
                  ? 'hsl(120, 87%, 6%)'
                  : 'hsl(120, 80%, 98%)'
                : isError
                  ? isDarkMode
                    ? 'hsl(0, 93%, 6%)'
                    : 'hsl(0, 100%, 97%)'
                  : undefined,
              color: isSuccess
                ? isDarkMode
                  ? 'hsl(120, 61%, 77%)'
                  : 'hsl(120, 59%, 30%)'
                : isError
                  ? isDarkMode
                    ? 'hsl(0, 94%, 80%)'
                    : 'hsl(0, 59%, 30%)'
                  : undefined,
            }
          },
        },
      },
    },
  })

  const handleRowClick = (params) => {
    const department = encodeURIComponent(params.row.department)
    router.push(`/departments/${department}`)
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <DataGrid
        rows={rowData}
        columns={columns}
        getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[5, 10, 20]}
        sx={{
          border: '1px',
          borderRadius: '0.5rem',
          borderColor: isDarkMode ? 'rgb(255 255 255 / 0.1)' : 'rgb(9 9 11 / 0.05)',
        }}
        density="comfortable"
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
