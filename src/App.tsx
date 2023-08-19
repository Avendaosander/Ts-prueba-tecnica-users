import { useEffect, useState, useRef, useMemo } from 'react'
import { APIUsers, type User } from './types'
import UserList from './components/UserList'

enum SortBy {
   NONE = 'none',
   NAME = 'name',
   LAST = 'last',
   COUNTRY = 'country',
}

function App() {
	const [users, setUsers] = useState<User[]>([])
	const [showColors, setShowColors] = useState<boolean>(false)
	const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
	const [filterCountry, setFilterCountry] = useState<string | null>(null)
	const originalUsers = useRef<User[]>([])

	const toggleColors = () => {
		setShowColors(!showColors)
	}

	const toggleSortByCountry = () => {
		const newSorting = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
		setSorting(newSorting)
	}
	
	const handleSorting = (sortValue: SortBy) => {
		setSorting(sortValue)
	}

	const handleDelete = (uuid: string) => {
		const filteredUsers = users.filter(user => user.login.uuid !== uuid)
		setUsers(filteredUsers)
	}

	const resetState = () => {
		setUsers(originalUsers.current)
	}

	useEffect(() => {
		fetch('https://randomuser.me/api?results=100')
			.then(res => res.json() as Promise<APIUsers>)
			.then(res => {
				setUsers(res.results)
				originalUsers.current = res.results
			})
			.catch(err => {
				console.error(err)
			})
	}, [])

	const filteredUsers = useMemo(() => {
		return typeof filterCountry === 'string' && filterCountry.length > 0
			? [...users].filter(user =>
				user.location.country
					.toLowerCase()
					.includes(filterCountry.toLowerCase())
			)
			: users
	}, [users, filterCountry])
	
	const sortedUsers = useMemo(() => {
		if (sorting === SortBy.NONE) return filteredUsers

		if (sorting === SortBy.NAME) {
			return [...filteredUsers].sort((a, b) =>
				a.name.first.localeCompare(b.name.first)
			)
		}

		if (sorting === SortBy.LAST) {
			return [...filteredUsers].sort((a, b) =>
				a.name.last.localeCompare(b.name.last)
			)
		}

		if (sorting === SortBy.COUNTRY) {
			return [...filteredUsers].sort((a, b) =>
				a.location.country.localeCompare(b.location.country)
			)
		}

		return filteredUsers
	}, [sorting, filteredUsers])

	return (
		<>
			<header className='mt-16'>
				<h1 className='text-center text-5xl font-semibold'>
					Prueba técnica
				</h1>
			</header>
			<main>
				<section className='flex justify-center my-10 gap-2'>
					<button
						className='px-4 py-2 font-medium rounded-lg outline-none bg-slate-950/50 hover:ring-1 hover:ring-slate-500 transition duration-300'
						onClick={toggleColors}
					>
						Colorear filas
					</button>
					<button
						className='px-4 py-2 font-medium rounded-lg outline-none bg-slate-950/50 hover:ring-1 hover:ring-slate-500 transition duration-300'
						onClick={toggleSortByCountry}
					>
						{sorting === SortBy.COUNTRY ? 'No ordernar por país' : 'Ordernar por país'}
					</button>
					<button
						className='px-4 py-2 font-medium rounded-lg outline-none bg-slate-950/50 hover:ring-1 hover:ring-slate-500 transition duration-300'
						onClick={resetState}
					>
						Resetear estado
					</button>
					<input
						type='text'
						placeholder='Filtra por pais'
						onChange={e => {
							setFilterCountry(e.target.value.trim())
						}}
						className='px-4 py-2 font-medium rounded-lg outline-none bg-slate-700 focus:ring-1 focus:ring-slate-500'
					/>
				</section>
				<section className='max-w-6xl mx-auto px-10'>
					<UserList
						users={sortedUsers}
						showColors={showColors}
						toggleSorting={handleSorting}
						deleteUser={handleDelete}
					/>
				</section>
			</main>
		</>
	)
}

export default App
