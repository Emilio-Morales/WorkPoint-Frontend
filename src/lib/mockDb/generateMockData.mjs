import { users } from './mockData.js'

import fs from 'fs'
import path from 'path'

// Helper function to generate random dates within a given range
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

// Set date ranges (from 2020 onwards)
const today = new Date()
const start_date = new Date('2020-01-01')

// Create a copy of users and add DateHired and DateExited fields
const updatedUsers = users.map((user) => {
  // Make a copy of the current user object
  const updatedUser = { ...user }

  // Generate a random hire date between 2020 and today
  const hireDate = randomDate(start_date, today)
  updatedUser.DateHired = hireDate.toISOString().split('T')[0] // Format as 'YYYY-MM-DD'

  // Determine DateExited based on the Active status
  if (updatedUser.Active === 'FALSE') {
    // If inactive, generate an exit date after the hire date
    const exitDate = randomDate(hireDate, today)
    updatedUser.DateExited = exitDate.toISOString().split('T')[0]
  } else {
    // If active, set DateExited to null
    updatedUser.DateExited = null
  }

  return updatedUser
})

// Define the new output file path
const newMockDataDir = path.join(process.cwd(), 'src', 'lib', 'mockDb')
const newMockDataPath = path.join(newMockDataDir, 'updatedMockData.js')

// Ensure the directory exists before writing the file
if (!fs.existsSync(newMockDataDir)) {
  fs.mkdirSync(newMockDataDir, { recursive: true })
}

// Convert updated data to a proper ES Module format
const updatedDataString = `export const updatedUsers = ${JSON.stringify(updatedUsers, null, 2)};\n`

// Write the updated mock data to a new file
fs.writeFileSync(newMockDataPath, updatedDataString, 'utf-8')

console.log('New mock data with added fields has been saved to updatedMockData.js')
