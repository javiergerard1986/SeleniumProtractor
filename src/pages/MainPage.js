var SearchComponentPage = require('./components/SearchComponentPage.js');
var SelectDatesPage = require('./SelectDatesPage.js');

var MainPage = function(){
	
	// Attributes
	this.searchComponent = new SearchComponentPage();
	this.hamburgerBtn = element(by.xpath("//a[@log-action='Hamburger']"));
	this.hotelLogoImg = element(by.css('[ng-click="CancelInstantSearch()"]'));
	this.searchBtn = element(by.css('[ng-click="SearchDefault()"]'));
	this.firstOption = element(by.xpath(".//*[@id='auto_suggestions']/div[1]"));
	this.footerSection = element(by.xpath("//div[contains(text(),'© 2018 Room 77, Inc.')]"));
	
	// Function to make location search
	this.locationSearch = function(topicOfSearch, optionToSelect){
		this.searchComponent = this.searchComponent.locationSearch(topicOfSearch, optionToSelect);
		return new SelectDatesPage();
	};
	
	// Function to check expected web elements to be displayed on page
	this.checkPage = function(){
		this.searchComponent.checkPage();
		expect(this.hamburgerBtn.isDisplayed()).toBe(true);
		expect(this.hotelLogoImg.isDisplayed()).toBe(true);
		expect(this.searchBtn.isDisplayed()).toBe(true);
		expect(this.footerSection.isDisplayed()).toBe(true);
	};

};

module.exports = MainPage;