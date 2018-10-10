var UtilsPage = require('./utils/UtilsPage.js');
var SearchComponentPage = require('./components/SearchComponentPage.js');
var HotelResultsPage = require('./HotelResultsPage.js');

var SelectDatesPage = function(){
	
	// Attributes
	this.utils = new UtilsPage();
	this.searchComponent = new SearchComponentPage();
	this.checkInBtn = element(by.xpath("//div[@class='date_link' and contains(text(),'Check-in')]"));
	this.checkOutBtn = element(by.xpath("//div[@class='date_link' and contains(text(),'Check-out')]"));
	this.guestsDd = element(by.model("params.num_guests"));
	this.roomsDd = element(by.model("params.num_rooms"));
	this.aaaRb = element(by.model("params.special_rates.aaa"));
	this.fromDateCalendar = element(by.xpath("//div[@class='calendar_month ng-scope left']"));
	this.fromDateMonthYearTxt = element(by.xpath("//div[@class='calendar_month ng-scope left']//caption"));
	this.toDateCalendar = element(by.xpath("//div[@class='calendar_month ng-scope right']"));
	this.selectedFromDate = element(by.xpath("//td[@class='today date_enabled']"));
	this.fromNextMonthBtn = element(by.css(".next_month"));
	this.fromPreviousMonthBtn = element(by.css(".previous_month"));
	this.searchBtn = element(by.xpath("//div[@class='search_button btn']//span"));
	
	// Variables to be used
	let currentDate = this.utils.getTodayDate();
	let fromDate;
	let toDate;
	
	// Function to check expected web elements to be displayed on page
	this.checkPage = function(){
		this.searchComponent.checkPage();
		expect(this.checkInBtn.isDisplayed()).toBe(true);
		expect(this.checkOutBtn.isDisplayed()).toBe(true);
		expect(this.guestsDd.isDisplayed()).toBe(true);
		expect(this.roomsDd.isDisplayed()).toBe(true);
		expect(this.fromDateCalendar.isDisplayed()).toBe(true);
		expect(this.toDateCalendar.isDisplayed()).toBe(true);
		expect(this.fromNextMonthBtn.isDisplayed()).toBe(true);	
	};
	
	// Function to check elements to be displayed on page when check in date must be selected
	this.checkInDateIsSelected = function(){
		this.checkInBtn.getText().then(function(btnText){
			expect(btnText).toContain("Select ");
		});
		
		expect(this.checkOutBtn.isDisplayed()).toBe(true);
	};
	
	// Function to check elements to be displayed on page when check out date must be selected
	this.checkOutDateIsSelected = function(){
		expect(this.checkInBtn.isDisplayed()).toBe(true);
		
		this.checkOutBtn.getText().then(function(btnText){
			expect(btnText).toContain("Select ");
		});
	};
	
	// Function to select From date
	this.selectFromDate = function(daysToAddToFromDate){
		// Setting from date
		fromDate = this.utils.todayPlusProvidedNumberOfDays(currentDate, daysToAddToFromDate);

		// If from date is in next month, then click on from next month button
		if(currentDate.getMonth() < fromDate.getMonth()){
			this.fromNextMonthBtn.click();
		}
		
		// Click on from date
		this.clickOnFromDateBtn(fromDate);
	};
	
	// Function to click on the From date button
	this.clickOnFromDateBtn = function(fromDate){
		fromDateElement = element(by.xpath("//div[@class='calendar_month ng-scope left']//td[text()='" + fromDate.getDate() + "']"));
		fromDateElement.click();
	};
	
	// Function to check data on page once From date is selected
	this.checkFromDateSelected = function(){
		// Check that from date is selected in the from calendar
		let selectedPopulatedDate = element(by.xpath("//td[@class='date_selected_start draggable' and text()='" + fromDate.getDate() + "']"));
		expect(selectedPopulatedDate.isPresent()).toBe(true);
		
		// Check that Check in section and checkout sections has the proper highlight selection
		this.checkOutDateIsSelected();
	};
	
	// Function to select To date
	this.selectToDate = function(daysToAddToToDate){
		// Set To date
		toDate = this.utils.todayPlusProvidedNumberOfDays(fromDate, daysToAddToToDate);
		
		// Define calendar where the to date will be selected
		if(toDate.getMonth() === currentDate.getMonth()){
			// Click on to date from left calendar
			this.clickOnFromDateBtn(toDate);
		}else{
			// Click on to date from right calendar
			this.clickOnToDateBtn(toDate);
		}
		
	};
	
	// Function to click on the To date button
	this.clickOnToDateBtn = function(toDate){
		let toDateElement = element(by.xpath("//div[@class='calendar_month ng-scope right']//td[text()='" + toDate.getDate() + "']"));
		toDateElement.click();
	};
	
	// Function to check data on page once To date is selected
	this.checkToDateSelected = function(){
		let toDatePopulated = element(by.xpath("//td[@class='date_selected_end draggable' and text()='" + toDate.getDate() + "']"));
		expect(toDatePopulated.isPresent()).toBe(true);
		expect(toDatePopulated.getText()).toEqual(toDate.getDate().toString());
	};
	
	// Function to select guests number
	this.selectGuestsNumber = function(guestsNumber){
		this.guestsDd.sendKeys(guestsNumber);
	};
	
	// Function to select rooms number
	this.selectRoomsNumber = function(roomsNumber){
		this.roomsDd.sendKeys(roomsNumber);
	};
	
	// Function to click on search button once location and from/to dates were selected
	this.locationWithDatesSearch = function(){
		this.searchBtn.click();
		return new HotelResultsPage();
	};
	
	// Function to update location dates
	this.selectupdateLocationDates = function(monthsToUpdate, daysToAddToFromDate, daysToAddToToDate){
		
		// Update dates that will be selected
		fromDate = this.utils.todayPlusProvidedNumberOfDays(currentDate, daysToAddToFromDate);
		fromDate = this.utils.addMonthsToCurrentDate(fromDate, monthsToUpdate);
		toDate = this.utils.todayPlusProvidedNumberOfDays(fromDate, daysToAddToToDate);
		
		// Add specified numbers of months to from date
		var step;
		for (step = 0; step < monthsToUpdate; step++) {
			this.fromNextMonthBtn.click();
		}

		// Select From date and check that From date is selected
		this.clickOnFromDateBtn(fromDate);

		// Select To date and check that To date is selected
		this.clickOnToDateBtn(toDate);

	};
	
	// Function to check that an specified word is present on the search button
	this.checkWordOnSearchButtonIsPresent = function(wordToSearch){
		expect(this.searchBtn.getText()).toEqual(wordToSearch);
	};
	
	// Function to make updated search
	this.makeUpdatedSearch = function (){
		this.searchBtn.click();
		return new HotelResultsPage();
	};
	
};

module.exports = SelectDatesPage;