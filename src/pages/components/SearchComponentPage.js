var SearchComponentPage = function(){
	
	// Attributes
	this.searchTxt = element(by.model("autocomplete.query"));
	this.locationsList = element(by.id("list"));
	this.suggestedLocationToSelect;
	this.durationDatesBtn = element(by.xpath("//div[@id='autocomplete_wrapper']//span[@class='search_date_overlay ng-scope']"));
	
	// Function to check expected web elements to be displayed on page
	this.checkPage = function(){
		expect(this.searchTxt.isDisplayed()).toBe(true);
	};
	
	// Function to make a location search
	this.locationSearch = function(topicOfSearch, optionToSelect){
		// Provide topic of search
		this.searchTxt.sendKeys(topicOfSearch);
		
		// Click on suggestion
		this.setSuggestedLocationToSelect(optionToSelect);
		this.suggestedLocationToSelect.click();
		
		return this;
	}
	
	// Function to update location search
	this.updateLocationSearch = function(topicOfSearch, optionToSelect){
		// Update topic of search
		this.searchTxt.clear();	
		
		// Make new search
		return this.locationSearch(topicOfSearch, optionToSelect);
	};
	
	// Function to update the Suggested Location Web element based on the provided suggestion
	this.setSuggestedLocationToSelect = function(optionToSelect){
		this.suggestedLocationToSelect = element(by.xpath("//div[@id='auto_suggestions']//span[@selenium-suggestion='" + optionToSelect + "']"));
	};
	
	// Function to navigate to SelectDatesPage (to update the location dates)
	this.updateLocationDates = function(){
		this.durationDatesBtn.click();
	}
	
};

module.exports = SearchComponentPage;