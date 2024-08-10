const fs = require("fs");
const path = require("path");

// Define the placeholder and the environment variable to replace it with
const placeholder = "http://localhost:8000";
const replacement = process.env.API_URL;

console.log("Replacing api url");
console.log({ placeholder, replacement });

// Specify the file to process
const filePath = path.join(__dirname, "api.js");
let content = fs.readFileSync(filePath, "utf8");
content = content.replace(new RegExp(placeholder, "g"), replacement);
fs.writeFileSync(filePath, content, "utf8");
console.log(`Replaced placeholder in ${filePath}`);
