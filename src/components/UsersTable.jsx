import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from './ui/badge'
const UsersTable = ({ users }) => {
  return (
    <div className="">
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Job Title</TableHeader>
            <TableHeader>Department</TableHeader>
            <TableHeader className={'text-left'}>Active</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 1 &&
            users.map((user, index) => (
              <TableRow
                key={user.UserId + user.FirstName + index}
                href={`/dashboard/users/${user.UserId}`}
                title={`user #${user.UserId}`}
              >
                <TableCell>{user.FirstName + ' ' + user.LastName}</TableCell>
                <TableCell className="text-zinc-500">{user.Email}</TableCell>
                <TableCell>{user.JobTitle}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{user.Department}</span>
                  </div>
                </TableCell>
                <TableCell className={'text-left'}>
                  {/* <Badge color={user.active === 'TRUE' ? 'lime' : 'pink'}>{isActive(user.Active)}</Badge> */}
                  <Badge color={user.Active ? 'lime' : 'pink'}>{user.Active ? 'Active' : 'Inactive'}</Badge>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default UsersTable
