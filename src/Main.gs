
//+---------------------
//+ A C T I O N S
//+---------------------
// These are the methods that are invoked by the API requests
// 
const actions = {
  ping: () => {
    return {
      script_version: 2
    };
  },
  export: (e) => {
    var result = {
      sheets: {}
    };
    var userProperties = PropertiesService.getScriptProperties();
    var id = userProperties.getProperty('documentId');
    var spreadsheet = SpreadsheetApp.openById(id);
    var sheets = spreadsheet.getSheets();
    for (var i = 0; i < sheets.length; i++) {      
      var sheet = sheets[i];
      var sheetName = sheet.getName();
      if (sheetName === '_data') continue;
      var range = sheet.getDataRange();
      var values = range.getValues().filter(row => row[1] !== '#N/A');

      var colToKeyMap = [];
      var sheetDataItems = [];
      for(var row = 0; row < values.length; row++) {
        var item = {};
        for(var col = 0; col < values[row].length; col++) {
          var value = values[row][col];
          if (row === 0) {
            if (!value) continue;
            colToKeyMap.push(variablify(value));
            continue;
          }

          if (col >= colToKeyMap.length) continue;
          var key = colToKeyMap[col];
          item[key] = value;
        }
        if (row === 0) continue;
        sheetDataItems.push(item);
      }

      result.sheets[sheetName] = {
        fields: colToKeyMap,
        data: sheetDataItems
      };
    }
    return result;
  }
};





//+---------------------
//+ M A I N
//+---------------------
// The main entry points for the API.
//
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





//+---------------------
//+ U T I L I T I E S
//+---------------------
// Helper functions.
//
function variablify(name) {
  return name = name.replace(/\W/ig, '').replace(/\s/ig, '');
}
