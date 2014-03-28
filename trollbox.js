
// Troll box
var textArea     = document.getElementById("trollbox");
var buttonSave   = document.getElementById("buttonsave");
var buttonCancel = document.getElementById("buttoncancel");


buttonSave.addEventListener('click', function onClick(event) {
    var text   = textArea.value.trim();
    var trolls = text.replace(/(\r\n|\n|\r)/gm,",").toLowerCase();
    trolls     = trolls.split(',').sort();
    // Trim trailing spaces
    var n      = trolls.length;
    var i      = 0;
    for(i=0; i<n; i++){ trolls[i] = trolls[i].trim(); }
    trolls = trolls.join(',');
    sendMessage({'method':'save', 'trolls':trolls});
    window.close();
}, false);

buttonCancel.addEventListener('click', function onClick(event) {
    sendMessage({'method':'cancel'});
    window.close();
}, false);

function sendMessage(data,callback){
	if(!callback){ callback = function(data){}; }
	chrome.extension.sendRequest(data, function(response){ callback(response.data); });
}

// On ready set focus on edit box
function showTrolls(names){
	console.log(names);
	var trolls = names.split(",").join("\n");
	textArea.value = trolls;
	textArea.focus();
}

function initTrollbox(){
	console.log("TROLLBOX----------");
	sendMessage({'method':'load'}, showTrolls);
}

initTrollbox();

// END