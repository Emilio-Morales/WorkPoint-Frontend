import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from './ui/badge'
const UsersTable = ({ users }) => {
  console.log('inside user table:', users)
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
            {/* <TableHeader>Amount</TableHeader> */}
            {/* <TableHeader>Amount</TableHeader> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 1 &&
            users.map((user) => (
              <TableRow key={user.userId} href={`/dashboard/users/${user.userId}`} title={`user #${user.userId}`}>
                <TableCell>{user.firstName + ' ' + user.lastName}</TableCell>
                <TableCell className="text-zinc-500">{user.email}</TableCell>
                <TableCell>{user.jobTitle}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{user.department}</span>
                  </div>
                </TableCell>
                <TableCell className={'text-left'}>
                  {/* <Badge color={user.active === 'TRUE' ? 'lime' : 'pink'}>{isActive(user.Active)}</Badge> */}
                  <Badge color={user.active ? 'lime' : 'pink'}>{user.active ? 'Active' : 'Inactive'}</Badge>
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
