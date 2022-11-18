function GetVersion() {
  return 2;
}

function doPost(e)
{
  return doGet(e);
}

function doGet(e) {
  var result, action;
  if (!e || !e.parameters || !e.parameters.action) {
    action = "ping";
  } else {
    action = e.parameters.action.toString();
  }

  var result = actions[action](e);
  var json = JSON.stringify(result, null, 2);
  return ContentService.createTextOutput(json.toString()).setMimeType(ContentService.MimeType.JSON);
}
