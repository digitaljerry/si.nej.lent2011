
// define the UI elements
function view_init(win) {
	
	win.backgroundColor = '#fff';
	
	win.label1 = Titanium.UI.createLabel({
		color:'#999',
		text:'Nalagam...',
		font:{fontSize:20,fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:'auto'
	});
	win.add(win.label1);
	
	data = new Array();
	
	// CREATE TABLE VIEW
	win.tableview = Titanium.UI.createTableView({
		editable:true
	});
	
	// adding rows
	refreshTable();
	
	// create buttons
	win.edit = Titanium.UI.createButton({
		title:'Uredi'
	});
	
	win.cancel = Titanium.UI.createButton({
		title:'Konec',
		style:Titanium.UI.iPhone.SystemButtonStyle.DONE
	});
	
	win.setRightNavButton(win.edit);
	
	win.add(win.tableview);
}
