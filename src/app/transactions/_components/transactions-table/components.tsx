import { memo } from 'react'
import Text from '@/components/text'
import type { Cell, Column, Row } from '@/hooks/useTable'
import { formatDateToDayMonthYear } from '@/utils/date'
import type { Transaction } from '@/types/api/transactions'

export const DefaultTransactionTableCell = memo<{ row: Row<Transaction> } & Cell<Transaction>>(({ getValue }) => {
	return <Text variant='body-1'>{getValue()}</Text>
})

export const TransactionTableHeadPayment = memo<Column<Transaction>>(() => {
	return <Text variant='body-1'>Payment Date</Text>
})

export const TransactionTableCellPayment = memo<{ row: Row<Transaction> } & Cell<Transaction>>(({ getValue }) => (
	<Text variant='body-1'>{formatDateToDayMonthYear(new Date(getValue() as string))}</Text>
))

export const TransactionTableHeadAmount = memo<Column<Transaction>>(() => {
	return <Text variant='body-1'>Amount</Text>
})

export const TransactionTableCellAmount = memo<{ row: Row<Transaction> } & Cell<Transaction>>(({ row }) => (
	<Text variant='body-1'>
		{row.data.currency} {row.data.amount}
	</Text>
))

export const TransactionTableHeadOperationType = memo<Column<Transaction>>(() => {
	return <Text variant='body-1'>Method</Text>
})

export const TransactionTableHeadCounterParty = memo<Column<Transaction>>(() => {
	return <Text variant='body-1'>Counterparty</Text>
})
