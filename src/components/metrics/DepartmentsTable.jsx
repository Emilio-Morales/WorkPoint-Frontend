'use client'
import { columns } from '@/lib/utils'
import { createTheme, ThemeProvider } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'

// {
//   id: 1,
//   department: 'Homepage Overview',
//   budgetStatus: 'Online',
//   totalEmployees: 8345,
//   totalBudget: 212423,
//   activeEmployees: 18.5,
//   inactiveEmployees: '2m 15s',
//   employeesJoined: [
//     469172, 488506, 592287, 617401, 640374, 632751, 668638, 807246, 749198, 944863, 911787, 844815, 992022, 1143838,
//     1446926, 1267886, 1362511, 1348746, 1560533, 1670690, 1695142, 1916613, 1823306, 1683646, 2025965, 2529989,
//     3263473, 3296541, 3041524, 2599497,
//   ],
// },

// {
//   Department: 'Accounting',
//   AverageSalaryInDepartment: 132797.7384415584,
//   MinSalaryInDepartment: 76407.96,
//   MaxSalaryInDepartment: 199702.13,
//   TotalSalaryPaidToDepartment: 10225425.859999998,
//   Count: 77,
//   ActiveCount: 38
// },

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
            fontWeight: '500 !important', // font-medium
            color: isDarkMode ? '#ffffff' : '#18181b', // text-white for dark mode, text-zinc-950 for light mode
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
        // checkboxSelection
        rows={rowData}
        columns={columns}
        // onRowClick={handleRowClick}
        // components={{
        //   ColumnHeader: CustomColumnHeader,
        // }}
        getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 20]}
        // disableColumnResize
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
