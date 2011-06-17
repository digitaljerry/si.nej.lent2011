Titanium.include ('../lang/'+Titanium.App.Properties.getString('locale')+'.js');
Titanium.include ('../model/search.js');

//
// Load UI elements
//
Titanium.include ('../view/search.js');
var win = Titanium.UI.currentWindow;
view_init(win);

// sometimes the color is reseted when clicing the back button
// this is a quick fix for that
win.search.backgroundColor = '#1D327B';

//
// Define functions
//

// shows events for certain stage in the tableview of current win
function searchEvents(query) {
	
	if (Titanium.Network.online == false) {
		// fire connectivty problem event
		Ti.App.fireEvent('connectivityProblem');
		return;
	}
	
	win.services.activityIndicator.start();
	
	// reset
	win.tableview.data = null;
	data = new Array();
	
	var xhr = Titanium.Network.createHTTPClient();
	var geturl = 'http://' + Titanium.App.Properties.getString('domain') + '/index.php?eID=ag_lent_webservice&ag_lent_webservice[lang]='+lang['name']+'&ag_lent_webservice[action]=search&ag_lent_webservice[query]='+query;
	
	xhr.setTimeout(20000);
	xhr.open('GET', geturl, true);
	xhr.onerror = function(e)
	{
		// fire connectivty problem event
		Ti.App.fireEvent('connectivityProblem', {error:e});
	};
	
	xhr.onload = function(){
		incomingData = null;
		incomingData = JSON.parse(this.responseText);
		var i = 0;
		
		var prev_start_date = 'a long time ago';
		for (i = 0; i < incomingData.length; i++){
			
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
			
			var stage = incomingData[i].location;
			
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
			
			if ( win.services.categories.getCategoryTitle(incomingData[i].category_id) != -1 ) {
				if ( stage != '' )
					desc.text = stage + ', ' + win.services.categories.getCategoryTitle(incomingData[i].category_id);
				else
					desc.text = win.services.categories.getCategoryTitle(incomingData[i].category_id);
			}
			
			row.add(desc);
			
			var begin_time = Ti.UI.createLabel({
				color:'#222',
				font:{fontSize:19,fontWeight:'bold', fontFamily:'Arial'},
				right:10,
				top:11,
				height:30,
				width:50,
				text:win.services.dateLent.secondsToHm(incomingData[i].start_time)
			});
			if (Titanium.Platform.name != 'iPhone OS') {
				begin_time.right = 22;
				begin_time.top = 25;
			}
			row.add(begin_time);
			
			if ( incomingData[i].start_date != prev_start_date ) {
				row.header = win.services.dateLent.outputNiceDate(win.services.dateLent.date2object(incomingData[i].start_date));
				prev_start_date = incomingData[i].start_date;
			}
			
			row.hasChild = true;
			
			data.push(row);
		};
	
		win.tableview.data = data;
		
		// if there's no results
		if (i == 0) {
			Titanium.UI.createAlertDialog({message:lang['no_results'],buttonNames:[lang['close']]}).show();
		}
		
		win.services.activityIndicator.stop();
	};
	xhr.send();
}


//
// Define events
//

// opening the event detail view
win.tableview.addEventListener('click', function(e)
{
	if (e.rowData.event_uid == null)
		return;
	
	var winDetail = Titanium.UI.createWindow({
		url:'event.js',
		services: win.services
	});
	
	// passing the event uid
	winDetail.event_uid = e.rowData.event_uid;
	
	Titanium.UI.currentTab.open(winDetail,{animated:true});
});

win.search.addEventListener('return', function (e)
{
	if(e.value.length < 3) {
		Titanium.UI.createAlertDialog({message:'Vpiši vsaj 3 znake.',buttonNames:[lang['close']]}).show();
	} else {
		searchEvents(e.value);
		win.search.blur();
	}
});

win.search.addEventListener('cancel', function(e)
{
	win.search.blur();
});
