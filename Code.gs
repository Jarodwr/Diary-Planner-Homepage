function doGet(e) {
  const userEmail = Session.getActiveUser().getEmail();
  return HtmlService.createTemplateFromFile('Index').evaluate();
}

function getUserEmail() {
  const userEmail = Session.getActiveUser().getEmail();
  return userEmail;
}

//{ year: string; dayNumber: number; text: string; }
function PutNotes(notes) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  for (const { year, dayNumber, text } of notes) {
    
    let dataSheet = ss.getSheetByName(year);
    if (!dataSheet) {
      dataSheet = ss.insertSheet();
      dataSheet.setName(year);
    }

    dataSheet.getRange(dayNumber, 1).setValue(text);
  }
  return "Success"
}

//{ year: string; dayNumber: number; }[]
function GetNotes(noteIds) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const noteLookup = {}

  for (const { year, dayNumber } of noteIds) {
    if (!noteLookup[year]) noteLookup[year] = {}
    const dataSheet = ss.getSheetByName(year);

    if (!dataSheet) continue;

    noteLookup[year][dayNumber] = dataSheet.getRange(dayNumber, 1).getValue();
  }

  return noteLookup;
}
