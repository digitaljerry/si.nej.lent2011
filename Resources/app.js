
// include "library" and initiating global objects
Titanium.include ('library/common.js');

// determine the language
if (!Titanium.App.Properties.getString('locale')) {
	Titanium.App.Properties.setString('locale','sl');
}
Titanium.include ('lang/'+Titanium.App.Properties.getString('locale')+'.js');

Ti.App.Message = new Message();
Ti.App.ActivityIndicator = new ActivityIndicator();
Ti.App.Stages = new Stages();
Ti.App.Categories = new Categories();
Ti.App.DateLent = new DateLent();

// if properties have not yet been set
if (Titanium.App.Properties.getString('showImages') == '') {
	Titanium.App.Properties.setString('showImages', '1');
}

// lent 2011 constants
Titanium.App.Properties.setString('domain', 'www.festival-lent.si');
Titanium.App.Properties.setInt('lentStartYear', 2011);
Titanium.App.Properties.setInt('lentStartMonth', 6);
Titanium.App.Properties.setInt('lentStartDay', 24);
Titanium.App.Properties.setInt('lentEndYear', 2011);
Titanium.App.Properties.setInt('lentEndMonth', 7);
Titanium.App.Properties.setInt('lentEndDay', 9);

// array that has favorites events which are stored on the phone
favoritesArray = Ti.App.Properties.getList('favoritesArray');

// include main controller
Titanium.include ('controller/main.js');

// MESSAGE WIN

var messageWin = Titanium.UI.createWindow({
	height:30,
	width:250,
	bottom:70,
	borderRadius:10,
	touchEnabled:false,

	orientationModes : [
	Titanium.UI.PORTRAIT,
	Titanium.UI.UPSIDE_PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT,
	]
});
var messageView = Titanium.UI.createView({
	id:'messageview',
	height:30,
	width:250,
	borderRadius:10,
	backgroundColor:'#000',
	opacity:0.7,
	touchEnabled:false
});

var messageLabel = Titanium.UI.createLabel({
	id:'messagelabel',
	text:'',
	color:'#fff',
	width:250,
	height:'auto',
	font:{
		fontFamily:'Helvetica Neue',
		fontSize:13
	},
	textAlign:'center'
});
messageWin.add(messageView);
messageWin.add(messageLabel);

// ACTIVITY INDICATOR

var actIndWin = Titanium.UI.createWindow({
	height:30,
	width:210,
	bottom:70,
	borderRadius:10,
	touchEnabled:false,

	orientationModes : [
	Titanium.UI.PORTRAIT,
	Titanium.UI.UPSIDE_PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT,
	]
});

var actIndView = Titanium.UI.createView({
	id:'actindview',
	height:30,
	width:210,
	borderRadius:10,
	backgroundColor:'#000',
	opacity:0.7,
	touchEnabled:false
});

var actInd = Titanium.UI.createActivityIndicator({
	bottom:0, 
	height:30,
	width:210,
	style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN,
	font:{fontFamily:'Helvetica Neue', fontSize:15,fontWeight:'bold'},
	color:'white',
	message: lang['loading']
});

actInd.show();
actIndView.add(actInd);
actIndWin.add(actIndView); 

//
// GLOBAL EVENT LISTENER
//

Titanium.App.addEventListener('changeLoadingLabel', function(e) {
	actInd.message = e.loading;
});
