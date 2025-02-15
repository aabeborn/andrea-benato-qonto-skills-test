import clsx from 'clsx'
import { FC, useMemo, ComponentProps } from 'react'
import { ArrowUp, ArrowDown, ChevronUpDown } from '../icons'
import './index.css'

interface TableHeadProps extends ComponentProps<'th'> {
	sortable?: boolean
	sortDirection?: 'asc' | 'desc'
}

interface TableRowProps extends ComponentProps<'tr'> {
	isActive?: boolean
}

const Table: FC<ComponentProps<'table'>> = ({ children, className, ...props }) => {
	const classes = useMemo(() => clsx('table', className), [className])
	return (
		<table
			className={classes}
			{...props}
		>
			{children}
		</table>
	)
}

const TableHeader: FC<ComponentProps<'thead'>> = ({ children, className, ...props }) => {
	const classes = useMemo(() => clsx('table__header', className), [className])
	return (
		<thead
			className={classes}
			{...props}
		>
			{children}
		</thead>
	)
}

const TableBody: FC<ComponentProps<'tbody'>> = ({ children, className, ...props }) => {
	const classes = useMemo(() => clsx('table__body', className), [className])
	return (
		<tbody
			className={classes}
			{...props}
		>
			{children}
		</tbody>
	)
}

const TableRow: FC<TableRowProps> = ({ children, className, isActive, ...props }) => {
	const classes = useMemo(
		() => clsx('table__row', isActive && 'table__row--selected', className),
		[isActive, className]
	)
	return (
		<tr
			className={classes}
			{...props}
		>
			{children}
		</tr>
	)
}

const TableHead: FC<TableHeadProps> = ({ children, className, sortable, sortDirection, ...props }) => {
	const classes = useMemo(
		() => clsx('table__head', sortable && 'table__head--sortable', className),
		[sortable, className]
	)

	const sortIcon = useMemo(() => {
		if (!sortable) return
		if (sortDirection === 'asc') return <ArrowUp className='table__head__sort-icon' />
		if (sortDirection === 'desc') return <ArrowDown className='table__head__sort-icon' />
		return <ChevronUpDown className='table__sort-icon' />
	}, [sortable, sortDirection])

	return (
		<th
			className={classes}
			{...props}
		>
			<div className='table__head__content'>
				{children}
				{sortIcon}
			</div>
		</th>
	)
}

const TableCell: FC<ComponentProps<'td'>> = ({ children, className, ...props }) => {
	const classes = useMemo(() => clsx('table__cell', className), [className])
	return (
		<td
			className={classes}
			{...props}
		>
			{children}
		</td>
	)
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }
