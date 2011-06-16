Titanium.include ('../lang/'+Titanium.App.Properties.getString('locale')+'.js');
Titanium.include ('../model/programme.js');

//
// Load UI elements
//

Titanium.include ('../view/programme.js');
var win = Titanium.UI.currentWindow;
view_init(win);

//
// Define functions
//

function showEventsForDay(showDate) {
	
	if (Titanium.Network.online == false) {
		// fire connectivty problem event
		Ti.App.fireEvent('connectivityProblem');
		return;
	}
	
	Ti.App.ActivityIndicator.start();
	
	// reset
	win.tableview.data = null;
	data = new Array();
	
	var xhr = Titanium.Network.createHTTPClient();
	var geturl = 'http://' + Titanium.App.Properties.getString('domain') + '/index.php?eID=ag_lent_webservice&ag_lent_webservice[lang]='+lang['name']+'&ag_lent_webservice[action]=getDayEvents&ag_lent_webservice[date]='+showDate;
	
	xhr.setTimeout(20000);
	xhr.open('GET', geturl, true);
	xhr.onerror = function(e)
	{
		// fire connectivty problem event
		Ti.App.fireEvent('connectivityProblem', {myData:e.error});
	};
	
	xhr.onload = function(){
		incomingData = null;
		incomingData = JSON.parse(this.responseText);
		
		updateNavButtons();
		
		var prev_location_id = -1;
		for (var i = 0; i < incomingData.length; i++) {
			
			var row = Ti.UI.createTableViewRow();
			row.selectedBackgroundColor = '#e9ddc2';
			row.backgroundSelectedColor = '#e9ddc2';
			row.height = 50;
			if (Titanium.Platform.name != 'iPhone OS') {
				row.height = 80;
			}
			
			row.className = 'datarow';
			row.clickName = 'row';
			row.event_uid = incomingData[i].uid;
			row.row_title = incomingData[i].title;
			
			var title = Ti.UI.createLabel({
				color:'#576996',
				font:{fontSize:16,fontWeight:'bold', fontFamily:'Arial'},
				left:10,
				top:2,
				height:30,
				width:'70%',
				text:incomingData[i].title
			});
			if (Titanium.Platform.name != 'iPhone OS') {
				title.height = 40;
			}
			
			row.filter = title.text;
			row.add(title);
			
			var stage = Ti.App.Stages.getStageTitle(incomingData[i].location_id);
			
			if ( stage == -1 )
				stage = incomingData[i].location;
			
			var desc = Ti.UI.createLabel({
				color:'#222',
				font:{fontSize:14,fontWeight:'normal', fontFamily:'Arial'},
				left:10,
				top:25,
				height:25,
				width:'70%',
				text:stage
			});
			if (Titanium.Platform.name != 'iPhone OS') {
				desc.top = 40;
				desc.height = 35;
			}
			
			var catTitle = Ti.App.Categories.getCategoryTitle(incomingData[i].category_id);
			if (catTitle != -1)
				desc.text = stage + ', ' + catTitle;
			
			row.add(desc);
			
			var begin_time = Ti.UI.createLabel({
				color:'#222',
				font:{fontSize:19,fontWeight:'bold', fontFamily:'Arial'},
				right:10,
				top:11,
				height:30,
				width:50,
				text:Ti.App.DateLent.secondsToHm(incomingData[i].start_time)
			});
			if (Titanium.Platform.name != 'iPhone OS') {
				begin_time.right = 22;
				begin_time.top = 25;
			}
			
			row.add(begin_time);
			
			row.hasChild = true;
			
			data.push(row);
		};
		
		win.tableview.data = data;
		
		Ti.App.ActivityIndicator.stop();
	};
	xhr.send();
}

function getPrevDay(oldDate) {
	return new Date(oldDate.getTime() - (1000 * 60 * 60 * 24));
}

function getNextDay(oldDate) {
	return new Date(oldDate.getTime() + (1000 * 60 * 60 * 24));
}

function updateNavButtons() {
	
	var prevDate = getPrevDay(datum);
	var nextDate = getNextDay(datum);
	
	if ( prevDate < startDate ) {
		win.imagePrev.hide();
	} else {
		win.imagePrev.show();
	}
		
	if ( nextDate > endDate ) {
		win.imageNext.hide();
	} else {
		win.imageNext.show();
	}
}

function getTitle() {
	
	var month = datum.getMonth() + 1;
	var day = datum.getDate();
	var year = datum.getFullYear();
	
	// it is today!
	if ( current_day == day && current_month == month && current_year == year ) {
		return lang['today'];
	}
	
	return Ti.App.DateLent.outputNiceDate(datum);
}

//
// Define events
//

// create table view event listener
win.tableview.addEventListener('click', function(e)
{
	if (e.rowData.event_uid == null)
		return;
	
	var winDetail = Titanium.UI.createWindow({
		url:'event.js'
	});
	
	// passing the event uid
	winDetail.event_uid = e.rowData.event_uid;
	
	Titanium.UI.currentTab.open(winDetail,{animated:true});
});

// events for buttons
win.imagePrev.addEventListener('click', function()
{
	datum = getPrevDay(datum);
	win.labelDate.text = getTitle(datum);
	showEventsForDay(Ti.App.DateLent.outputDate(datum));
});
win.imageNext.addEventListener('click', function()
{	
	datum = getNextDay(datum);
	win.labelDate.text = getTitle(datum);
	showEventsForDay(Ti.App.DateLent.outputDate(datum));
});
win.searchNavButton.addEventListener('click', function(e)
{
	var winSearch = Titanium.UI.createWindow({
		url:'search.js',
		title:lang['search']
	});
	Titanium.UI.currentTab.open(winSearch,{animated:true});
});

win.labelDate.addEventListener('click', function(e)
{
	pickerDate = datum;
	win.tableview.hide();
	win.pickerBackground.show();
	win.picker.value = datum;
	win.picker.show();
	win.b.show();
});
win.b.addEventListener('click', function(e)
{
	datum = pickerDate;
	win.labelDate.text = getTitle(datum);
	showEventsForDay(Ti.App.DateLent.outputDate(datum));
	
	win.picker.hide();
	win.b.hide();
	win.pickerBackground.hide();
	win.tableview.show();
});

win.picker.addEventListener('change',function(e)
{
	pickerDate = e.value;
});

if (Titanium.Platform.name != 'iPhone OS') {
	
	activity = Ti.Android.currentActivity;
	activity.onCreateOptionsMenu = function(e) {
	    var menu = e.menu;
	    var menuItem_search = menu.add({ title: lang['search'] });
	    menuItem_search.addEventListener("click", function(e) {
	        var winSearch = Titanium.UI.createWindow({
				url:'search.js',
				title:lang['search']
			});
			Titanium.UI.currentTab.open(winSearch,{animated:true});
	    });
	    var menuItem_exit = menu.add({ title: lang['exit'] });
	    menuItem_exit.addEventListener("click", function(e) {
	    	Ti.App.fireEvent('exitApp');
	    });
	};
	
}


