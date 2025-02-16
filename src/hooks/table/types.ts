import { type ReactNode } from 'react'

export interface Column<T> {
	canBeSorted: boolean
	isSorted: boolean
	sortDirection?: 'asc' | 'desc'
	def: ColumnDef<T>
	sort: () => void
}

export interface Cell<T> {
	id: string
	column: Column<T>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	getValue: () => any
}

export interface Row<T> {
	id: string
	cells: Cell<T>[]
	data: T
	select: () => void
	isSelected: boolean
}

export interface UseTableParams<T> {
	data: T[]
	onRowClick?: (row: T) => void
	columnsDef: ColumnDef<T>[]
	getRowId?: (row: T) => string | number
	onRowSelect?: (id: string, row: T) => void
	onColumnSort?: (props?: { column: string; dir: 'asc' | 'desc' }) => void
	state?: TableState
}

export interface ColumnDef<T> {
	id: string
	sortable?: boolean
	accessor: keyof T | ((row: T) => string)
	header: string | ((column: ColumnDef<T>) => ReactNode)
	sortingFn?: (a: T, b: T) => 1 | 0 | -1
	cell: ({ row, ...cell }: Cell<T> & { row: Row<T> }) => ReactNode
}

export interface TableState {
	sort: {
		column: string | undefined
		direction: 'asc' | 'desc' | undefined
	}
	selectedRow: string | undefined
}
