sap.ui.define([], () => {
	"use strict";

	const MAX_DAYS_FOR_IN_TIME = 7
	const MAX_DAYS_FOR_TOO_LATE = 14

	return {
		formattedShippedDate(date) {
      return new Date(date).toLocaleString('pt-BR', {
				dateStyle: 'short'
			})
		},

		formattedOrderDate(date) {
			return new Date(date).toLocaleString('pt-BR', {
				year:'2-digit',
				month:'2-digit',
				day:'2-digit'
			})
		},

		textStatus (shippedDate, orderDate) {
			const daysOfShippedByOrdered = new Date(shippedDate - orderDate).getDate()


			if (daysOfShippedByOrdered <= MAX_DAYS_FOR_IN_TIME) {
				return "In time"
			}

			if (daysOfShippedByOrdered > MAX_DAYS_FOR_IN_TIME && daysOfShippedByOrdered < MAX_DAYS_FOR_TOO_LATE) {
				return "Urgent"
			}

			if (daysOfShippedByOrdered >= MAX_DAYS_FOR_TOO_LATE){
				return "Too late"
			}
		},

		textStatusColor (shippedDate, orderDate) {
			const daysOfShippedByOrdered = new Date(shippedDate - orderDate).getDate()


			if (daysOfShippedByOrdered <= MAX_DAYS_FOR_IN_TIME) {
				return "Success"
			}

			if (daysOfShippedByOrdered > MAX_DAYS_FOR_IN_TIME && daysOfShippedByOrdered < MAX_DAYS_FOR_TOO_LATE) {
				return "Warning"
			}

			if (daysOfShippedByOrdered >= MAX_DAYS_FOR_TOO_LATE){
				return "Error"
			}
		}
	};
});