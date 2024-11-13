import { userJobInfo, users, userSalary } from '../mockDb/mockData'

// Mock API calls
export async function getUsers() {
  return users
}

export async function getUser(id) {
  return (await getUsers()).find((user) => user.UserId.toString() === id)
}

export async function getUserJobInfo(id) {
  return (await getUsersJobInfo()).find((userJobInfo) => userJobInfo.UserId.toString() === id)
}

export async function getUserSalary(id) {
  return (await getUsersSalary()).find((userSalary) => userSalary.UserId.toString() === id)
}

export async function getUserFullDetails(userId) {
  // Get the user's basic info, job info, and salary using the existing helper functions
  const user = await getUser(userId)
  const jobInfo = await getUserJobInfo(userId)
  const salaryInfo = await getUserSalary(userId)

  if (!user) {
    // Return null or an appropriate message if the user is not found
    return null
  }

  // Return the combined details for the specific user
  return {
    ...user,
    JobTitle: jobInfo ? jobInfo.JobTitle : 'N/A',
    Department: jobInfo ? jobInfo.Department : 'N/A',
    Salary: salaryInfo ? salaryInfo.Salary : 'N/A',
  }
}

// Consolidated function to get all user details with pagination
export async function getUsersFullDetails(page = 1, limit = 10, query = '') {
  // Fetch basic user information
  const usersData = await getUsers()
  const jobInfo = await getUsersJobInfo()
  const salaryInfo = await getUsersSalary()

  // Join user data with job and salary info
  const fullUserData = usersData.map((user) => {
    const job = jobInfo.find((job) => job.UserId === user.UserId)
    const salary = salaryInfo.find((salary) => salary.UserId === user.UserId)

    return {
      ...user,
      JobTitle: job ? job.JobTitle : 'N/A',
      Department: job ? job.Department : 'N/A',
      Salary: salary ? salary.Salary : 'N/A',
    }
  })

  // Apply filtering based on the query
  const filteredData = fullUserData.filter((user) => {
    const searchString = query.toLowerCase()
    return (
      user.FirstName.toLowerCase().includes(searchString) ||
      user.LastName.toLowerCase().includes(searchString) ||
      user.Email.toLowerCase().includes(searchString) ||
      user.JobTitle.toLowerCase().includes(searchString) ||
      user.Department.toLowerCase().includes(searchString)
    )
  })

  // Apply pagination to the filtered data
  const startIndex = (page - 1) * limit
  const paginatedData = filteredData.slice(startIndex, startIndex + limit)

  return {
    data: paginatedData,
    currentPage: page,
    totalPages: Math.ceil(filteredData.length / limit),
    totalUsers: filteredData.length,
  }
}

// Function to get department info
export async function getDepartmentInfo(department = null) {
  // Join userJobInfo with userSalary on UserId
  const userJobInfo = await getUsersJobInfo()
  const userSalary = await getUsersSalary()
  const userActivityInfo = await getUsers()

  const joinedData = userJobInfo
    .map((job) => {
      const salaryInfo = userSalary.find((salary) => salary.UserId === job.UserId)
      const activityInfo = userActivityInfo.find((user) => user.UserId === job.UserId)
      return salaryInfo && activityInfo ? { ...job, Salary: salaryInfo.Salary, Active: activityInfo.Active } : null
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
        ActiveCount: 0, // Adding the count of active users.
      }
    }

    const stats = departmentStats[item.Department]
    stats.TotalSalary += item.Salary
    stats.MinSalary = Math.min(stats.MinSalary, item.Salary)
    stats.MaxSalary = Math.max(stats.MaxSalary, item.Salary)
    stats.Count += 1
    if (item.Active === 'TRUE') {
      stats.ActiveCount += 1 // Increment active user count.
    }
  })

  // Calculate average salary and format the result
  const result = Object.values(departmentStats).map((stats) => {
    return {
      Department: stats.Department,
      AverageSalaryInDepartment: stats.TotalSalary / stats.Count,
      MinSalaryInDepartment: stats.MinSalary,
      MaxSalaryInDepartment: stats.MaxSalary,
      TotalSalaryPaidToDepartment: stats.TotalSalary,
      Count: stats.Count,
      ActiveCount: stats.ActiveCount,
    }
  })

  return result
}

export async function getTotalBudget() {
  const salaries = await getUsersSalary()

  // Calculate total budget by summing all Salary fields
  const totalBudget = salaries.reduce((sum, salary) => sum + salary.Salary, 0)

  return totalBudget
}

export async function getTotalUsers() {
  const users = await getUsers()
  return users.length
}

export async function getTotalActiveUsers() {
  const users = await getUsers()
  const activeUsers = users.filter((user) => user.Active.toLowerCase() === 'true')
  return activeUsers.length
}

export async function getTotalInactiveUsers() {
  const users = await getUsers()
  const inactiveUsers = users.filter((user) => user.Active.toLowerCase() === 'false')
  return inactiveUsers.length
}

