import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatCurrency } from '@/lib/utils'
import { Badge } from './ui/badge'
const DepartmentUsersTable = ({ users }) => {
  // console.log('inside departments table:', users)
  return (
    <div className="">
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Job Title</TableHeader>
            <TableHeader>Salary</TableHeader>
            <TableHeader className={'text-left'}>Active</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 1 &&
            users.map((user, index) => (
              <TableRow
                key={user.userId + user.firstName + index}
                href={`/dashboard/users/${user.userId}`}
                title={`user #${user.userid}`}
              >
                <TableCell>{user.firstName + ' ' + user.lastName}</TableCell>
                <TableCell className="text-zinc-500">{user.email}</TableCell>
                <TableCell>{user.jobTitle}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{formatCurrency(user.salary)}</span>
                  </div>
                </TableCell>
                <TableCell className={'text-left'}>
                  <Badge color={user.active ? 'lime' : 'pink'}>{user.active ? 'Active' : 'Inactive'}</Badge>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default DepartmentUsersTable
