var data = require('../../testData.json');
var MainPage = require('../pages/MainPage.js');

describe('Protractor Training Scenarios:', function(){
	var mainPage = new MainPage();
	var selectDatesPage;
	var hotelResultsPage;
	/*
	it('Search for a hotel', function(){
	
		// Check that user is on Home Page
		mainPage.checkPage();
		
		// Make location search
		selectDatesPage = mainPage.locationSearch(data.topicOfSearch, data.suggestedSearch);
		selectDatesPage.checkPage();
		selectDatesPage.checkInDateIsSelected();
		
		// Select check in date
		selectDatesPage.selectFromDate(data.daysToAddToFromDate);
		selectDatesPage.checkFromDateSelected();

		// Select check out date
		selectDatesPage.selectToDate(data.daysToAddToToDate);
		selectDatesPage.checkToDateSelected();
		
		// Select guests and rooms
		selectDatesPage.selectGuestsNumber(data.guestsNumber);
		selectDatesPage.selectRoomsNumber(data.roomsNumber);
		
		// Make location + selected dates search
		hotelResultsPage = selectDatesPage.locationWithDatesSearch();
		
		// Check that user is on HotelResults page
		hotelResultsPage.checkPage();
		
	});
	
	it('Update Search', function(){
		
		// Check that user is on Home Page
		mainPage.checkPage();
		
		// Make location search
		selectDatesPage = mainPage.locationSearch(data.topicOfSearch, data.suggestedSearch);
		selectDatesPage.checkPage();
		selectDatesPage.checkInDateIsSelected();
		
		// Select check in date
		selectDatesPage.selectFromDate(data.daysToAddToFromDate);
		selectDatesPage.checkFromDateSelected();

		// Select check out date
		selectDatesPage.selectToDate(data.daysToAddToToDate);
		selectDatesPage.checkToDateSelected();
		
		// Select guests and rooms
		selectDatesPage.selectGuestsNumber(data.guestsNumber);
		selectDatesPage.selectRoomsNumber(data.roomsNumber);
		
		// Make location + selected dates search
		hotelResultsPage = selectDatesPage.locationWithDatesSearch();
		
		// Check that user is on HotelResults page
		hotelResultsPage.checkPage();

		// Update Location search
		hotelResultsPage.updateLocationSearch(data.updateTopicOfSearch, data.updateSuggestedSearch);
		
		// Confirm previously selected dates
		selectDatesPage = hotelResultsPage.navigateToUpdateLocationDates();
		selectDatesPage.selectupdateLocationDates(data.monthsToUpdate, data.daysToAddToFromDate, data.daysToAddToToDate);

		// Check that "Update Search" text is present on Search button
		selectDatesPage.checkWordOnSearchButtonIsPresent("Update Search");
		
		// Make updated search
		hotelResultsPage = selectDatesPage.makeUpdatedSearch();
		
		// Check that hotels list is displayed on page
		hotelResultsPage.checkPage();
		
	});
	*/
	
	it('Sorting order verification', function(){
		
		// Check that user is on Home Page
		mainPage.checkPage();
		
		// Make location search
		selectDatesPage = mainPage.locationSearch(data.topicOfSearch, data.suggestedSearch);
		selectDatesPage.checkPage();
		selectDatesPage.checkInDateIsSelected();
		
		// Select check in date
		selectDatesPage.selectFromDate(data.daysToAddToFromDate);
		selectDatesPage.checkFromDateSelected();

		// Select check out date
		selectDatesPage.selectToDate(data.daysToAddToToDate);
		selectDatesPage.checkToDateSelected();
		
		// Select guests and rooms
		selectDatesPage.selectGuestsNumber(data.guestsNumber);
		selectDatesPage.selectRoomsNumber(data.roomsNumber);
		
		// Make location + selected dates search
		hotelResultsPage = selectDatesPage.locationWithDatesSearch();
		
		// Check that user is on HotelResults page
		hotelResultsPage.checkPage();
		
		// Check that default order selection is "Relevance"
		hotelResultsPage.checkDefaultOrder(data.defaultSortOption);
		
		// Sort hotels by specified option
		hotelResultsPage.sortHotelsByOption(data.sortHotelsByOption);
		
		// Check hotel results sorting by specified sort option
		hotelResultsPage.checkHotelResultsSortingBySpecifiedOption(data.sortHotelsByOption);
		
	});
	
});
	
