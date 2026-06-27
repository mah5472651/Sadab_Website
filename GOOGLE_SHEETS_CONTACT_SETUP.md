# Google Sheets Contact Form Setup

The contact form posts to `/api/contact`. To connect it to the Google Sheet, create a Google Apps Script Web App and add its URL to Vercel as `GOOGLE_SHEETS_WEBHOOK_URL`.

Sheet ID:

```txt
18GT314uSKw1Lt4x87DB81_OE8JxCrbE9_PSjy0vzF80
```

Apps Script code:

```js
const SHEET_ID = "18GT314uSKw1Lt4x87DB81_OE8JxCrbE9_PSjy0vzF80";

function doPost(e) {
  const data = JSON.parse(e.postData.contents || "{}");
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];

  sheet.appendRow([
    new Date(),
    data.name || "",
    data.email || "",
    data.message || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Deploy:

1. Open the sheet.
2. Go to `Extensions > Apps Script`.
3. Paste the code above.
4. Click `Deploy > New deployment`.
5. Select `Web app`.
6. Set `Execute as` to `Me`.
7. Set `Who has access` to `Anyone`.
8. Copy the Web App URL.
9. Add it to Vercel environment variables as `GOOGLE_SHEETS_WEBHOOK_URL`.
10. Redeploy the site.
