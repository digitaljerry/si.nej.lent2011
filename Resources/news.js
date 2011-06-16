Titanium.include ('lang/'+Titanium.App.Properties.getString('locale')+'.js');

// styling
var win = Titanium.UI.currentWindow;
win.backgroundColor = '#f1eddd';
win.backgroundImage = 'images/background_window.png';
win.barColor = '#004586';

// bottom wave bar
var view2 = Ti.UI.createView({
	backgroundImage: 'images/background_bottom.png',
	zIndex:11,
	width:'100%',
	height:9,
	bottom:0,
	left:0
});
win.add(view2);

win.nextNavButton = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.REFRESH
});
win.rightNavButton = win.nextNavButton;

// create table view data object
var data = [];

function fetchNews() {
	
	if (Titanium.Network.online == false) {
		// fire connectivty problem event
		Ti.App.fireEvent('connectivityProblem');
		return;
	}
	
	Ti.App.ActivityIndicator.start();
	
	var xhr = Ti.Network.createHTTPClient();
	xhr.open('GET','http://' + Titanium.App.Properties.getString('domain') + '/index.php?id=home&type=100&L='+lang['id'],true);
	
	xhr.onerror = function(e)
	{
		// fire connectivty problem event
		Ti.App.fireEvent('connectivityProblem', {error:e});
	};
	
	xhr.onload = function()
	{
		try
		{
			var doc = this.responseXML.documentElement;
			var items = doc.getElementsByTagName("item");
			var x = 0;
			var doctitle = doc.evaluate("//channel/title/text()").item(0).nodeValue;
			for (var c=0;c<items.length;c++)
			{
				var item = items.item(c);
				
				var title = item.getElementsByTagName("title").item(0).text;
				var date = item.getElementsByTagName("pubDate").item(0).text;
				var desc = item.getElementsByTagName("description").item(0).text;
				
				row = Ti.UI.createTableViewRow({
					height:80,
					selectedBackgroundColor:'#e9ddc2'
					});
				
				label_title = Ti.UI.createLabel({
					color:'#576996',
					font:{fontSize:16,fontWeight:'bold', fontFamily:'Arial'},
					left:10,
					top:2,
					height:30,
					width:'70%',
					text:title
				});
				row.add(label_title);
				
				label_desc = Ti.UI.createLabel({
					color:'#222',
					font:{fontSize:14,fontWeight:'normal', fontFamily:'Arial'},
					left:10,
					top:30,
					height:40,
					width:'70%',
					text:desc
				});
				row.add(label_desc);
				
				// we get: Wed, 11 May 2011 10:09:00 +0200
				// we need: 11 May
				date = date.substring(5,11);
				var label_date = Ti.UI.createLabel({
					color:'#222',
					font:{fontSize:19,fontWeight:'bold', fontFamily:'Arial'},
					right:10,
					top:25,
					height:30,
					width:70,
					text:date
				});
				row.add(label_date);
				
				// ++
				data[x++] = row;
				
				// adding mobile=1 to get the view intended for mobile devices 
				row.url = item.getElementsByTagName("link").item(0).text + '&mobile=1';
				row.nextTitle = title;
			}
			tableview = Titanium.UI.createTableView({data:data,backgroundColor:'transparent',selectedBackgroundColor:'#e9ddc2'});
			Titanium.UI.currentWindow.add(tableview);
			tableview.addEventListener('click',function(e)
			{
				var w = Ti.UI.createWindow({title:e.row.nextTitle,barColor:'#004586',backgroundImage:'images/background_window.png',exitOnClose: true});
				var wb = Ti.UI.createWebView({url:e.row.url,backgroundColor:'transparent'});
				w.add(wb);
				var b = Titanium.UI.createButton({
					title:lang['news_close'],
					style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN
				});
				w.setLeftNavButton(b);
				b.addEventListener('click',function()
				{
					w.close();
				});
				w.open({modal:true});
			});
		}
		catch(E)
		{
			alert(E);
		}
		
		Ti.App.ActivityIndicator.stop();
	};
	xhr.send();
}

function isSet( variable ) {
	return( typeof( variable ) != 'undefined' );
}

win.nextNavButton.addEventListener('click', function()
{	
	// reset
	if (typeof tableview !== 'undefined') {
		Titanium.UI.currentWindow.remove(tableview);
	}
	
	fetchNews();
});

fetchNews();
