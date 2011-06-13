
function DateLent() {
	
	//*** 'me' acts as an alias that can be used within the methods
	var me = this;
	
	//*** Public properties:
	this.someValue;
	this.someOtherValue;
	
	DateLent.prototype.outputDate = function(given_date) {
		year = given_date.getFullYear().toString();
		month = (given_date.getMonth()+1).toString();
		day = given_date.getDate().toString();
		
		if (month.length < 2)
			month = '0'+month;
		if (day.length == 1)
			day = '0'+day;
		
		return year+month+day;
	}
	
	DateLent.prototype.outputNiceDate = function(given_date) {
		year = given_date.getFullYear().toString();
		month = (given_date.getMonth()+1).toString();
		day = given_date.getDate().toString();
		
		if (month.length < 2)
			month = '0'+month;
		if (day.length == 1)
			day = '0'+day;
		
		return day+'.'+month+'. ' + Ti.App.days[given_date.getDay()];
	}
	
	DateLent.prototype.outputShortDate = function(given_date) {
		year = given_date.getFullYear().toString();
		month = (given_date.getMonth()+1).toString();
		day = given_date.getDate().toString();
		
		if (month.length < 2)
			month = '0'+month;
		if (day.length == 1)
			day = '0'+day;
		
		return day+'.'+month+'.';
	}
	
	DateLent.prototype.date2object = function(given_date) {
		MD_Y = given_date.substring(0,4);
		MD_M = given_date.substring(4,6);
		MD_M=MD_M-1;	// Jan-Dec=00-11
		MD_D = given_date.substring(6,8);
		MD_hour=0;
		MD_minutes=0;
		MD_seconds=0;
		return new Date(MD_Y, MD_M, MD_D, MD_hour, MD_minutes, MD_seconds);
	}
	
	DateLent.prototype.datetime2object = function(given_date) {
		MD_Y = given_date.substring(0,4);
		MD_M = given_date.substring(4,6);
		MD_M=MD_M-1;	// Jan-Dec=00-11
		MD_D = given_date.substring(6,8);
		MD_hour = given_date.substring(9,11);;
		MD_minutes = given_date.substring(13,15);;;
		MD_seconds=0;
		return new Date(MD_Y, MD_M, MD_D, MD_hour, MD_minutes, MD_seconds);
	}
	
	DateLent.prototype.dateseconds2object = function(given_date,given_seconds) {
		MD_Y = given_date.substring(0,4);
		MD_M = given_date.substring(4,6);
		MD_M=MD_M-1;	// Jan-Dec=00-11
		MD_D = given_date.substring(6,8);
		
		var tm=new Date(given_seconds*1000) 
		var hours=tm.getUTCHours();
		var minutes=tm.getUTCMinutes();
		
		return new Date(MD_Y, MD_M, MD_D, hours, minutes, 0);
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
    	if ( uid == 0 )
    		return -1;
    		
    	// if uid == 30 then this is considered a location category of "other" stages
    	if ( uid == 30 )
    		return -1;
    	
    	if (stages[uid] != null)
    		return stages[uid].name;
    	else
    		return -1;
	};
	
	Stages.prototype.getStageLocation = function(uid) {
		if ( uid == 0 )
    		return -1;
    	if ( stages[uid] == null )
    		return -1;
    	
		location_data = [{"longitude":stages[uid].longitude,"latitude":stages[uid].latitude}];
		return location_data;
	};
	
	Stages.prototype.getStage = function(uid) {
    	return stages[uid];
	};
	
	Stages.prototype.getStages = function() {
		return stages;
	};
 	
}

function Categories() {
	
	//*** Public methods:
    Categories.prototype.getCategoryTitle = function(uid) {
    	if ( categories[uid] != null )
    		return categories[uid].title;
    	else
    		return -1;
	};
 	
}

function Message() {
	
	//*** Public methods:
	Message.prototype.showMessage = function(text) {
		messageLabel.text = text;
		messageWin.open();
		
		setTimeout(function()
		{
			messageWin.close({opacity:0,duration:1000});
		},1000);
	}
}

function ActivityIndicator() {
	
	//*** Public methods
	ActivityIndicator.prototype.start = function() {
		if (typeof actIndWin !== 'undefined') {
			actInd.show();
			actIndWin.open();
		}
	}
	ActivityIndicator.prototype.stop = function() {
		if (typeof actIndWin !== 'undefined') {
			actInd.hide();
			actIndWin.close();
		}
	}	
}
