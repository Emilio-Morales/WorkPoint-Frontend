'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Select } from './ui/select'

const SelectSort = ({ values, variant }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSortChange = (event) => {
    const sortValue = event.target.value
    const params = new URLSearchParams(searchParams)

    params.set('sort', sortValue)

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <>
      {variant === 'departments' ? (
        <div>
          <Select name="sort" defaultValue="name" onChange={handleSortChange}>
            {values.map((value, index) => (
              <option
                key={index + value}
                value={value === 'budget ↓' ? 'budgetDesc' : value === 'budget ↑' ? 'budgetAsc' : value}
                className=""
              >
                Sort by {value}
              </option>
            ))}
          </Select>
        </div>
      ) : variant === 'departmentEmployees' ? (
        <div>
          <Select name="sort" defaultValue="name" onChange={handleSortChange}>
            {values.map((value, index) => (
              <option
                key={index + value}
                value={value === 'salary ↓' ? 'salaryDesc' : value === 'salary ↑' ? 'salaryAsc' : value}
                className=""
              >
                Sort by {value}
              </option>
            ))}
          </Select>
        </div>
      ) : (
        <div>
          <Select name="sort" defaultValue="name" onChange={handleSortChange}>
            {values.map((value, index) => (
              <option key={index + value} value={value} className="">
                Sort by {value}
              </option>
            ))}
          </Select>
        </div>
      )}
    </>
  )
}

export default SelectSort
