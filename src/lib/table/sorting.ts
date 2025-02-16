import { ColumnDef } from '@/hooks/table/types'

export const getSortDirection = (direction: string | null) => {
	if (direction === 'asc' || direction === 'desc') {
		return direction
	}
	return
}

export const defaultSorting = <T>(a: T, b: T, columnDef: ColumnDef<T>): 1 | 0 | -1 => {
	const valueA = typeof columnDef.accessor === 'function' ? columnDef.accessor(a) : a[columnDef.accessor]
	const valueB = typeof columnDef.accessor === 'function' ? columnDef.accessor(b) : b[columnDef.accessor]

	if (valueA === valueB) return 0
	return valueA > valueB ? 1 : -1
}

export const dateSorting = (a: Date, b: Date) => {
	const dateA = a.getTime()
	const dateB = b.getTime()
	if (dateA === dateB) return 0
	return dateA > dateB ? 1 : -1
}

export const numberSorting = (a: number, b: number) => {
	if (a === b) return 0
	return a > b ? 1 : -1
}
