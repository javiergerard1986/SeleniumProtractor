var SearchComponentPage = require('./components/SearchComponentPage.js');

var HotelDetailsPage = function(){
	
	var HotelResultsPage = require('./HotelResultsPage.js');
	
	// Attributes
	this.optionsLst = element.all(by.xpath("//div[@class='exp_card_tab_header']//a"));
	this.addressTxt = element(by.xpath("//div[@class='fact_entry clear ng-scope address']//div[@class='fact_content ng-scope']"));
	this.phoneNumberTxt = element(by.xpath("//div[@class='fact_entry clear ng-scope phone_number']//div[@class='fact_content ng-scope']"));
	this.detailsSection = element.all(by.xpath("//div[@class='hotel_desc collapsed_desc']//p"));
	this.amenitiesTxt = element(by.xpath("//h4[@class='amenities_title']"));
	this.totalPriceTxtLst = element.all(by.xpath("//tr[@class='exp_card_rate_wrapper ng-scope']//span[@class='exp_card_total_rate']"));
	this.closeDetailsBtn = element(by.xpath("//div[@class='exp_card_tab_header']//a[contains(text(),'Close')]"));

	// Function to check expected web elements to be displayed on page
	this.checkPage = function(){
		expect(this.optionsLst.isPresent()).toBe(true);
		expect(this.addressTxt.isPresent()).toBe(true);
		expect(this.phoneNumberTxt.isPresent()).toBe(true);
		expect(this.detailsSection.isPresent()).toBe(true);
		expect(this.amenitiesTxt.isPresent()).toBe(true);
	};

	// Function to check that hotel address contains the city that was the topic of search
	this.checkCityNameInHotelAddress = function(cityName){
		this.addressTxt.getText().then(function(text){
			expect(text).toContain(cityName);
		});
	};

	// Function to click on specified page tab
	this.clickOnSpecifiedPageTab = function(tabToClick){
		// Click on specified tab 
		var tabToClickElement = element(by.xpath("//div[@class='exp_card_tab_header']//a[contains(text(),'" + tabToClick + "')]"));
		tabToClickElement.click();
	};

	// Function to check that a specified tab is selected
	this.checkTabIsSelected = function(tabToCheck){
		var selectedTab = element(by.xpath("//div[@class='exp_card_tab_name_wrapper selected']//a"));
		selectedTab.getText().then(function(textToCheck){
			expect((textToCheck) === tabToCheck).toBe(true);
		}); 
	};

	// Function to check that lower price is the first element on page
	this.checkLowerPriceIsPresentedFirstElement = function(){
		this.totalPriceTxtLst.getText().then(function(prices){
			// Price Validation
			for(let i = 1; i < prices.length; i++){
				let previousPrice = parseInt(prices[i - 1].replace("$",""));
				let currentPrice = parseInt(prices[i].replace("$",""));
				expect(currentPrice).not.toBeLessThan(previousPrice);
			}});
	};

	// Function to close hotel details section
	this.closeSelectedHotelDetailsSection = function(){
		this.closeDetailsBtn.click();
		return new HotelResultsPage();
	};

};

module.exports = HotelDetailsPage;