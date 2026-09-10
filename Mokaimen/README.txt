FBS - Malfa Almokiamn Interest Landing Page
===========================================

Project shown on the page:
ملفي المكيمن السكني

Target Google Sheet file:
FBS-Malfa-Almokiamn

Files:
- index.html       Updated landing page.
- fbs-logo.png     FBS logo used by the page.
- Code.gs          Google Apps Script backend that writes to the target Google Sheet.

To activate the new Google Sheet connection:
1) Open the Google Apps Script project currently used by the landing page Web App URL.
2) Replace its Code.gs with the supplied Code.gs.
3) Deploy > Manage deployments > Edit > New version > Deploy.
4) Keep the existing Web App URL. The updated index.html already uses it.

Important:
The Google account running the Apps Script must have access to a UNIQUE Google Sheet file named exactly:
FBS-Malfa-Almokiamn

The script writes to the first tab in that spreadsheet and automatically creates these headers if the tab is empty:
التاريخ والوقت | الاسم الكامل | رقم الجوال | المشروع
