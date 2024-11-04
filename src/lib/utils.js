export function properCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const formatCurrency = (amount) => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function isActive(userActive) {
  if (userActive === 'TRUE') {
    return 'Active'
  } else {
    return 'Inactive'
  }
}
