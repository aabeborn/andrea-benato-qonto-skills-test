'use client'
import { useSearchParams, useParams, usePathname, useRouter } from 'next/navigation'
import { type FC, use, useCallback } from 'react'
import { useTable, renderCell, renderHead } from '@/hooks/useTable'
import columnsDefinition from './columns'
import { getSortDirection } from '@/lib/table/sorting'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/table'
import type { Transaction } from '@/types/api/transactions'
import { type UseTableParams } from '@/hooks/useTable/types'
import styles from './index.module.scss'

interface TransactionsTableProps {
	transactionsPromise: Promise<Transaction[]>
}

const TransactionsTable: FC<TransactionsTableProps> = ({ transactionsPromise }) => {
	const transactions = use(transactionsPromise)

	const router = useRouter()
	const searchParams = useSearchParams()
	const params = useParams()
	const pathName = usePathname()

	// Handle row selection in table. Push new URL to the router
	const onRowSelect = useCallback(
		(id: string) => {
			if (params.id === id) {
				// click in the same row. remove id from url
				router.push(`/transactions?${searchParams.toString()}`)
			} else {
				// go to the selected row
				router.push(`/transactions/${id}?${searchParams.toString()}`)
			}
		},
		[params.id, searchParams]
	)

	// Handle column sorting in table. Push new URL (the parameters) to the router
	const onColumnSort = useCallback<NonNullable<UseTableParams<Transaction>['onColumnSort']>>(
		props => {
			const { column, dir } = props ?? {}
			const newSearchParams = new URLSearchParams(searchParams)
			if (column && dir) {
				newSearchParams.set('sort', column)
				newSearchParams.set('direction', dir)
			} else {
				newSearchParams.delete('sort')
				newSearchParams.delete('direction')
			}
			router.push(`${pathName}?${newSearchParams.toString()}`)
		},
		[searchParams, pathName]
	)

	const { columns, rows } = useTable<Transaction>({
		data: transactions,
		columnsDef: columnsDefinition,
		getRowId: row => row.id,
		onRowSelect,
		onColumnSort,
		state: {
			sort: {
				column: searchParams.get('sort') ?? undefined,
				direction: getSortDirection(searchParams.get('direction'))
			},
			selectedRow: typeof params.id === 'string' ? params.id : (params.id?.[0] ?? undefined)
		}
	})

	return (
		<Table className={styles.transactions__list__content__table}>
			<TableHeader>
				<TableRow>
					{columns.map(header => (
						<TableHead
							key={header.def.id}
							sortable={header.canBeSorted}
							sortDirection={header.sortDirection}
							onSort={header.sort}
						>
							{renderHead(header)}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{rows.map(row => (
					<TableRow
						key={row.id}
						isSelected={row.isSelected}
						onClick={row.select}
					>
						{row.cells.map(cell => (
							<TableCell key={cell.id}>{renderCell(cell)}</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}

export default TransactionsTable
