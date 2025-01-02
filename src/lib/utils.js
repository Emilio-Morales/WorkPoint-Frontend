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
import { Chip } from '@mui/material'
import { SparkLineChart } from '@mui/x-charts'
import Link from 'next/link'
import {
  getTotalBudget,
  getUsersJoinedByMonthForDepartment,
  getUsersJoinedByMonthForDepartmentMockApi,
} from './mockApi.js/mockApi'
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

// ****************MOCK FUNCTIONS IGNORE FOR PRODUCTION****************

function getAllMonths() {
  const months = []

  // Loop through months from 0 to 11 (JavaScript months are 0-indexed)
  for (let month = 0; month < 12; month++) {
    const date = new Date(2023, month) // Year can be any year
    const monthName = date.toLocaleDateString('en-US', {
      month: 'short',
    })
    months.push(monthName)
  }

  return months
}

function getDaysInMonth(month, year) {
  const date = new Date(year, month, 0)
  const monthName = date.toLocaleDateString('en-US', {
    month: 'short',
  })
  const daysInMonth = date.getDate()
  const days = []
  let i = 1
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`)
    i += 1
  }
  return days
}

function renderSparklineCell(params) {
  // const data = getDaysInMonth(4, 2024)
  const data = getAllMonths()
  const { value, colDef } = params

  if (!value || value.length === 0) {
    return null
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
      <SparkLineChart
        data={value}
        // width={colDef.computedWidth || 100}
        height={32}
        plotType="bar"
        showHighlight
        showTooltip
        colors={['hsl(210, 98%, 42%)']}
        xAxis={{
          scaleType: 'band',
          data,
        }}
      />
    </div>
  )
}

function renderStatus(status) {
  const color = status === 'Healthy Budget Allocation' ? 'success' : 'error'
  // const colors = {
  //   Online: 'success',
  //   Offline: 'default',
  // }

  return <Chip label={status} color={color} size="small" />
}

export const columns = [
  {
    field: 'department',
    headerName: 'Department',
    flex: 1.5,
    minWidth: 150,
    renderCell: (params) => (
      <Link href={`/dashboard/departments/${encodeURIComponent(params.row.department)}`}>
        <>{params.value}</>
      </Link>
    ),
  },
  {
    field: 'budgetStatus',
    headerName: 'Budget Status',
    flex: 0.5,
    minWidth: 200,
    renderCell: (params) => renderStatus(params.value),
  },
  {
    field: 'totalBudget',
    headerName: 'Total Budget',
    // headerAlign: 'right',
    // align: 'right',
    flex: 1,
    minWidth: 120,
    renderCell: (params) => formatCurrency(params.value),
  },
  {
    field: 'totalEmployees',
    headerName: 'Total Employees',
    headerAlign: 'right',
    align: 'center',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'activeEmployees',
    headerName: 'Active Employees',
    headerAlign: 'right',
    align: 'center',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'inactiveEmployees',
    headerName: 'Inactive Employees',
    headerAlign: 'right',
    align: 'center',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'employeesJoined',
    headerName: 'Employees Joined',
    flex: 1,
    minWidth: 150,
    renderCell: renderSparklineCell,
  },
]

export const rows = [
  {
    id: 1,
    department: 'Homepage Overview',
    budgetStatus: 'Online',
    totalEmployees: 8345,
    totalBudget: 212423,
    activeEmployees: 18.5,
    inactiveEmployees: '2m 15s',
    employeesJoined: [
      469172, 488506, 592287, 617401, 640374, 632751, 668638, 807246, 749198, 944863, 911787, 844815, 992022, 1143838,
      1446926, 1267886, 1362511, 1348746, 1560533, 1670690, 1695142, 1916613, 1823306, 1683646, 2025965, 2529989,
      3263473, 3296541, 3041524, 2599497,
    ],
  },
  {
    id: 2,
    department: 'Product Details - Gadgets',
    budgetStatus: 'Online',
    totalEmployees: 5653,
    totalBudget: 172240,
    activeEmployees: 9.7,
    inactiveEmployees: '2m 30s',
    employeesJoined: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 557488, 1341471, 2044561, 2206438,
    ],
  },
  {
    id: 3,
    department: 'Checkout Process - Step 1',
    budgetStatus: 'Offline',
    totalEmployees: 3455,
    totalBudget: 58240,
    activeEmployees: 15.2,
    inactiveEmployees: '2m 10s',
    employeesJoined: [
      166896, 190041, 248686, 226746, 261744, 271890, 332176, 381123, 396435, 495620, 520278, 460839, 704158, 559134,
      681089, 712384, 765381, 771374, 851314, 907947, 903675, 1049642, 1003160, 881573, 1072283, 1139115, 1382701,
      1395655, 1355040, 1381571,
    ],
  },
  {
    id: 4,
    department: 'User Profile Dashboard',
    budgetStatus: 'Online',
    totalEmployees: 112543,
    totalBudget: 96240,
    activeEmployees: 4.5,
    inactiveEmployees: '2m 40s',
    employeesJoined: [
      264651, 311845, 436558, 439385, 520413, 533380, 562363, 533793, 558029, 791126, 649082, 566792, 723451, 737827,
      890859, 935554, 1044397, 1022973, 1129827, 1145309, 1195630, 1358925, 1373160, 1172679, 1340106, 1396974, 1623641,
      1687545, 1581634, 1550291,
    ],
  },
  {
    id: 5,
    department: 'Article Listing - Tech News',
    budgetStatus: 'Offline',
    totalEmployees: 3653,
    totalBudget: 142240,
    activeEmployees: 3.1,
    inactiveEmployees: '2m 55s',
    employeesJoined: [
      251871, 262216, 402383, 396459, 378793, 406720, 447538, 451451, 457111, 589821, 640744, 504879, 626099, 662007,
      754576, 768231, 833019, 851537, 972306, 1014831, 1027570, 1189068, 1119099, 987244, 1197954, 1310721, 1480816,
      1577547, 1854053, 1791831,
    ],
  },
  {
    id: 6,
    department: 'FAQs - Customer Support',
    budgetStatus: 'Online',
    totalEmployees: 106543,
    totalBudget: 15240,
    activeEmployees: 7.2,
    inactiveEmployees: '2m 20s',
    employeesJoined: [
      13671, 16918, 27272, 34315, 42212, 56369, 64241, 77857, 70680, 91093, 108306, 94734, 132289, 133860, 147706,
      158504, 192578, 207173, 220052, 233496, 250091, 285557, 268555, 259482, 274019, 321648, 359801, 399502, 447249,
      497403,
    ],
  },
  {
    id: 7,
    department: 'Product Comparison - Laptops',
    budgetStatus: 'Offline',
    totalEmployees: 7853,
    totalBudget: 32240,
    activeEmployees: 6.5,
    inactiveEmployees: '2m 50s',
    employeesJoined: [
      93682, 107901, 144919, 151769, 170804, 183736, 201752, 219792, 227887, 295382, 309600, 278050, 331964, 356826,
      404896, 428090, 470245, 485582, 539056, 582112, 594289, 671915, 649510, 574911, 713843, 754965, 853020, 916793,
      960158, 984265,
    ],
  },
  {
    id: 8,
    department: 'Shopping Cart - Electronics',
    budgetStatus: 'Online',
    totalEmployees: 8563,
    totalBudget: 48240,
    activeEmployees: 4.3,
    inactiveEmployees: '3m 10s',
    employeesJoined: [
      52394, 63357, 82800, 105466, 128729, 144472, 172148, 197919, 212302, 278153, 290499, 249824, 317499, 333024,
      388925, 410576, 462099, 488477, 533956, 572307, 591019, 681506, 653332, 581234, 719038, 783496, 911609, 973328,
      1056071, 1112940,
    ],
  },
  {
    id: 9,
    department: 'Payment Confirmation - Bank Transfer',
    budgetStatus: 'Offline',
    totalEmployees: 4563,
    totalBudget: 18240,
    activeEmployees: 2.7,
    inactiveEmployees: '3m 25s',
    employeesJoined: [
      15372, 16901, 25489, 30148, 40857, 51136, 64627, 75804, 89633, 100407, 114908, 129957, 143568, 158509, 174822,
      192488, 211512, 234702, 258812, 284328, 310431, 338186, 366582, 396749, 428788, 462880, 499125, 537723, 578884,
      622825,
    ],
  },
  {
    id: 10,
    department: 'Product Reviews - Smartphones',
    budgetStatus: 'Online',
    totalEmployees: 9863,
    totalBudget: 28240,
    activeEmployees: 5.1,
    inactiveEmployees: '3m 05s',
    employeesJoined: [
      70211, 89234, 115676, 136021, 158744, 174682, 192890, 218073, 240926, 308190, 317552, 279834, 334072, 354955,
      422153, 443911, 501486, 538091, 593724, 642882, 686539, 788615, 754813, 687955, 883645, 978347, 1142551, 1233074,
      1278155, 1356724,
    ],
  },
  {
    id: 11,
    department: 'Subscription Management - Services',
    budgetStatus: 'Offline',
    totalEmployees: 6563,
    totalBudget: 24240,
    activeEmployees: 4.8,
    inactiveEmployees: '3m 15s',
    employeesJoined: [
      49662, 58971, 78547, 93486, 108722, 124901, 146422, 167883, 189295, 230090, 249837, 217828, 266494, 287537,
      339586, 363299, 412855, 440900, 490111, 536729, 580591, 671635, 655812, 576431, 741632, 819296, 971762, 1052605,
      1099234, 1173591,
    ],
  },
  {
    id: 12,
    department: 'Order Tracking - Shipments',
    budgetStatus: 'Online',
    totalEmployees: 12353,
    totalBudget: 38240,
    activeEmployees: 3.5,
    inactiveEmployees: '3m 20s',
    employeesJoined: [
      29589, 37965, 55800, 64672, 77995, 91126, 108203, 128900, 148232, 177159, 193489, 164471, 210765, 229977, 273802,
      299381, 341092, 371567, 413812, 457693, 495920, 564785, 541022, 491680, 618096, 704926, 833365, 904313, 974622,
      1036567,
    ],
  },
  {
    id: 13,
    department: 'Customer Feedback - Surveys',
    budgetStatus: 'Offline',
    totalEmployees: 5863,
    totalBudget: 13240,
    activeEmployees: 2.3,
    inactiveEmployees: '3m 30s',
    employeesJoined: [
      8472, 9637, 14892, 19276, 23489, 28510, 33845, 39602, 45867, 52605, 59189, 65731, 76021, 85579, 96876, 108515,
      119572, 131826, 145328, 160192, 176528, 196662, 217929, 239731, 262920, 289258, 315691, 342199, 370752, 402319,
    ],
  },
  {
    id: 14,
    department: 'Account Settings - Preferences',
    budgetStatus: 'Online',
    totalEmployees: 7853,
    totalBudget: 18240,
    activeEmployees: 3.2,
    inactiveEmployees: '3m 15s',
    employeesJoined: [
      15792, 16948, 22728, 25491, 28412, 31268, 34241, 37857, 42068, 46893, 51098, 55734, 60780, 66421, 72680, 79584,
      87233, 95711, 105285, 115814, 127509, 140260, 154086, 169495, 186445, 205109, 225580, 247983, 272484, 299280,
    ],
  },
  {
    id: 15,
    department: 'Login Page - Authentication',
    budgetStatus: 'Offline',
    totalEmployees: 9563,
    totalBudget: 24240,
    activeEmployees: 2.5,
    inactiveEmployees: '3m 35s',
    employeesJoined: [
      25638, 28355, 42089, 53021, 66074, 80620, 97989, 118202, 142103, 166890, 193869, 225467, 264089, 307721, 358059,
      417835, 488732, 573924, 674878, 794657, 938542, 1111291, 1313329, 1543835, 1812156, 2123349, 2484926, 2907023,
      3399566, 3973545,
    ],
  },
  {
    id: 16,
    department: 'Promotions - Seasonal Sales',
    budgetStatus: 'Online',
    totalEmployees: 13423,
    totalBudget: 54230,
    activeEmployees: 7.8,
    inactiveEmployees: '2m 45s',
    employeesJoined: [
      241732, 256384, 289465, 321423, 345672, 378294, 398472, 420364, 436278, 460192, 495374, 510283, 532489, 559672,
      587312, 610982, 629385, 654732, 678925, 704362, 725182, 749384, 772361, 798234, 819472, 846291, 872183, 894673,
      919283, 945672,
    ],
  },
  {
    id: 17,
    department: 'Tutorials - How to Guides',
    budgetStatus: 'Offline',
    totalEmployees: 4234,
    totalBudget: 19342,
    activeEmployees: 5.2,
    inactiveEmployees: '3m 05s',
    employeesJoined: [
      12345, 14567, 16789, 18901, 21023, 23145, 25267, 27389, 29501, 31623, 33745, 35867, 37989, 40101, 42223, 44345,
      46467, 48589, 50701, 52823, 54945, 57067, 59189, 61301, 63423, 65545, 67667, 69789, 71901, 74023,
    ],
  },
  {
    id: 18,
    department: 'Blog Posts - Tech Insights',
    budgetStatus: 'Online',
    totalEmployees: 8567,
    totalBudget: 34234,
    activeEmployees: 6.3,
    inactiveEmployees: '2m 50s',
    employeesJoined: [
      23456, 25678, 27890, 30102, 32324, 34546, 36768, 38980, 41202, 43424, 45646, 47868, 50080, 52302, 54524, 56746,
      58968, 61180, 63402, 65624, 67846, 70068, 72290, 74502, 76724, 78946, 81168, 83380, 85602, 87824,
    ],
  },
  {
    id: 19,
    department: 'Events - Webinars',
    budgetStatus: 'Offline',
    totalEmployees: 3456,
    totalBudget: 19234,
    activeEmployees: 4.5,
    inactiveEmployees: '3m 20s',
    employeesJoined: [
      123456, 145678, 167890, 190012, 212324, 234546, 256768, 278980, 301202, 323424, 345646, 367868, 390080, 412302,
      434524, 456746, 478968, 501180, 523402, 545624, 567846, 590068, 612290, 634502, 656724, 678946, 701168, 723380,
      745602, 767824,
    ],
  },
  {
    id: 20,
    department: 'Support - Contact Us',
    budgetStatus: 'Online',
    totalEmployees: 6734,
    totalBudget: 27645,
    activeEmployees: 3.9,
    inactiveEmployees: '2m 55s',
    employeesJoined: [
      234567, 256789, 278901, 301023, 323245, 345467, 367689, 389801, 412023, 434245, 456467, 478689, 500801, 523023,
      545245, 567467, 589689, 611801, 634023, 656245, 678467, 700689, 722801, 745023, 767245, 789467, 811689, 833801,
      856023, 878245,
    ],
  },
  {
    id: 21,
    department: 'Case Studies - Success Stories',
    budgetStatus: 'Offline',
    totalEmployees: 4567,
    totalBudget: 19345,
    activeEmployees: 6.1,
    inactiveEmployees: '3m 10s',
    employeesJoined: [
      34567, 36789, 38901, 41023, 43145, 45267, 47389, 49501, 51623, 53745, 55867, 57989, 60101, 62223, 64345, 66467,
      68589, 70701, 72823, 74945, 77067, 79189, 81301, 83423, 85545, 87667, 89789, 91901, 94023, 96145,
    ],
  },
  {
    id: 22,
    department: 'News - Industry Updates',
    budgetStatus: 'Online',
    totalEmployees: 7856,
    totalBudget: 34567,
    activeEmployees: 5.7,
    inactiveEmployees: '3m 05s',
    employeesJoined: [
      45678, 47890, 50102, 52324, 54546, 56768, 58980, 61202, 63424, 65646, 67868, 70080, 72302, 74524, 76746, 78968,
      81180, 83402, 85624, 87846, 90068, 92290, 94502, 96724, 98946, 101168, 103380, 105602, 107824, 110046,
    ],
  },
  {
    id: 23,
    department: 'Forum - User Discussions',
    budgetStatus: 'Offline',
    totalEmployees: 5678,
    totalBudget: 23456,
    activeEmployees: 4.2,
    inactiveEmployees: '2m 40s',
    employeesJoined: [
      56789, 58901, 61023, 63145, 65267, 67389, 69501, 71623, 73745, 75867, 77989, 80101, 82223, 84345, 86467, 88589,
      90701, 92823, 94945, 97067, 99189, 101301, 103423, 105545, 107667, 109789, 111901, 114023, 116145, 118267,
    ],
  },
  {
    id: 24,
    department: 'Documentation - API Reference',
    budgetStatus: 'Online',
    totalEmployees: 6789,
    totalBudget: 27689,
    activeEmployees: 5.0,
    inactiveEmployees: '3m 00s',
    employeesJoined: [
      67890, 70102, 72324, 74546, 76768, 78980, 81202, 83424, 85646, 87868, 90080, 92302, 94524, 96746, 98968, 101180,
      103402, 105624, 107846, 110068, 112290, 114502, 116724, 118946, 121168, 123380, 125602, 127824, 130046, 132268,
    ],
  },
  {
    id: 25,
    department: 'Services - Consulting',
    budgetStatus: 'Offline',
    totalEmployees: 4563,
    totalBudget: 19240,
    activeEmployees: 6.4,
    inactiveEmployees: '3m 25s',
    employeesJoined: [
      345678, 367890, 390012, 412324, 434546, 456768, 478980, 501202, 523424, 545646, 567868, 590080, 612302, 634524,
      656746, 678968, 701180, 723402, 745624, 767846, 790068, 812290, 834502, 856724, 878946, 901168, 923380, 945602,
      967824, 990046,
    ],
  },
  {
    id: 26,
    department: 'Feedback - User Reviews',
    budgetStatus: 'Online',
    totalEmployees: 8564,
    totalBudget: 34240,
    activeEmployees: 6.2,
    inactiveEmployees: '3m 15s',
    employeesJoined: [
      123478, 145690, 167912, 190134, 212356, 234578, 256790, 279012, 301234, 323456, 345678, 367890, 390012, 412234,
      434456, 456678, 478890, 501012, 523234, 545456, 567678, 589890, 612012, 634234, 656456, 678678, 700890, 723012,
      745234, 767456,
    ],
  },
  {
    id: 27,
    department: 'Profiles - Team Members',
    budgetStatus: 'Offline',
    totalEmployees: 5634,
    totalBudget: 23423,
    activeEmployees: 5.5,
    inactiveEmployees: '2m 45s',
    employeesJoined: [
      345123, 367345, 389567, 411789, 434012, 456234, 478456, 500678, 522901, 545123, 567345, 589567, 611789, 634012,
      656234, 678456, 700678, 722901, 745123, 767345, 789567, 811789, 834012, 856234, 878456, 900678, 922901, 945123,
      967345, 989567,
    ],
  },
  {
    id: 28,
    department: 'Notifications - Alerts',
    budgetStatus: 'Online',
    totalEmployees: 6745,
    totalBudget: 27654,
    activeEmployees: 4.9,
    inactiveEmployees: '3m 10s',
    employeesJoined: [
      456123, 478345, 500567, 522789, 545012, 567234, 589456, 611678, 633901, 656123, 678345, 700567, 722789, 745012,
      767234, 789456, 811678, 833901, 856123, 878345, 900567, 922789, 945012, 967234, 989456, 1011678, 1033901, 1056123,
      1078345, 1100567,
    ],
  },
  {
    id: 29,
    department: 'Dashboard - Metrics',
    budgetStatus: 'Offline',
    totalEmployees: 5678,
    totalBudget: 23456,
    activeEmployees: 6.3,
    inactiveEmployees: '2m 50s',
    employeesJoined: [
      567890, 590112, 612334, 634556, 656778, 678990, 701212, 723434, 745656, 767878, 790100, 812322, 834544, 856766,
      878988, 901210, 923432, 945654, 967876, 990098, 1012320, 1034542, 1056764, 1078986, 1101208, 1123430, 1145652,
      1167874, 1190096, 1212318,
    ],
  },
  {
    id: 30,
    department: 'Reports - Monthly Analysis',
    budgetStatus: 'Online',
    totalEmployees: 7890,
    totalBudget: 34567,
    activeEmployees: 5.9,
    inactiveEmployees: '3m 20s',
    employeesJoined: [
      678901, 701123, 723345, 745567, 767789, 790011, 812233, 834455, 856677, 878899, 901121, 923343, 945565, 967787,
      990009, 1012231, 1034453, 1056675, 1078897, 1101119, 1123341, 1145563, 1167785, 1190007, 1212229, 1234451,
      1256673, 1278895, 1301117, 1323339,
    ],
  },
  {
    id: 31,
    department: 'Training - Employee Onboarding',
    budgetStatus: 'Offline',
    totalEmployees: 3456,
    totalBudget: 19234,
    activeEmployees: 6.1,
    inactiveEmployees: '3m 10s',
    employeesJoined: [
      789012, 811234, 833456, 855678, 877890, 900112, 922334, 944556, 966778, 989000, 1011222, 1033444, 1055666,
      1077888, 1100110, 1122332, 1144554, 1166776, 1188998, 1211220, 1233442, 1255664, 1277886, 1300108, 1322330,
      1344552, 1366774, 1388996, 1411218, 1433440,
    ],
  },
  {
    id: 32,
    department: 'Resources - Knowledge Base',
    budgetStatus: 'Online',
    totalEmployees: 5678,
    totalBudget: 23456,
    activeEmployees: 4.7,
    inactiveEmployees: '3m 25s',
    employeesJoined: [
      890123, 912345, 934567, 956789, 979012, 1001234, 1023456, 1045678, 1067890, 1090123, 1112345, 1134567, 1156789,
      1179012, 1201234, 1223456, 1245678, 1267890, 1290123, 1312345, 1334567, 1356789, 1379012, 1401234, 1423456,
      1445678, 1467890, 1490123, 1512345, 1534567,
    ],
  },
  {
    id: 33,
    department: 'Settings - Privacy Controls',
    budgetStatus: 'Offline',
    totalEmployees: 6789,
    totalBudget: 27689,
    activeEmployees: 5.8,
    inactiveEmployees: '3m 05s',
    employeesJoined: [
      901234, 923456, 945678, 967890, 990112, 1012334, 1034556, 1056778, 1079000, 1101222, 1123444, 1145666, 1167888,
      1190110, 1212332, 1234554, 1256776, 1278998, 1301220, 1323442, 1345664, 1367886, 1390108, 1412330, 1434552,
      1456774, 1478996, 1501218, 1523440, 1545662,
    ],
  },
  {
    id: 34,
    department: 'Integrations - Third-Party Services',
    budgetStatus: 'Online',
    totalEmployees: 4567,
    totalBudget: 19345,
    activeEmployees: 4.4,
    inactiveEmployees: '2m 50s',
    employeesJoined: [
      123457, 145679, 167891, 190113, 212335, 234557, 256779, 279001, 301223, 323445, 345667, 367889, 390011, 412233,
      434455, 456677, 478899, 501121, 523343, 545565, 567787, 590009, 612231, 634453, 656675, 678897, 701119, 723341,
      745563, 767785,
    ],
  },
  {
    id: 35,
    department: 'Account - Billing Information',
    budgetStatus: 'Offline',
    totalEmployees: 7890,
    totalBudget: 34567,
    activeEmployees: 5.4,
    inactiveEmployees: '3m 00s',
    employeesJoined: [
      234568, 256790, 278912, 301134, 323356, 345578, 367790, 390012, 412234, 434456, 456678, 478890, 501112, 523334,
      545556, 567778, 590000, 612222, 634444, 656666, 678888, 701110, 723332, 745554, 767776, 789998, 812220, 834442,
      856664, 878886,
    ],
  },
]

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
export async function formatDepartmentsTableDataMockApi(departmentsData) {
  if (!departmentsData || !Array.isArray(departmentsData)) {
    throw new Error('Invalid department data provided')
  }

  const formattedData = await Promise.all(
    departmentsData.map(async (department, index) => {
      const departmentName = department.Department
      const totalEmployees = department.Count
      const activeEmployees = department.ActiveCount
      const inactiveEmployees = totalEmployees - activeEmployees

      const budgetStatus = activeEmployees > inactiveEmployees ? 'Healthy Budget Allocation' : 'Budget Needs Attention'
      const totalBudget = department.TotalSalaryPaidToDepartment

      const employeesJoinedData = await getUsersJoinedByMonthForDepartmentMockApi(departmentName, 2024)

      return {
        id: index,
        department: departmentName,
        budgetStatus,
        totalEmployees,
        totalBudget,
        activeEmployees,
        inactiveEmployees,
        employeesJoined: employeesJoinedData.monthlyData,
      }
    })
  )

  return formattedData
}

export async function formatDepartmentsTableData(departmentsData) {
  if (!departmentsData || !Array.isArray(departmentsData)) {
    throw new Error('Invalid department data provided')
  }

  const formattedData = await Promise.all(
    departmentsData.map(async (department, index) => {
      const departmentName = department.department
      const totalEmployees = department.employeeCount
      const activeEmployees = department.activeEmployeeCount
      const inactiveEmployees = totalEmployees - activeEmployees

      const budgetStatus = activeEmployees > inactiveEmployees ? 'Healthy Budget Allocation' : 'Budget Needs Attention'
      const totalBudget = department.totalSalary

      const employeesJoinedData = await getUsersJoinedByMonthForDepartment(departmentName, 2024)

      return {
        id: index,
        department: departmentName,
        budgetStatus,
        totalEmployees,
        totalBudget,
        activeEmployees,
        inactiveEmployees,
        employeesJoined: employeesJoinedData.monthlyData,
      }
    })
  )

  return formattedData
}

// export const departmentIcons = {
//   Services: <ShieldCheckIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
//   Support: <PhoneArrowDownLeftIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
//   Accounting: <CreditCardIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
//   'Product Management': <FolderIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
//   Sales: <CurrencyDollarIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
//   'Research and Development': <BeakerIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
//   Training: <BookOpenIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
//   Legal: <ScaleIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
//   'Human Resources': <UserGroupIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
//   'Business Development': <ArrowTrendingUpIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
//   Marketing: <TagIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
//   Engineering: <CogIcon className="h-20 w-32 text-stone-900 dark:text-stone-500" />,
// }
export async function formatDepartmentsProgressBarDataMockApi(departmentsData) {
  if (!departmentsData || !Array.isArray(departmentsData)) {
    throw new Error('Invalid department data provided')
  }

  const departmentIcons = {
    Services: <ShieldCheckIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    Support: <PhoneArrowDownLeftIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    Accounting: <CreditCardIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    'Product Management': <FolderIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    Sales: <CurrencyDollarIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    'Research and Development': <BeakerIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    Training: <BookOpenIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    Legal: <ScaleIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    'Human Resources': <UserGroupIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    'Business Development': <ArrowTrendingUpIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    Marketing: <TagIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    Engineering: <CogIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
  }

  const totalBudget = await getTotalBudget()

  // {
  //   departmentName: 'India',
  //   departmentBudget: 50,
  //   departmentIcon: <IndiaFlag />,
  //   color: 'hsl(220, 25%, 65%)',
  // },
  const formattedData = await Promise.all(
    departmentsData.map(async (department, index) => {
      const departmentName = department.Department
      const departmentBudgetShare = ((department.TotalSalaryPaidToDepartment / totalBudget) * 100).toFixed(1)
      const departmentIcon = departmentIcons[departmentName]
      const color = 'hsl(220, 25%, 65%)'

      return {
        id: index,
        departmentName,
        departmentBudgetShare,
        departmentIcon,
        color,
      }
    })
  )

  return formattedData
}
export async function formatDepartmentsProgressBarData(departmentsData) {
  if (!departmentsData || !Array.isArray(departmentsData)) {
    throw new Error('Invalid department data provided')
  }

  const departmentIcons = {
    Services: <ShieldCheckIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    Support: <PhoneArrowDownLeftIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    Accounting: <CreditCardIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    'Product Management': <FolderIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    Sales: <CurrencyDollarIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    'Research and Development': <BeakerIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    Training: <BookOpenIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    Legal: <ScaleIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    'Human Resources': <UserGroupIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    'Business Development': <ArrowTrendingUpIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    Marketing: <TagIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
    Engineering: <CogIcon className="h-6 w-6 text-stone-900 dark:text-stone-500" />,
  }

  const totalBudget = await getTotalBudget()

  // {
  //   departmentName: 'India',
  //   departmentBudget: 50,
  //   departmentIcon: <IndiaFlag />,
  //   color: 'hsl(220, 25%, 65%)',
  // },
  const formattedData = await Promise.all(
    departmentsData.map(async (department, index) => {
      const departmentName = department.department
      const departmentBudgetShare = ((department.totalSalary / totalBudget) * 100).toFixed(1)
      const departmentIcon = departmentIcons[departmentName]
      const color = 'hsl(220, 25%, 65%)'

      return {
        id: index,
        departmentName,
        departmentBudgetShare,
        departmentIcon,
        color,
      }
    })
  )

  return formattedData
}

export async function formatDepartmentsPieChartDataMockApi(departmentsData) {
  if (!departmentsData || !Array.isArray(departmentsData)) {
    throw new Error('Invalid department data provided')
  }

  const totalBudgetRaw = await getTotalBudget()
  const totalBudget = formatTotalBudget(totalBudgetRaw)

  const formattedData = await Promise.all(
    departmentsData.map(async (department, index) => {
      const label = department.Department
      const value = department.TotalSalaryPaidToDepartment

      return {
        id: index,
        label,
        value,
      }
    })
  )

  return {
    totalBudget,
    formattedData,
  }
}

export async function formatDepartmentsPieChartData(departmentsData) {
  if (!departmentsData || !Array.isArray(departmentsData)) {
    throw new Error('Invalid department data provided')
  }

  const totalBudgetRaw = await getTotalBudget()
  const totalBudget = formatTotalBudget(totalBudgetRaw)

  const formattedData = await Promise.all(
    departmentsData.map(async (department, index) => {
      const label = department.department
      const value = department.totalSalary

      return {
        id: index,
        label,
        value,
      }
    })
  )

  return {
    totalBudget,
    formattedData,
  }
}

export async function formatDepartmentGrowthPieChartDataMockApi(departmentsData) {
  if (!departmentsData || !Array.isArray(departmentsData)) {
    throw new Error('Invalid department data provided')
  }

  // id: number;
  // department: any;
  // budgetStatus: string;
  // totalEmployees: any;
  // totalBudget: any;
  // activeEmployees: any;
  // inactiveEmployees: number;
  // employeesJoined: any[];
  const totalBudgetRaw = await getTotalBudget()
  const totalBudget = formatTotalBudget(totalBudgetRaw)
  let totalEmployeesJoined = 0

  const formattedData = await Promise.all(
    departmentsData.map(async (department, index) => {
      const label = department.department
      const value = department.employeesJoined.reduce((sum, value) => sum + value, 0)

      totalEmployeesJoined += value

      return {
        id: department.id,
        label,
        value,
      }
    })
  )

  return {
    totalEmployeesJoined,
    formattedData,
  }
}

export async function formatDepartmentGrowthPieChartData(departmentsData) {
  if (!departmentsData || !Array.isArray(departmentsData)) {
    throw new Error('Invalid department data provided')
  }

  // id: number;
  // department: any;
  // budgetStatus: string;
  // totalEmployees: any;
  // totalBudget: any;
  // activeEmployees: any;
  // inactiveEmployees: number;
  // employeesJoined: any[];
  const totalBudgetRaw = await getTotalBudget()
  const totalBudget = formatTotalBudget(totalBudgetRaw)
  let totalEmployeesJoined = 0

  const formattedData = await Promise.all(
    departmentsData.map(async (department, index) => {
      const label = department.department
      const value = department.employeesJoined.reduce((sum, value) => sum + value, 0)

      totalEmployeesJoined += value

      return {
        id: department.id,
        label,
        value,
      }
    })
  )

  return {
    totalEmployeesJoined,
    formattedData,
  }
}

export function formatTotalBudget(value) {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M` // Format millions as "X.XM"
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K` // Format thousands as "X.XK"
  }
  return value.toString() // If the value is less than 1000, return it as is
}
