import Text from '@/components/text'
import { formatDateToDayMonthYear } from '@/utils/date'
import type { ColumnDef } from '@/hooks/table/types'
import type { Transaction } from '@/types/api/transactions'
import { dateSorting, numberSorting } from '@/lib/table/sorting'

const columnsDefinition: ColumnDef<Transaction>[] = [
	{
		id: 'counterparty_name',
		header: () => {
			return <Text variant='body-1'>Counterparty</Text>
		},
		accessor: 'counterparty_name',
		cell: ({ getValue }) => {
			return <Text variant='body-1'>{getValue()}</Text>
		}
	},
	{
		id: 'operation_type',
		header: () => {
			return <Text variant='body-1'>Method</Text>
		},
		accessor: 'operation_type',
		cell: ({ getValue }) => {
			return <Text variant='body-1'>{getValue()}</Text>
		}
	},
	{
		id: 'created_at',
		header: () => {
			return <Text variant='body-1'>Payment date</Text>
		},
		accessor: 'created_at',
		sortable: true,
		sortingFn: (a, b) => dateSorting(new Date(a.created_at), new Date(b.created_at)),
		cell: ({ getValue }) => <Text variant='body-1'>{formatDateToDayMonthYear(new Date(getValue() as string))}</Text>
	},
	{
		id: 'amount',
		header: () => {
			return <Text variant='body-1'>Amount</Text>
		},
		accessor: 'amount',
		cell: ({ row }) => (
			<Text variant='body-1'>
				{row.data.currency} {Number.parseFloat(row.data.amount).toFixed(2)}
			</Text>
		),
		sortable: true,
		sortingFn: (a, b) => numberSorting(Number.parseFloat(a.amount), Number.parseFloat(b.amount))
	}
]

export default columnsDefinition
