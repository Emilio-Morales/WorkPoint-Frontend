import { userJobInfo, users, userSalary } from '../mockDb/mockData'

// Mock API calls
export async function getUsers() {
  return users
}

export async function getUser(id) {
  return (await getUsers()).find((user) => user.id.toString() === id)
}

export async function getUserJobInfo(id) {
  return (await getUserJobInfo()).find((userJobInfo) => userJobInfo.id.toString() === id)
}

export async function getUserSalary(id) {
  return (await getUsersSalary()).find((userSalary) => userSalary.id.toString() === id)
}

// Function to get all user details including job info and salary
export async function getUserFullDetails() {
  // Fetch data from the mock databases
  const users = await getUsers()
  const jobs = await getUsersJobInfo()
  const salaries = await getUsersSalary()

  // Merge user data with job and salary information
  const fullUserData = users.map((user) => {
    const jobInfo = jobs.find((job) => job.UserId === user.UserId)
    const salaryInfo = salaries.find((salary) => salary.UserId === user.UserId)

    return {
      ...user,
      JobTitle: jobInfo ? jobInfo.JobTitle : 'N/A',
      Department: jobInfo ? jobInfo.Department : 'N/A',
      Salary: salaryInfo ? salaryInfo.Salary : 'N/A',
    }
  })

  return fullUserData
}

// Function to get department info
async function getDepartmentInfo(department = null) {
  // Join userJobInfo with userSalary on UserId
  const userJobInfo = await getUsersJobInfo()
  const userSalary = await getUsersSalary()

  const joinedData = userJobInfo
    .map((job) => {
      const salaryInfo = userSalary.find((salary) => salary.UserId === job.UserId)
      return salaryInfo ? { ...job, Salary: salaryInfo.Salary } : null
    })
    .filter((item) => item !== null)

  // Filter by department if a specific department is provided
  const filteredData = department ? joinedData.filter((item) => item.Department === department) : joinedData

  // Group by department and calculate stats
  const departmentStats = {}

  filteredData.forEach((item) => {
    if (!departmentStats[item.Department]) {
      departmentStats[item.Department] = {
        Department: item.Department,
        TotalSalary: 0,
        MinSalary: item.Salary,
        MaxSalary: item.Salary,
        Count: 0,
      }
    }

    const stats = departmentStats[item.Department]
    stats.TotalSalary += item.Salary
    stats.MinSalary = Math.min(stats.MinSalary, item.Salary)
    stats.MaxSalary = Math.max(stats.MaxSalary, item.Salary)
    stats.Count += 1
  })

  // Calculate average salary and format the result
  const result = Object.values(departmentStats).map((stats) => {
    return {
      Department: stats.Department,
      AverageSalaryInDepartment: stats.TotalSalary / stats.Count,
      MinSalaryInDepartment: stats.MinSalary,
      MaxSalaryInDepartment: stats.MaxSalary,
      TotalSalaryPaidToDepartment: stats.TotalSalary,
    }
  })

  return result
}

// Example Usage
getDepartmentInfo().then(console.log) // Get info for all departments
getDepartmentInfo('Support').then(console.log) // Get info for 'Support' department

// Mock db calls
async function getUsersJobInfo() {
  return userJobInfo
}

async function getUsersSalary() {
  return userSalary
}
