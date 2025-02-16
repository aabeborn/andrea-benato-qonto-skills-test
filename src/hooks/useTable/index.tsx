import { type ReactNode, isValidElement, type JSX } from 'react'
import useTable from './hook'
import type { UseTableParams, Column, Cell, Row, ColumnDef } from './types'

const renderHead = <T,>(column: Column<T>): ReactNode | JSX.Element => {
	const { header } = column.def
	if (isValidElement(header)) {
		const Component = header
		return <Component {...column.def} />
	}
	return header(column.def)
}

const renderCell = <T,>(item: Cell<T>): ReactNode | JSX.Element => {
	const { cell } = item.column.def
	if (isValidElement(cell)) {
		const Component = cell
		return <Component {...item} />
	}
	return cell(item)
}

// eslint-disable-next-line unicorn/prefer-export-from
export { renderHead, renderCell, useTable, UseTableParams, Column, Cell, Row, ColumnDef }
