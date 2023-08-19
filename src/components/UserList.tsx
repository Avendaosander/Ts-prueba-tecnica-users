import { User } from '../types'

enum SortBy {
   NONE = 'none',
   NAME = 'name',
   LAST = 'last',
   COUNTRY = 'country',
}

interface Props {
	users: User[]
	showColors: boolean
	toggleSorting: (sortValue: SortBy) => void
	deleteUser: (uuid: string) => void
}

function UserList({ users, showColors, toggleSorting, deleteUser }: Props) {
	return (
		<table className='w-full table border-separate'>
			<thead>
				<tr className=''>
					<th>Foto</th>
					<th
						className='cursor-pointer'
						onClick={() => {
							toggleSorting(SortBy.NAME)
						}}
					>
						Nombre
					</th>
					<th
						className='cursor-pointer'
						onClick={() => {
							toggleSorting(SortBy.LAST)
						}}
					>
						Apellido
					</th>
					<th
						className='cursor-pointer'
						onClick={() => {
							toggleSorting(SortBy.COUNTRY)
						}}
					>
						País
					</th>
					<th>Acciones</th>
				</tr>
			</thead>

			<tbody>
				{users.map(user => (
					<tr
						key={user.login.uuid}
						className={`${
							showColors
								? 'odd:bg-slate-800/50 even:bg-slate-500/50'
								: 'bg-transparent'
						}`}
					>
						<td className='text-center py-1'>
							<img
								src={user.picture.thumbnail}
								alt={user.name.first}
								className='m-auto'
							/>
						</td>
						<td className='text-center py-1'>{user.name.first}</td>
						<td className='text-center py-1'>{user.name.last}</td>
						<td className='text-center py-1'>{user.location.country}</td>
						<td className='text-center py-1'>
							<button
								className='px-4 py-2 rounded-lg outline-none bg-slate-950 hover:ring-1 hover:ring-slate-500 transition duration-300'
								onClick={() => {
									deleteUser(user.login.uuid)
								}}
							>
								Borrar
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default UserList
