var date_day = 10;
var date_month = 7;
var date_year = 2010;
var date = new Date( date_year, date_month, date_day );

// data from:
//http://lent10.slovenija.net/index.php?eID=tx_mnmysql2json_Table&tx_mnmysql2json[action]=getTable&tx_mnmysql2json[tableName]=tx_cal_event&tx_mnmysql2json[orderBy]=location_id&tx_mnmysql2json[fields]=uid,title,start_date,end_date,start_time,end_time,category_id,location,location_id&&tx_mnmysql2json[where]=sys_language_uid=0%20AND%20hidden=0%20AND%20deleted=0%20AND%20start_date=20100625
var events = [
{"uid":"1","title":"BOWLING","start_date":"20100625","end_date":"20100625","start_time":"46800","end_time":"64800","category_id":"1","location":"KOLOSEJ","location_id":"0"},
{"uid":"8","title":"PIHALNI ORKESTER KUD POŠTA MARIBOR","start_date":"20100625","end_date":"20100625","start_time":"69300","end_time":"0","category_id":"1","location":"LENT PROMENADA","location_id":"0"},
{"uid":"7","title":"TANGO NUEVO","start_date":"20100625","end_date":"20100625","start_time":"70200","end_time":"0","category_id":"1","location":"ODER ART KAMP","location_id":"0"},
{"uid":"6","title":"Peter Andrej: REGE ALI ŽABJE FRKE","start_date":"20100625","end_date":"20100625","start_time":"64800","end_time":"0","category_id":"2","location":"ODER PARK DOŽIVETIJ","location_id":"0"},
{"uid":"5","title":"ZVOK IZ GLOBIN","start_date":"20100625","end_date":"20100625","start_time":"61200","end_time":"0","category_id":"1","location":"ODER ART KAMP","location_id":"0"},
{"uid":"3","title":"WAKEBOARDING SHOW MARIBOR 2010","start_date":"20100625","end_date":"20100625","start_time":"57600","end_time":"72000","category_id":"1","location":"DRAVA KOLOSEJ","location_id":"0"},
{"uid":"17","title":"Andrej Jelaždin: AGENCIJA ZA LOČITVE","start_date":"20100625","end_date":"20100625","start_time":"79200","end_time":"0","category_id":"2","location":"","location_id":"2"},
{"uid":"23","title":"SPRING ORCHESTRA (SLO, HUN)","start_date":"20100625","end_date":"20100625","start_time":"79200","end_time":"0","category_id":"1","location":"JAZZLENT JAM","location_id":"4"},
{"uid":"15","title":"TABU NEGATIVE TWO","start_date":"20100625","end_date":"20100625","start_time":"79200","end_time":"0","category_id":"2","location":"","location_id":"5"},
{"uid":"11","title":"JEBE'LA CESTA","start_date":"20100625","end_date":"20100625","start_time":"72900","end_time":"0","category_id":"1","location":"","location_id":"6"},
{"uid":"20","title":"GAL GJURIN: NOČNI LET","start_date":"20100625","end_date":"20100625","start_time":"82800","end_time":"0","category_id":"1","location":"","location_id":"7"},
{"uid":"13","title":"FAKE ORCHESTRA","start_date":"20100625","end_date":"20100625","start_time":"75600","end_time":"0","category_id":"1","location":"","location_id":"7"},
{"uid":"16","title":"TADEJ TOŠ V ŽIVO!!","start_date":"20100625","end_date":"20100625","start_time":"79200","end_time":"0","category_id":"1","location":"","location_id":"10"},
{"uid":"10","title":"OTVORITEV FOTOGRAFSKE RAZSTAVE RE:START","start_date":"20100625","end_date":"20100625","start_time":"72000","end_time":"0","category_id":"1","location":"","location_id":"11"},
{"uid":"21","title":"REPETITOR (SRB)","start_date":"20100625","end_date":"20100625","start_time":"82800","end_time":"0","category_id":"2","location":"","location_id":"11"},
{"uid":"12","title":"LANGA","start_date":"20100625","end_date":"20100625","start_time":"75600","end_time":"0","category_id":"1","location":"","location_id":"17"},
{"uid":"19","title":"RSI BAND","start_date":"20100625","end_date":"20100625","start_time":"81000","end_time":"0","category_id":"1","location":"","location_id":"18"},
{"uid":"856","title":"ALYA","start_date":"20100625","end_date":"20100625","start_time":"82800","end_time":"0","category_id":"1","location":"","location_id":"19"},
{"uid":"14","title":"PERPETUUM JAZZILE","start_date":"20100625","end_date":"20100625","start_time":"77400","end_time":"0","category_id":"2","location":"","location_id":"20"},
{"uid":"2","title":"ART KAMP & PARK DOŽIVETIJ","start_date":"20100625","end_date":"20100625","start_time":"57600","end_time":"72000","category_id":"2","location":"","location_id":"26"},
{"uid":"9","title":"PIHALNI ORKESTER SREDNJE GLASBENE IN BALETNE ŠOLE MARIBOR","start_date":"20100625","end_date":"20100625","start_time":"72000","end_time":"0","category_id":"1","location":"","location_id":"29"}
];

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

