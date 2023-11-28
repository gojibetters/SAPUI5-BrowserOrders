sap.ui.define([], () => {
	"use strict";

	const MAX_DAYS_FOR_IN_TIME = 7
	const MAX_DAYS_FOR_TOO_LATE = 14

	function _roundToTwo(value) {
		return Number(Number(value).toFixed(2))
	}

	function _formatAmount(value) {
		return new Intl.NumberFormat('en-DE').format(_roundToTwo(value))
	}

	function _multiplyTotalQuantity(unitPrice, Quantity) {
		return Number(unitPrice) * Quantity
	}

	return {
		formattedDateWithFullYear(date) {
			return new Date(date).toLocaleString('pt-BR', {
				dateStyle: 'short'
			})
		},

		formattedDateWithShortYear(date) {
			return new Date(date).toLocaleString('pt-BR', {
				year: '2-digit',
				month: '2-digit',
				day: '2-digit'
			})
		},

		textStatus(shippedDate, orderDate) {
			const daysOfShippedByOrdered = new Date(shippedDate - orderDate).getDate()


			if (daysOfShippedByOrdered <= MAX_DAYS_FOR_IN_TIME) {
				return "In time"
			}

			if (daysOfShippedByOrdered > MAX_DAYS_FOR_IN_TIME) {
				return "Urgent"
			}

			return "Too late"
		},

		textStatusColor(shippedDate, orderDate) {
			const daysOfShippedByOrdered = new Date(shippedDate - orderDate).getDate()


			if (daysOfShippedByOrdered <= MAX_DAYS_FOR_IN_TIME) {
				return "Success"
			}

			if (daysOfShippedByOrdered < MAX_DAYS_FOR_TOO_LATE) {
				return "Warning"
			}

			return "Error"
		},

		formatAmount(value) {
			return new Intl.NumberFormat({
				style: 'currency',
				currency: 'EUR',
			}).format(_roundToTwo(value))
		},

		multiplyAndFormatTotalQuantity(unitPrice, Quantity) {
			const multipliedValue = _multiplyTotalQuantity(unitPrice, Quantity)
			console.log('multipliedValue', multipliedValue)
			console.log(_formatAmount(multipliedValue))
			return _formatAmount(multipliedValue)
		},
	};
});