import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { isActive } from '@/lib/utils'
import { Badge } from './ui/badge'

// NOT FINISHED**********************
const CustomTable = ({ columns, data }) => {
  return (
    <div className="">
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableHeader className={index === columns.length - 1 ? 'text-right' : ''}>{column.text}</TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} href={`/users/${user.UserId}`} title={`user #${user.id}`}>
              <TableCell>{user.FirstName + ' ' + user.LastName}</TableCell>
              <TableCell className="text-zinc-500">{user.Email}</TableCell>
              <TableCell>{user.JobTitle}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{user.Department}</span>
                </div>
              </TableCell>
              <TableCell className={'text-left'}>
                <Badge color={user.Active === 'TRUE' ? 'lime' : 'pink'}>{isActive(user.Active)}</Badge>
              </TableCell>
              {/* <TableCell>US{user.amount.usd}</TableCell> */}
              {/* <TableCell>US{user.amount.usd}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default UsersTable
