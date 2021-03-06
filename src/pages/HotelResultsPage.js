var SearchComponentPage = require('./components/SearchComponentPage.js');
var UtilsPage = require('./utils/UtilsPage.js');
var HotelDetailsPage = require('./HotelDetailsPage.js');

var HotelResultsPage = function(){
	
	var SelectDatesPage = require('./SelectDatesPage.js');
	this.utils = new UtilsPage();
	
	// Attributes
	this.searchComponent = new SearchComponentPage();
	this.hotelsListDiv = element(by.id("list"));
	this.selectedSortOption = element(by.xpath("//ul[@class='sort_list ng-scope']//a//em"));
	this.priceBtnsList = element.all(by.xpath("//a[@class='btn btn-bookstyle']//span[@class='rate']"));
	this.brandDd = element(by.xpath("//a[contains(text(),'Brands')]"));
	this.hotelNamesLnkList = element.all(by.xpath("//div[@class='info_container']//a//span//span"));
	this.ratingDd = element(by.xpath("//a[contains(text(),'Rating')]"));
	this.hotelRatingSlider = element(by.xpath("//span[@class='slider hotel_classes ng-isolate-scope ng-scope ng-pristine ng-valid']//span[@class='pointer']"));
	this.guestRatingSlider = element(by.xpath("//span[@class='slider ng-isolate-scope ng-scope ng-pristine ng-valid']//span[@class='pointer']"));
	this.hotelRatingStarsList = element.all(by.xpath("//div[@class='info_container']//span[@class='hotel_class']//b"));
	this.hotelGuestPercentsList = element.all(by.xpath("//div[@class='info_container']//span[@class='ty_rating']")); 

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
		};
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

	// Function to filter hotels by specified brand
	this.filterHotelsByBrand = function(filterBrand){
		
		// Click on Brands filter drop down list
		this.brandDd.click();

		// Select specified brand option
		var brandToSelectElement =  element(by.xpath("//label[@class='serp_graphics']//span[text()='" + filterBrand + "']"));
		brandToSelectElement.click();

		// Close Brands filter drop down list
		this.brandDd.click();
	};

	// Function to check hotel names by specified brand option
	this.checkHotelsByBrandFilter = function(selectedFilterBrand){
		this.hotelNamesLnkList.getText().then(function(hotelNames){
			// Hotel Names validation
			for(let i = 0; i < hotelNames.length; i++){
				expect(hotelNames[i].startsWith(selectedFilterBrand)).toBe(true);
			}
		});
	}

	// Function to filter hotels by specified rating
	this.filterHotelsByRating = function(hotelRating, guestRating){
		// Defining slider movement variables to be used on rating filter
		var hotelRatingMovement;
		var guestRatingMovement;

		hotelRatingMovement = this.defineHotelRatingMovement(hotelRating);
		guestRatingMovement = this.defineGuestRatingMovement(guestRating);
		
		// Click on rating filter drop down list
		this.ratingDd.click();

		// Select hotel rating
		browser.actions().dragAndDrop(this.hotelRatingSlider,{x:hotelRatingMovement}).perform();

		// Select guest rating
		browser.actions().dragAndDrop(this.guestRatingSlider,{x:guestRatingMovement}).perform();
		
		// Close rating filters
		this.ratingDd.click();
	};

	// Function to define hotel rating movement on slider based on specified input option
	this.defineHotelRatingMovement = function(specifiedOption){
		var movement;

		switch(specifiedOption){
			case 1:
				movement = 50;
				break;
			case 2:
				movement = 100;
				break;
			case 3:
				movement = 150;
				break;
			case 4:
				movement = 200;
				break;
			case 5:
				movement = 250;
				break;		
		};
		return movement;
	};

	// Function to define guest rating movement on slider based on specified input option
	this.defineGuestRatingMovement = function(specifiedOption){
		var movement;

		switch(specifiedOption){
			case 10:
				movement = 20;
				break;
			case 20:
				movement = 41;
				break;
			case 30:
				movement = 65;
				break;
			case 40:
				movement = 80;
				break;
			case 50:
				movement = 115;
				break;
			case 60:
				movement = 135;
				break;
			case 70:
				movement = 155;
				break;
			case 80:
				movement = 180;
				break;
			case 90:
				movement = 201;
				break;
			case 100:
				movement = 225;
				break;			
		};
		return movement;
	};

	// Function to check specified hotel stars rating filter criteria
	this.checkSelectedHotelStarsRatingCriteria = function(selectedHotelStars){
		this.hotelRatingStarsList.getText().then(function(hotelStars){
			// Stars rating validation
			for(let i = 0; i < hotelStars.length; i++){
				let currentStars = parseInt(hotelStars[i]);
				expect(currentStars).not.toBeLessThan(selectedHotelStars);
			}
		});
	};

	// Function to check specified guests percent rating filter criteria
	this.checkSelectedGuestsPercentRatingCriteria = function(selectedGuestsPercent){
		this.hotelGuestPercentsList.getText().then(function(guestsPercents){
			// Guests percents rating validation
			for(let i = 0; i < guestsPercents.length; i++){
				let currentGuestPercent = parseInt(guestsPercents[i]);
				expect(currentGuestPercent).not.toBeLessThan(selectedGuestsPercent);
			}
		});
	};

	// Function to click on specified hotel position
	this.clickOnSpecifiedHotelBasedOnProvidedPositionOnPage = function(hotelPosition){
		this.hotelNamesLnkList.then(function(hotelNames){
			// Click on specified hotel by position
			hotelNames[hotelPosition].click();
		});
		return new HotelDetailsPage();
	};

	// Function to check that hotel details section is not present Hotel Results page
	this.checkHotelDetailsSectionIsClosed = function(){
		var sellAllAmenitiesLnk = element(by.xpath("//a[contains(text(),'See all amenities')]"));
		var readMoreLnk = element(by.xpath("//a[contains(text(),'Read more')]"));
		expect(browser.isElementPresent(sellAllAmenitiesLnk)).toBe(false);
		expect(browser.isElementPresent(readMoreLnk)).toBe(false);
	};

};

module.exports = HotelResultsPage;