export async function getUsersJoinedByMonth(year) {
  const users = await getUsers()

  // Initialize an array of 12 months with counts set to 0
  const joinedByMonth = Array(12).fill(0)

  let totalEmployeesJoined = 0
  const totalEmployees = users.length
  users.forEach((user) => {
    if (user.DateHired) {
      const hireDate = new Date(user.DateHired)
      const hireYear = hireDate.getFullYear()
      if (hireYear === year) {
        const hireMonth = hireDate.getMonth() // getMonth() returns 0 for Jan, 11 for Dec
        joinedByMonth[hireMonth] += 1
        totalEmployeesJoined += 1
      }
    }
  })

  const result = {
    totalEmployees,
    totalEmployeesJoined,
    monthlyData: joinedByMonth,
  }
  return result
}

export async function getUsersLeftByMonth(year) {
  const users = await getUsers()

  // Initialize an array of 12 months with counts set to 0
  const leftByMonth = Array(12).fill(0)

  let totalEmployeesLeft = 0
  const totalEmployees = users.length
  users.forEach((user) => {
    if (user.DateExited) {
      const exitDate = new Date(user.DateExited)
      const exitYear = exitDate.getFullYear()
      if (exitYear === year) {
        const exitMonth = exitDate.getMonth() // getMonth() returns 0 for Jan, 11 for Dec
        leftByMonth[exitMonth] += 1
        totalEmployeesLeft += 1
      }
    }
  })

  const result = {
    totalEmployees,
    totalEmployeesLeft,
    monthlyData: leftByMonth,
  }
  console.log('result:', result)
  return result
}

export async function getUsersInDepartment(departmentName, page = 1, limit = 10, query = '') {
  // Fetch basic user information
  const usersData = await getUsers()
  const jobInfo = await getUsersJobInfo()
  const salaryInfo = await getUsersSalary()

  // Join user data with job and salary info
  const fullUserData = usersData.map((user) => {
    const job = jobInfo.find((job) => job.UserId === user.UserId)
    const salary = salaryInfo.find((salary) => salary.UserId === user.UserId)

    return {
      ...user,
      JobTitle: job ? job.JobTitle : 'N/A',
      Department: job ? job.Department : 'N/A',
      Salary: salary ? salary.Salary : 'N/A',
    }
  })

  // Filter users by department
  const filteredByDepartment = fullUserData.filter(
    (user) => user.Department.toLowerCase() === departmentName.toLowerCase()
  )

  // Apply filtering based on the query if provided
  const filteredData = query
    ? filteredByDepartment.filter((user) => {
        const searchString = query.toLowerCase()
        return (
          user.FirstName.toLowerCase().includes(searchString) ||
          user.LastName.toLowerCase().includes(searchString) ||
          user.Email.toLowerCase().includes(searchString) ||
          user.JobTitle.toLowerCase().includes(searchString)
        )
      })
    : filteredByDepartment

  // Calculate total salary for active and inactive users
  let activeSalaryTotal = 0
  let inactiveSalaryTotal = 0

  filteredByDepartment.forEach((user) => {
    if (user.Active === 'TRUE') {
      activeSalaryTotal += user.Salary
    } else if (user.Active === 'FALSE') {
      inactiveSalaryTotal += user.Salary
    }
  })

  // Apply pagination to the filtered data
  const startIndex = (page - 1) * limit
  const paginatedData = filteredData.slice(startIndex, startIndex + limit)

  // Return the result in the same format as getUsersFullDetails
  return {
    data: paginatedData,
    currentPage: page,
    totalPages: Math.ceil(filteredData.length / limit),
    totalUsers: filteredData.length,
    totalActiveSalary: activeSalaryTotal,
    totalInactiveSalary: inactiveSalaryTotal,
  }
}

export async function getTopSalaryAllocatingDepartments(limit = 4) {
  // Fetch user job and salary information
  const jobInfo = await getUsersJobInfo()
  const salaryInfo = await getUsersSalary()

  // Create a department salary map
  const departmentSalaryMap = {}

  jobInfo.forEach((job) => {
    const userSalary = salaryInfo.find((salary) => salary.UserId === job.UserId)?.Salary || 0

    if (!departmentSalaryMap[job.Department]) {
      departmentSalaryMap[job.Department] = {
        Department: job.Department,
        TotalSalary: 0,
      }
    }

    departmentSalaryMap[job.Department].TotalSalary += userSalary
  })

  // Convert the department map to an array and sort by TotalSalary in descending order
  const sortedDepartments = Object.values(departmentSalaryMap).sort((a, b) => b.TotalSalary - a.TotalSalary)

  // Return the top departments based on the limit
  return sortedDepartments.slice(0, limit)
}

/*
----Example Usage
    getDepartmentInfo().then(console.log) // Get info for all departments
    getDepartmentInfo('Support').then(console.log) // Get info for 'Support' department
*/
// Mock db calls
async function getUsersJobInfo() {
  return userJobInfo
}

async function getUsersSalary() {
  return userSalary
}
