'use client'
import { LineChart } from '@mui/x-charts'

const EmployeesJoinedLineGraph = () => {
  return (
    <div className="h-full max-h-80 w-full">
      <LineChart
        xAxis={[
          {
            // Correctly representing the months of the year numerically
            // data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            scaleType: 'point',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          },
        ]}
        series={[
          {
            // Static data representing active employees each month
            data: [150, 155, 160, 165, 162, 170, 175, 180, 178, 182, 185, 190],
          },
        ]}
      />
    </div>
  )
}

export default EmployeesJoinedLineGraph
