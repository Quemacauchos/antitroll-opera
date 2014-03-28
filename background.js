console.log("BACKGROUND--------------------");

chrome.tabs.onUpdated.addListener(showIcon);

// Show icon for page action in the current tab.
function showIcon(tabId, changeInfo, tab) {
    if (tab.url.indexOf('noticierodigital.com') > -1) {
        chrome.pageAction.show(tabId);
    }
};

// Message manager
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    switch(request.method){
    case 'load':
        var data = loadTrolls();
        sendResponse({'data': data});
        break;
    case 'save':
        var data = request.trolls;
        saveTrolls(data);
        sendResponse({});
        break;
    default:
        sendResponse({});
        break;
    }
});


//------------------------------------------------------------

function loadTrolls(){
    var trolls = localStorage['trolls'];
    if(!trolls){
        trolls = "anel,cindy nero,cirilo gonzalez,dina,drogba,el pemon,ladi llin,redkidneybeans,ruben rivero,sherk";
        localStorage['trolls'] = trolls;
    }
    return trolls;
}

function saveTrolls(trolls){
    localStorage['trolls'] = trolls;
}

// END