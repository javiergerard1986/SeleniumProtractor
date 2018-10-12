var SearchComponentPage = require('./components/SearchComponentPage.js');
var UtilsPage = require('./utils/UtilsPage.js');

var HotelResultsPage = function(){
	
	var SelectDatesPage = require('./SelectDatesPage.js');
	this.utils = new UtilsPage();
	
	// Attributes
	this.searchComponent = new SearchComponentPage();
	this.hotelsListDiv = element(by.id("list"));
	this.selectedSortOption = element(by.xpath("//ul[@class='sort_list ng-scope']//a//em"));
	this.priceBtnsList = element.all(by.xpath("//a[@class='btn btn-bookstyle']//span[@class='rate']"));
	this.ratingDd = element(by.xpath("//a[contains(text(),'Rating')]"));
	
	// Function to check expected web elements to be displayed on page
	this.checkPage = function(){
		this.searchComponent.checkPage();
		expect(this.hotelsListDiv.isDisplayed()).toBe(true);
	};
	
	// Function to update and make location search
	this.updateLocationSearch = function(topicOfSearch, optionToSelect){
		this.searchComponent.updateLocationSearch(topicOfSearch, optionToSelect);
	};
	
	// Function to navigate to the update (select dates) page
	this.navigateToUpdateLocationDates = function(){
		this.searchComponent = this.searchComponent.updateLocationDates();
		return new SelectDatesPage();
	};
	
	// Function to check default sort order
	this.checkDefaultOrder = function(defaultSortOption){
		expect(this.selectedSortOption.getText()).toEqual(defaultSortOption);
	};
	
	// Function to sort hotels by specified option
	this.sortHotelsByOption = function(specifiedSortOption){
		// Click specified sort order option
		this.selectedSortOption.click();
		let sortOptionElement = element(by.xpath("//div[@class='clear sorting_wrap']//ul[@class='sort_list ng-scope']//li//a[@class='sorter' and text() = '" + specifiedSortOption + "']"));
		sortOptionElement.click();
	};
	
	// Function to check hotel results sorting by specified sort option
	this.checkHotelResultsSortingBySpecifiedOption = function(specifiedSortOption){
		// Depending on selected sort option the system will select the proper sort criteria validation
		switch(specifiedSortOption){
			case "Price":
				this.checkHotelsSortByPrice();
				break;
		}
	};
	
	// Function to check hotel results by price sort option
	this.checkHotelsSortByPrice = function(){
	
		// Price validation will start on 2 item. This is cause the page is displaying an offer in the first position that does not match with the price sort
		this.priceBtnsList.getText().then(function(prices){
			// Price Validation
			for(let i = 2; i < prices.length; i++){
				let previousPrice = parseInt(prices[i - 1].replace("$",""));
				let currentPrice = parseInt(prices[i].replace("$",""));
				
				expect(currentPrice).not.toBeLessThan(previousPrice);
				
			}});
	};

	// Function to filter hotels by specified rating
	this.filterHotelsByRating = function(hotelRating, guestRating){
		// Click specified filter option
		this.ratingDd.click();
		let ra = element(by.xpath("//span[@step='1']"));
		ra.click();
	};

};

module.exports = HotelResultsPage;