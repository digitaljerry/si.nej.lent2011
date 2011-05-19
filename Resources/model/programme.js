// first day of the festival
// 05 = june, 06=july
var datum = new Date(2010, 5, 25);

var currentTime = new Date();
var current_month = currentTime.getMonth() + 1
var current_day = currentTime.getDate();
var current_year = currentTime.getFullYear();

// simulate a day for testig purpose
//current_month = 7;
//current_day = 10;
//current_year = 2010;
//currentTime = new Date(current_year,current_month-1,current_day);

// 05 = june, 06=july
var startDate = new Date(2010,5,25);
var endDate = new Date(2010,6,10);

// if the app is running on a day that the festival is actually happening
// set the date to show today's events
if ( currentTime <= endDate && currentTime >= startDate ) {
	datum = currentTime;
}
