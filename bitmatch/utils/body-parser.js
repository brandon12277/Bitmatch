// middleware/bodyParser.js
import bodyParser from 'body-parser';


export const jsonParser = bodyParser.json();
export const urlEncodedParser = bodyParser.urlencoded({ extended: true });