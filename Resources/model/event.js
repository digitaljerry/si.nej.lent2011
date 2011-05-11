
event_uid = Titanium.UI.currentWindow.event_uid;

// not cool!! Will have to do something with this!
// TODO
var stages = [
{"uid":"1","name":"SNG Maribor ","street":"SNG Maribor ","zip":"2000","city":"Maribor","longitude":"15.643866","latitude":"46.5597013"},
{"uid":"2","name":"Oder Rotovž","street":"Oder Rotovž","zip":"2000","city":"Maribor","longitude":"15.6454968","latitude":"46.5581373"},
{"uid":"4","name":"Jazzlent","street":"Jazzlent","zip":"2000","city":"Maribor","longitude":"15.6532024","latitude":"46.536221"},
{"uid":"5","name":"Večerov oder","street":"Večerov oder","zip":"2000","city":"Maribor","longitude":"15.6435441","latitude":"46.5566618"},
{"uid":"6","name":"Jurčkov oder","street":"Jurčkov oder","zip":"2000","city":"Maribor","longitude":"15.6532024","latitude":"46.536221"},
{"uid":"7","name":"Sodni stolp","street":"Sodni stolp","zip":"2000","city":"Maribor","longitude":"15.6410336","latitude":"46.5568684"},
{"uid":"10","name":"Naskov dvorec","street":"Zlati Lev","zip":"2000","city":"Maribor","longitude":"15.6363344","latitude":"46.558698"},
{"uid":"11","name":"Mladinin oder","street":"Mladinin oder","zip":"2000","city":"Maribor","longitude":"15.6415486","latitude":"46.5572815"},
{"uid":"15","name":"Glavni trg ","street":"Glavni trg ","zip":"2000","city":"Maribor","longitude":"15.6459971","latitude":"46.557332"},
{"uid":"16","name":"Grajski trg ","street":"Grajski trg ","zip":"2000","city":"Maribor","longitude":"15.6478955","latitude":"46.5599862"},
{"uid":"17","name":"Kavarna Kavajo ","street":"Kavarna Kavajo ","zip":"2000","city":"Maribor","longitude":"15.6456685","latitude":"46.5535631"},
{"uid":"18","name":"Klub KGB ","street":"Klub KGB ","zip":"2000","city":"Maribor","longitude":"15.641849","latitude":"46.5577537"},
{"uid":"19","name":"KMŠ oder","street":"KMŠ oder","zip":"2000","city":"Maribor","longitude":"15.6361842","latitude":"46.5580488"},
{"uid":"20","name":" Glavni oder na Dravi","street":"Glavni oder na Dravi","zip":"2000","city":"Maribor","longitude":"15.6532024","latitude":"46.536221"},
{"uid":"23","name":"Sinagoga","street":"Sinagoga","zip":"2000","city":"Maribor","longitude":"15.6477284","latitude":"46.5567356"},
{"uid":"26","name":"Mestni park","street":"Mestni park","zip":"2000","city":"Maribor","longitude":"15.6471276","latitude":"46.5657354"},
{"uid":"27","name":"Trg generala Maistra ","street":"Trg generala Maistra ","zip":"2000","city":"Maribor","longitude":"15.6490588","latitude":"46.561575"},
{"uid":"28","name":"Trg Svobode ","street":"Trg Svobode","zip":"2000","city":"Maribor","longitude":"15.6491661","latitude":"46.560557"},
{"uid":"29","name":"Dvorana Union","street":"Dvorana Union","zip":"2000","city":"Maribor","longitude":"15.6532024","latitude":"46.536221"}
];
function getStageTitle(uid) {
	for (var i = 0; i < stages.length; i++) {
		if ( stages[i].uid == uid )
			return stages[i].name;
	}
	return 'Ostala prizorišča';
}
function getStageLocation(uid) {
	var location_data;
	for (var i = 0; i < stages.length; i++) {
		if ( stages[i].uid == uid ) {
			location_data = [{"longitude":stages[i].longitude,"latitude":stages[i].latitude}];
			return location_data;
		}
	}
	return null;
}
// testing
var maribor = {latitude:46.55964925,longitude:15.646033,latitudeDelta:0.013, longitudeDelta:0.013};
