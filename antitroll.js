/* ANTITROLL */
console.log("ANTITROLL------------------");

var trolls;    // received on init from global page
var trollTopic = "Troll detectado y anulado.";
var isForum = false;
var isTopic = false;


function getForumTable(){
	var table  = null;
	var tables = document.getElementsByClassName("forumline");
	if(tables){
		table = tables[1];
	}
	return table;
}

function getTopicTable(){
	var table  = null;
	var tables = document.getElementsByClassName("forumline");
	if(tables){
		table = tables[1];
	}
	return table;
}

function getForumUserName(row){
	if(row.cells.length<3) return;
	var cell = row.cells[3];
	var name = "";
	try{
		if(cell.childNodes.length>0 && cell.childNodes[0].childNodes.length>0){
			name = cell.childNodes[0].childNodes[0].innerHTML;
		}
	} catch(ex){
		name = "";
	}
	return name;
}

function getTopicUserName(row){
	if(row.cells.length<1) return;
	var cell = row.cells[0];
	var name = "";
	try{
		if(cell.childNodes.length>0 && cell.childNodes[0].childNodes.length>0){
			name = cell.childNodes[0].childNodes[1].innerHTML;
		}
	} catch(ex){
		name = "";
	}
	return name;
}

function isTroll(name){
	if(trolls.indexOf(name.toLowerCase().trim()) > -1){ return true; }
	return false;
}

function hideForumTroll(row){
	try{
		row.className += " troll"; // color:#caa
		row.cells[0].innerHTML = "";
		row.cells[1].innerHTML = trollTopic;
		row.cells[2].innerHTML = "-";
		row.cells[3].innerHTML = "Troll";
		row.cells[4].innerHTML = "-";
		row.cells[5].innerHTML = "-";
		row.style.color = "#CCC";
	} catch(ex){}
}

function hideTopicTroll(row){
	try{
		row.className += " troll";
		row.cells[0].innerHTML = "Troll";
		row.cells[1].innerHTML = trollTopic;
		row.style.color = "#CCC";
	} catch(ex){}
}

function forumAntiTrolls(){
	var table = getForumTable();
	if(!table){ return; }

	var row;
	var name;
	var n = table.rows.length-1;
	for(var i=1; i<n; i++){
		row  = table.rows[i];
		name = getForumUserName(row);
		if(isTroll(name)){ hideForumTroll(row); }
	}
}

function topicAntiTrolls(){
	var table = getTopicTable();
	if(!table){ return; }

	var row;
	var name;
	var n = table.rows.length-1;
	for(var i=2; i<n; i=i+2){
		row  = table.rows[i];
		name = getTopicUserName(row);
		if(isTroll(name)){ hideTopicTroll(row); }
	}
}

function sendMessage(data,callback){
	if(!callback){ callback = function(data){}; }
	chrome.extension.sendRequest(data, function(response){ callback(response.data); });
}

function handleResponse(data){
	console.log("RESPONSE: "+data);
	if(data){
		trolls = data.split(",");
		if(isForum){ forumAntiTrolls(); }
		if(isTopic){ topicAntiTrolls(); }
	}
}

function initAntiTrolls(){
	if(document.baseURI.match(/noticierodigital.com\/forum\/viewforum/i)){
		isForum = true; 
		isTopic = false;
	}
	if(document.baseURI.match(/noticierodigital.com\/forum\/viewtopic/i)){
		isForum = false; 
		isTopic = true;
	}
	sendMessage({'method':'load'}, handleResponse);
}

initAntiTrolls();

// END