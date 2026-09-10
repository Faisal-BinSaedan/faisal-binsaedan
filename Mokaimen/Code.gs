/*
  FBS Interest Landing Page -> Google Sheet
  Target Google Sheet file name: FBS-Malfa-Almokiamn

  Use this code in the SAME Google Apps Script project behind the Web App URL
  already used by index.html, then update/redeploy the Web App.
*/

const TARGET_SPREADSHEET_FILE = 'FBS-Malfa-Almokiamn';
const DEFAULT_PROJECT_NAME = 'ملفي المكيمن السكني';

function getTargetSpreadsheet_() {
  const files = DriveApp.getFilesByName(TARGET_SPREADSHEET_FILE);

  if (!files.hasNext()) {
    throw new Error('Google Sheet not found: ' + TARGET_SPREADSHEET_FILE);
  }

  const file = files.next();

  // Prevent accidentally writing to a second file with the same name.
  if (files.hasNext()) {
    throw new Error('More than one file named ' + TARGET_SPREADSHEET_FILE + ' was found. Please keep the name unique or use the Spreadsheet ID.');
  }

  return SpreadsheetApp.open(file);
}

function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Accept only the campaign this landing page is configured for.
    if (payload.sheetName && payload.sheetName !== TARGET_SPREADSHEET_FILE) {
      throw new Error('Invalid target sheet.');
    }

    const name = String(payload.refName || '').trim();
    const phone = String(payload.refPhone || '').replace(/\D/g, '');
    const project = String(payload.project || DEFAULT_PROJECT_NAME).trim();

    if (!name) throw new Error('Name is required.');
    if (!/^05\d{8}$/.test(phone)) throw new Error('Invalid Saudi mobile number.');

    const ss = getTargetSpreadsheet_();
    const sheet = ss.getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['التاريخ والوقت', 'الاسم الكامل', 'رقم الجوال', 'المشروع']);
      sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
    }

    sheet.appendRow([
      payload.timestamp ? new Date(payload.timestamp) : new Date(),
      name,
      phone,
      project
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err && err.message ? err.message : err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('FBS-Malfa-Almokiamn endpoint is running')
    .setMimeType(ContentService.MimeType.TEXT);
}
