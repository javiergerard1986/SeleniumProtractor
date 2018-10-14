var data = require('../../testData.json');
var configData = require('../../configData.json');
var MainPage = require('../pages/MainPage.js');

describe('Protractor Training Scenarios:', function(){
	var mainPage;
	var selectDatesPage;
	var hotelResultsPage;
	var hotelDetailsPage;

	beforeEach(function(){
		mainPage = new MainPage();
		browser.get(configData.url);
		browser.manage().window().maximize();
	});
	
	it('TC1: Search for a hotel', function(){
	
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
	
	it('TC2: Update Search', function(){
		
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

	it('TC3: Sorting order verification', function(){
		
		// Check that user is on Home Page
		mainPage.checkPage();
		
		// Make location search
		selectDatesPage = mainPage.locationSearch(data.sortTopicOfSearch, data.sortSuggestedSearch);
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

	it('TC4: Filter result verification', function(){

		// Check that user is on Home Page
		mainPage.checkPage();
		
		// Make location search
		selectDatesPage = mainPage.locationSearch(data.filterTopicOfSearch, data.filterSuggestedSearch);
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

		// Filter hotels by brand
		hotelResultsPage.filterHotelsByBrand(data.filterBrand);

		// Check hotel names by specified brand option
		hotelResultsPage.checkHotelsByBrandFilter(data.filterBrand);
		
		// Filter hotels by rating
		hotelResultsPage.filterHotelsByRating(data.filterStarsRating, data.filterGuestRatingPercent);
		
		// Check specified hotel stars rating filter criteria
		hotelResultsPage.checkSelectedHotelStarsRatingCriteria(data.filterStarsRating);

		// Check specified guest percent rating filter criteria
		hotelResultsPage.checkSelectedGuestsPercentRatingCriteria(data.filterGuestRatingPercent);

	});
	
	it('TC5: View details of a hotel', function(){

		// Check that user is on Home Page
		mainPage.checkPage();
		
		// Make location search
		selectDatesPage = mainPage.locationSearch(data.updateTopicOfSearch, data.updateSuggestedSearch);
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

		// Click on first hotel name
		hotelDetailsPage = hotelResultsPage.clickOnSpecifiedHotelBasedOnProvidedPositionOnPage(data.hotelPositionToClick);

		// Check that user is on HotelDetails page
		hotelDetailsPage.checkPage();

		// Check that hotel address contains the name of the city provided as topic of search
		hotelDetailsPage.checkCityNameInHotelAddress(data.updateTopicOfSearch);

		// Click on Price tab
		hotelDetailsPage.clickOnSpecifiedPageTab(data.hotelDetailsTabToClick);

		// Check that Price tab is selected
		hotelDetailsPage.checkTabIsSelected(data.hotelDetailsTabToClick);

		// Check that lower price is presented as the first element on the Hotel Details page
		hotelDetailsPage.checkLowerPriceIsPresentedFirstElement();

		// Close Selected Hotel Details section
		hotelResultsPage = hotelDetailsPage.closeSelectedHotelDetailsSection();

		// Check that Hotel Details section is closed
		hotelResultsPage.checkHotelDetailsSectionIsClosed();

	});

});