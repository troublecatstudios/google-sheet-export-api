const actions = {
  ping: () => {
    return {
      script_version: GetVersion()
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
