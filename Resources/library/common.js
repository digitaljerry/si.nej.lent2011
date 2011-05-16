
function DateLent() {
	
	//*** 'me' acts as an alias that can be used within the methods
	var me = this;
	
	//*** Public properties:
	this.someValue;
	this.someOtherValue;
	
	DateLent.prototype.outputDate = function(given_date,nice) {
		year = given_date.getFullYear().toString();
		month = (given_date.getMonth()+1).toString();
		day = given_date.getDate().toString();
		
		if (month.length < 2)
			month = '0'+month;
		if (day.length == 1)
			day = '0'+day;
		
		if (nice == true) {
			return day+'.'+month+'. ' + Ti.App.days[given_date.getDay()];
		} else {
			return year+month+day;
		}
	}
	
	DateLent.prototype.secondsToHm = function(d) {
		
		var tm=new Date(d*1000) 
		var hours=tm.getUTCHours();
		var minutes=tm.getUTCMinutes();
		
		if ( hours < 10 )
			hours = ' ' + hours;
		if ( minutes < 10 )
			minutes = '0' + minutes;
		
		return hours+':'+minutes;
	}

}

function Stages() {
	
	//*** Public methods:
    Stages.prototype.getStageTitle = function(uid) {
	    for (var i = 0; i < Ti.App.stages.length; i++) {
			if ( Ti.App.stages[i].uid == uid )
				return Ti.App.stages[i].name;
		}
		return 'Ostala prizorišča';
	};
	
	Stages.prototype.getStageLocation = function(uid) {
		var location_data;
		for (var i = 0; i < Ti.App.stages.length; i++) {
			if ( Ti.App.stages[i].uid == uid ) {
				location_data = [{"longitude":Ti.App.stages[i].longitude,"latitude":Ti.App.stages[i].latitude}];
				return location_data;
			}
		}
		return null;
	};
 	
}
