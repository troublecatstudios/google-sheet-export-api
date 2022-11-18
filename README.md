# google-sheet-export-api
A Google AppScript project that allows a google sheet to be downloaded as JSON via a HTTP request.

## Installation

| | |
|-|-|
| ![image](https://user-images.githubusercontent.com/176476/202724621-ea140514-07a8-4703-b6b5-9abe3ddcf9aa.png) | In your spreadsheet, click on `Extensions -> Apps Script`. |
| | Add each of the files in this repository to the Apps Script project. |
| ![image](https://user-images.githubusercontent.com/176476/202725424-7df630c6-16d4-43ff-ba6c-1ad82c39d7a4.png) | Under the `Project Settings` section, add a new script property named `documentId`. The value for this property should be the text in the URL for your spreadsheet that comes after `https://docs.google.com/spreadsheets/d/` and before `/edit`. For example, if my spreadsheet url was `https://docs.google.com/spreadsheets/d/1-Gifdf3aVrtfd3U8Z7_Ysf3dsf2fh2AaPw9o/edit#gid=0` then `documentId` should be set to `1-Gifdf3aVrtfd3U8Z7_Ysf3dsf2fh2AaPw9o`. |
| ![image](https://user-images.githubusercontent.com/176476/202725990-0e7f1e3d-bd9b-4659-802e-765c43c2de97.png) | Click on `Deploy -> New Deployment`. |
| ![image](https://user-images.githubusercontent.com/176476/202726621-1cc64dce-3dc1-43b9-a5e1-8bd83b5d5c85.png) | You should see a screen similar to this one. Your API URL will be shown under "Web app". Your google sheet export API is now live! |
