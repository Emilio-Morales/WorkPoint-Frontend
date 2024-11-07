import {
  ArrowTrendingUpIcon,
  BeakerIcon,
  BookOpenIcon,
  CogIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  FolderIcon,
  PhoneArrowDownLeftIcon,
  ScaleIcon,
  ShieldCheckIcon,
  TagIcon,
  UserGroupIcon,
} from '@heroicons/react/20/solid'
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

export function calculateRate(totalUsers, usersInCategory) {
  if (totalUsers === 0) return 0 // Avoid division by zero

  // Calculate and round to 1 decimal place, ensuring it is a number
  const rate = (usersInCategory / totalUsers) * 100
  return Number((Math.round(rate * 10) / 10).toFixed(1))
}

export const departmentIcons = {
  Services: <ShieldCheckIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
  Support: <PhoneArrowDownLeftIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
  Accounting: <CreditCardIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
  'Product Management': <FolderIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
  Sales: <CurrencyDollarIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
  'Research and Development': <BeakerIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
  Training: <BookOpenIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
  Legal: <ScaleIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
  'Human Resources': <UserGroupIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
  'Business Development': <ArrowTrendingUpIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
  Marketing: <TagIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
  Engineering: <CogIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
}
