import { type FC, useMemo, type ComponentProps, useCallback, type MouseEventHandler } from 'react'
import clsx from 'clsx'
import { ArrowUp, ArrowDown, ChevronUpDown } from '@/components/icons'
import styles from './index.module.scss'

interface TableHeadProps extends ComponentProps<'th'> {
	sortable?: boolean
	sortDirection?: 'asc' | 'desc'
	onSort?: () => void
}

interface TableRowProps extends ComponentProps<'tr'> {
	isSelected?: boolean
}

const Table: FC<ComponentProps<'table'>> = ({ children, className, ...props }) => {
	const classes = useMemo(() => clsx(styles.table, className), [className])
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
	const classes = useMemo(() => clsx(styles.table__header, className), [className])
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
	const classes = useMemo(() => clsx(styles.table__body, className), [className])
	return (
		<tbody
			className={classes}
			{...props}
		>
			{children}
		</tbody>
	)
}

const TableRow: FC<TableRowProps> = ({ children, className, isSelected, ...props }) => {
	const classes = useMemo(
		() => clsx(styles.table__row, isSelected && styles['table__row--selected'], className),
		[isSelected, className]
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

const TableHead: FC<TableHeadProps> = ({ children, className, sortable, sortDirection, onSort, ...props }) => {
	const classes = useMemo(
		() => clsx(styles.table__head, sortable && styles['table__head--sortable'], className),
		[sortable, className]
	)

	const sortIcon = useMemo(() => {
		if (!sortable) return
		if (sortDirection === 'asc') return <ArrowUp className={styles['table__head__sort-icon']} />
		if (sortDirection === 'desc') return <ArrowDown className={styles['table__head__sort-icon']} />
		return <ChevronUpDown className={styles['table__sort-icon']} />
	}, [sortable, sortDirection])

	const clickHandler = useCallback<MouseEventHandler<HTMLTableCellElement>>(
		e => {
			if (sortable && onSort) onSort()
		},
		[sortable, onSort]
	)

	return (
		<th
			className={classes}
			onClick={clickHandler}
			{...props}
		>
			<div className={styles.table__head__content}>
				{children}
				{sortIcon}
			</div>
		</th>
	)
}

const TableCell: FC<ComponentProps<'td'>> = ({ children, className, ...props }) => {
	const classes = useMemo(() => clsx(styles.table__cell, className), [className])
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
