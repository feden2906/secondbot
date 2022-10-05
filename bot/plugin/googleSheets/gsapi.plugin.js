require("dotenv").config();
const { google } = require("googleapis");

const scopes = ["https://www.googleapis.com/auth/spreadsheets"];


const auth = new google.auth.GoogleAuth({
    keyFile: "./bot/plugin/googleSheets/credentials.json",
    scopes: scopes,
    // scopes: "https://www.googleapis.com/auth/spreadsheets" //work too
});

// Create client instance for auth
const client = auth.getClient();

// Instance of Google Sheets API
const googleSheets = google.sheets({ version: "v4", auth: client });

// const spreadsheetId
const spreadsheetId = process.env.SPREADSHEET_ID;


// Write row(s) to spreadsheet
const insertResultSheets = async (teacher, userNick, userName, lesson, day, time, dayTimeData, currentDate) => {
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: `${teacher}!A:G`,
        valueInputOption: "USER_ENTERED",
        resource: {
            values: [[userNick, userName, lesson, day, time, dayTimeData, currentDate]],
        },
    });
}

module.exports = { insertResultSheets };