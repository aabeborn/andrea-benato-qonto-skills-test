import { useCallback, useMemo } from 'react'
import { defaultSorting } from '@/lib/table/sorting'
import type { Column, Row, UseTableParams } from './types'

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

			const item: Row<T> = {
				id: id,
				data: row,
				select: () => {
					onRowSelect?.(id, row)
				},
				cells: [],
				isSelected: state?.selectedRow === id
			}

			item.cells = columns.map(column => ({
				id: `${id}_${column.def.id}`,
				column,
				row: item,
				getValue: () => {
					if (typeof column.def.accessor === 'function') {
						return column.def.accessor(row)
					}

					return row[column.def.accessor]
				}
			}))

			return item
		})

		return sortRows(rows)
	}, [columns, data, sortRows, getRowId, onRowSelect, state?.selectedRow])

	return {
		columns,
		rows
	}
}

export default useTable
