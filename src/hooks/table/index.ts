import { useCallback, useMemo } from 'react'
import type { ColumnDef, UseTableParams, Column, Cell, Row } from './types'

const defaultSorting = <T>(a: T, b: T, columnDef: ColumnDef<T>): 1 | 0 | -1 => {
	const valueA = typeof columnDef.accessor === 'function' ? columnDef.accessor(a) : a[columnDef.accessor]
	const valueB = typeof columnDef.accessor === 'function' ? columnDef.accessor(b) : b[columnDef.accessor]

	if (valueA === valueB) return 0
	return valueA > valueB ? 1 : -1
}

/* TODO - For better reusability. state should be tracked also internally. 
  - Why not here the state management? This hooks can be used everywhere, so don't want to make it related to next or sorting via url params  */
const useTable = <T>({ columnsDef, data, getRowId, onRowSelect, onColumnSort, state }: UseTableParams<T>) => {
	const onSort = useCallback(
		(id: string) => {
			if (state?.sort.column === id) {
				// In case the column is already sorted...
				// If the direction is ascending, change it to descending
				// If the direction is descending, remove the sorting
				if (state.sort.direction === 'asc') {
					onColumnSort?.({ column: id, dir: 'desc' })
				} else {
					onColumnSort?.()
				}
			} else {
				onColumnSort?.({ column: id, dir: 'asc' })
			}
		},
		[onColumnSort, state?.sort]
	)

	/* Function responsible for rendering the heads of the table */
	const renderHead = useCallback((column: ColumnDef<T>) => {
		const { header } = column
		if (typeof header === 'string') {
			return header
		}

		if (typeof header === 'function') {
			return header(column)
		}
	}, [])

	/* Define table columns based of columns definition */
	const columns = useMemo<Column<T>[]>(() => {
		return columnsDef.map(columnDef => {
			const { id, sortable } = columnDef
			return {
				canBeSorted: !!sortable,
				isSorted: state?.sort.column === id,
				sortDirection: state?.sort.column === id ? state.sort.direction : undefined,
				def: columnDef,
				sort: () => {
					onSort(id)
				}
			}
		})
	}, [columnsDef, state?.sort])

	/* Function responsible for rendering the cells of the table */
	const renderCell = useCallback((item: Cell<T>, row: Row<T>) => {
		const { cell } = item.column.def

		return cell({ ...item, row })
	}, [])

	const sortRows = useCallback(
		(rows: Row<T>[]) => {
			// If there is no sorting, return the rows as they are
			if (!state?.sort.column || !state.sort.direction) return rows

			const columnDef = columnsDef.find(column => column.id === state.sort.column)
			// If the column is not found, return the rows as they are (should not happen, but type safety)
			if (!columnDef) return rows
			// Get the right sorting function (defined into column defition or default one)
			const sortingFn = columnDef.sortingFn ?? defaultSorting
			return rows.sort((a, b) => {
				return sortingFn(a.data, b.data, columnDef) * (state.sort.direction === 'asc' ? 1 : -1)
			})
		},
		[columnsDef, state?.sort]
	)

	/* Define table rows based of data 
     - Assign an id to each row (independently from the row position after sorting)
    */
	const rows = useMemo<Row<T>[]>(() => {
		const rows = data.map((row, index) => {
			const id = getRowId?.(row).toString() ?? index.toString()

			// Pass down the columns
			const cells = columns.map(column => ({
				id: `${id}_${column.def.id}`,
				column,
				getValue: () => {
					if (typeof column.def.accessor === 'function') {
						return column.def.accessor(row)
					}

					return row[column.def.accessor]
				}
			}))

			return {
				id: id,
				cells,
				data: row,
				select: () => {
					onRowSelect?.(id, row)
				},
				isSelected: state?.selectedRow === id
			}
		})

		return sortRows(rows)
	}, [columns, data, sortRows, getRowId, onRowSelect, state?.selectedRow])

	return {
		columns,
		rows,
		renderHead,
		renderCell
	}
}

export default useTable
