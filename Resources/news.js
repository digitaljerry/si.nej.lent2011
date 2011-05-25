
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
	
	var xhr = Ti.Network.createHTTPClient();
	//xhr.open("GET","http://v2.0.news.tmg.s3.amazonaws.com/feeds/news.xml");
	xhr.open("GET","http://lent10.slovenija.net/index.php?id=1&type=100");
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
				
				//var thumbnails = item.getElementsByTagName("media:thumbnail");
				//if (thumbnails && thumbnails.length > 0)
				//{
					//var media = thumbnails.item(0).getAttribute("link");
					var title = item.getElementsByTagName("title").item(0).text;
					var row = Ti.UI.createTableViewRow({height:80});
					var label = Ti.UI.createLabel({
						text:title,
						left:72,
						top:5,
						bottom:5,
						right:5,
						color:'#576996',
						font:{fontSize:16,fontWeight:'bold', fontFamily:'Arial'}
					});
					row.add(label);
					/*var img;
					if (Titanium.Platform.name == 'android') 
					{
						// iphone moved to a single image property - android needs to do the same
						img = Ti.UI.createImageView({
							url:media,
							left:5,
							height:60,
							width:60
						});
	
					}
					else
					{
						img = Ti.UI.createImageView({
							image:media,
							left:5,
							height:60,
							width:60
						});
						
					}
					row.add(img);*/
					data[x++] = row;
					row.url = item.getElementsByTagName("link").item(0).text;
				//}
			}
			tableview = Titanium.UI.createTableView({data:data,backgroundColor:'transparent',selectedBackgroundColor:'#e9ddc2'});
			Titanium.UI.currentWindow.add(tableview);
			tableview.addEventListener('click',function(e)
			{
				var w = Ti.UI.createWindow({title:doctitle,barColor:'#004586',backgroundImage:'images/background_window.png'});
				var wb = Ti.UI.createWebView({url:e.row.url,backgroundColor:'transparent'});
				w.add(wb);
				var b = Titanium.UI.createButton({
					title:'Zapri',
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
	};
	xhr.send();
}

win.nextNavButton.addEventListener('click', function()
{	
	// reset
	tableview.data = null;
	data = new Array();
	
	fetchNews();
	
});

fetchNews();
