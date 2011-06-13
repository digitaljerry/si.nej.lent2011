Titanium.include ('../lang/'+Titanium.App.Properties.getString('locale')+'.js');
Titanium.include ('../model/settings.js');

//
// Load UI elements
//
Titanium.include ('../view/settings.js');
win = Titanium.UI.currentWindow;

view_init(win);

//
// Define functions
//

function addProperits() {
	
	// image
	
	win.l1 = Titanium.UI.createLabel({
		text:lang['search_show_images'],
		width:200,
		height:35,
		top:20,
		textAlign:'center',
		font:{fontSize:26},
	});
	win.add(win.l1);
	
	win.l2 = Titanium.UI.createLabel({
		text:lang['search_image_switch'],
		width:300,
		height:100,
		top:45,
		color:'#336699',
		textAlign:'center'
	});
	win.add(win.l2);
	
	win.imageSwitch = Titanium.UI.createSwitch({
		value:showImages,
		top:140
	});
	win.add(win.imageSwitch);
	
	// language
	
	win.l3 = Titanium.UI.createLabel({
		text:lang['search_language'],
		width:200,
		height:35,
		top:210,
		textAlign:'center',
		font:{fontSize:26},
	});
	win.add(win.l3);
	
	win.l4 = Titanium.UI.createLabel({
		text:lang['search_language_selection'],
		width:300,
		height:30,
		top:245,
		color:'#336699',
		textAlign:'center'
	});
	win.add(win.l4);
	
	win.langSwitch = Titanium.UI.createSwitch({
		value:true,
		top:290
	});
	//win.add(win.langSwitch);
	
	if (Titanium.Platform.name == 'iPhone OS') {
		win.tb = Titanium.UI.createTabbedBar({
			labels:['SI', 'EN'],
			top:290,
			style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
			height:30,
			width:200
		});
		if (Titanium.App.Properties.getString('locale') == 'sl')
			win.tb.index = 0;
		else
			win.tb.index = 1;
		win.add(win.tb);
	} else {
		// TODO
	}
	
}

addProperits();

//
// Define event listeners
//

win.imageSwitch.addEventListener('change',function(e)
{
	if (e.value == '1') {
		Titanium.App.Properties.setString('showImages', '1');
	} else {
		Titanium.App.Properties.setString('showImages', '0');
	}
});

if (Titanium.Platform.name == 'iPhone OS') {
	win.tb.addEventListener('click', function(e)
	{
		var prevLang = Titanium.App.Properties.getString('locale');
		if (e.index == '0') {
			Titanium.App.Properties.setString('locale', 'sl');
		} else {
			Titanium.App.Properties.setString('locale', 'en');
		}
		
		// restart needed
		if ( Titanium.App.Properties.getString != prevLang ) {
			Ti.App.fireEvent('restartApp', {});
		}
	});
} else {
	// TODO
}

