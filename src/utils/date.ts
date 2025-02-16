export const formatDateToDayMonthYear = (date: Date): string => {
	const dateFormatter = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})
	return dateFormatter.format(date)
}

export const formatDateFull = (date: Date): string => {
	const dateFormatter = new Intl.DateTimeFormat('en-US', {
		weekday: 'short',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	})
	return dateFormatter.format(date)
}
