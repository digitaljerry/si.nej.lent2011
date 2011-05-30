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
		text:'Prikazuj slike',
		width:200,
		height:35,
		top:20,
		textAlign:'center',
		font:{fontSize:28},
	});
	win.add(win.l1);
	
	win.l2 = Titanium.UI.createLabel({
		text:'Če vam zadeva deluje počasi, izklopi prikazovanje slik in bo delala ko šus!',
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
		text:'Jezik',
		width:200,
		height:35,
		top:210,
		textAlign:'center',
		font:{fontSize:28},
	});
	win.add(win.l3);
	
	win.l4 = Titanium.UI.createLabel({
		text:'Izberi jezik, ki ga razumeš!',
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
	win.add(win.langSwitch);
	
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

