// first day of the festival
// 05 = june, 06=july
var datum = new Date(
				Titanium.App.Properties.getString('lentStartYear'),
				Titanium.App.Properties.getString('lentStartMonth') - 1,
				Titanium.App.Properties.getString('lentStartDay')
				);

var currentTime = new Date();
var current_month = currentTime.getMonth() + 1
var current_day = currentTime.getDate();
var current_year = currentTime.getFullYear();

// simulate a day for testig purpose
//current_month = 6;
//current_day = 28;
//current_year = 2011;
//currentTime = new Date(current_year,current_month-1,current_day);

// 05 = june, 06=july
var startDate = new Date(
				Titanium.App.Properties.getString('lentStartYear'),
				Titanium.App.Properties.getString('lentStartMonth') - 1,
				Titanium.App.Properties.getString('lentStartDay'),
				0,0,0
				);
var endDate = new Date(
				Titanium.App.Properties.getString('lentEndYear'),
				Titanium.App.Properties.getString('lentEndMonth') - 1,
				Titanium.App.Properties.getString('lentEndDay'),
				23,59,59
				);

// if the app is running on a day that the festival is actually happening
// set the date to show today's events
if ( currentTime <= endDate && currentTime >= startDate ) {
	datum = currentTime;
}

// date for the date picker
pickerDate = datum;
