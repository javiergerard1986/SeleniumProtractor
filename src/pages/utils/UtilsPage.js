var UtilsPage = function(){
	
	// Function to get today date
	this.getTodayDate = function(){
		return new Date();
	};
	
	// Function to add provided number of days to a specified date
	this.todayPlusProvidedNumberOfDays = function(dateToIncrement, daysToAdd){
		var dateToReturn = new Date(dateToIncrement);
		dateToReturn.setDate(dateToReturn.getDate() + daysToAdd);
		return dateToReturn;
	};
	
	// Function to add specified months to current day
	this.addMonthsToCurrentDate = function(dateToIncrement, monthsToAdd){
		var dateToReturn = new Date(dateToIncrement);
		dateToReturn.setMonth(dateToReturn.getMonth() + monthsToAdd);
		return dateToReturn;
	};
	
};

module.exports = UtilsPage;