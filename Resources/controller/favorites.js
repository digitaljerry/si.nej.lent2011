Titanium.include ('../model/favorites.js');

//
// Load UI elements
//

Titanium.include ('../view/favorites.js');
var win = Titanium.UI.currentWindow;
view_init(win);

function removeEvent(event_uid) {
	for (var i = 0; i < favoritesArray.length; i++) {
		if (favoritesArray[i].uid ==  event_uid) {
			favoritesArray.splice(i,1);        //delete one item at the i-th index.
			return;
		}
	}
}

//
// Define functions
//

function sortArray(listbox) {
 	var x, y, holder;
	// The Bubble Sort method.
	for(x = 0; x < listbox.length; x++) {
		for(y = 0; y < (listbox.length-1); y++) {
			if(Ti.App.DateLent.dateseconds2object(listbox[y].start_date, listbox[y].start_time) > Ti.App.DateLent.dateseconds2object(listbox[y+1].start_date, listbox[y+1].start_time)) {
				holder = listbox[y+1];
				listbox[y+1] = listbox[y];
				listbox[y] = holder;
			}
		}
	}
}

function refreshTable() {
	
	data = new Array();
	favoritesArray = Ti.App.Properties.getList('favoritesArray');
	
	if ( favoritesArray == null ) {
		Ti.App.Message.showMessage('Zaenkrat še nimate priljubljenih predstav.');
		return;
	}
	
	sortArray(favoritesArray);
	
	var prev_start_date = 'a long time ago';
	for (var i = 0; i < favoritesArray.length; i++) {
		
		var row = Ti.UI.createTableViewRow();
		row.selectedBackgroundColor = '#e9ddc2';
		row.height = 50;
		row.className = 'datarow';
		row.clickName = 'row';
		row.event_uid = favoritesArray[i].uid;
		
		var title = Ti.UI.createLabel({
			color:'#576996',
			font:{fontSize:16,fontWeight:'bold', fontFamily:'Arial'},
			left:10,
			top:2,
			height:30,
			width:'70%',
			event_uid:favoritesArray[i].uid,
			text:favoritesArray[i].title,
			title:favoritesArray[i].title
		});
		row.filter = title.text;
		row.add(title);
		
		var stage = Ti.App.Stages.getStageTitle(favoritesArray[i].location_id);
		if ( stage == -1 )
			stage = favoritesArray[i].location;
		var desc = Ti.UI.createLabel({
			color:'#222',
			font:{fontSize:14,fontWeight:'normal', fontFamily:'Arial'},
			left:10,
			top:25,
			height:25,
			width:'70%',
			event_uid:favoritesArray[i].uid,
			title:favoritesArray[i].title,
			text:stage
		});
		
		var catTitle = Ti.App.Categories.getCategoryTitle(favoritesArray[i].category_id);
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
			event_uid:favoritesArray[i].uid,
			title:favoritesArray[i].title,
			text:Ti.App.DateLent.secondsToHm(favoritesArray[i].start_time)
		});
		row.add(begin_time);
		
		if ( favoritesArray[i].start_date != prev_start_date ) {
			row.header = Ti.App.DateLent.outputNiceDate(Ti.App.DateLent.date2object(favoritesArray[i].start_date));
			prev_start_date = favoritesArray[i].start_date;
		}
		
		row.hasChild = true;
		
		data.push(row);
	};
	
	// refresing the table view
	win.tableview.data = data;
}


//
// Define events
//

// create table view event listener
win.tableview.addEventListener('click', function(e)
{
	var winDetail = Titanium.UI.createWindow({
		url:'event.js',
		title:e.source.title,
		cached:true,
		disableFav:true
	});
	
	// passing the event uid
	winDetail.event_uid = e.source.event_uid;
	
	Titanium.UI.currentTab.open(winDetail,{animated:true});
});

// events for buttons
win.edit.addEventListener('click', function()
{
	win.setRightNavButton(win.cancel);
	win.tableview.editing = true;
});

win.cancel.addEventListener('click', function()
{
	Ti.App.Properties.setList('favoritesArray',favoritesArray);
	
	win.setRightNavButton(win.edit);
	win.tableview.editing = false;
});


win.tableview.addEventListener('delete',function(e)
{
	removeEvent(e.source.event_uid);
	Ti.App.Properties.setList('favoritesArray',favoritesArray);
});

// can be triggered when a new event is added to favorites array
Titanium.App.addEventListener('refreshFavorites', function(eventData) {
  refreshTable();
});