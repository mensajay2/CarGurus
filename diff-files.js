#!/usr/bin/env node

const fs = require("fs");

// Get the starting file from the 3rd argument
const START_FILE = process.argv[2];
// Get the ending file from the 4th argument
const END_FILE = process.argv[3];
// Get the max days on market from 5th argument
const DAYS_ON_MARKET_LIMIT = process.argv[4] || 60; // Only show results on market less than or equal to 60 days


if (!START_FILE || !END_FILE) {
  console.error("Missing required file parameters");
  console.error("Usage: node diff-files.js <starting_file> <ending_file> <max_days_on_market>");
  process.exit(1);
}

let startData = [];
let endData = [];
let removedListings = []; // Listing in file 1 that is not present in file 2

// Read start/base file
try {
  const data = fs.readFileSync(START_FILE, "utf8");
  startData = JSON.parse(data).filter((carEntry) => carEntry.daysOnMarket <= DAYS_ON_MARKET_LIMIT);
} catch (err) {
  console.error("Error reading or parsing file:", err);
}

// Read end/diff file
// Read start/base file
try {
  const data = fs.readFileSync(END_FILE, "utf8");
  endData = JSON.parse(data);
} catch (err) {
  console.error("Error reading or parsing file:", err);
}

console.log(`${START_FILE} has ${startData.length} entries that have been on the market less than ${DAYS_ON_MARKET_LIMIT} days`);
console.log(`${END_FILE} has ${endData.length} total entries`);

// Check if all VIN number objects are present 
const carEntryMatch = (entry1, entry2) => entry1.vin === entry2.vin;

startData.forEach(entry1 => {
  //console.log(`\n${entry1.vin} - ${entry1.makeName} - ${entry1.modelName}`);
  const entryIsPresent = endData.some((entry2) => carEntryMatch(entry1, entry2))
  if(!entryIsPresent){
    removedListings.push(entry1);
  }
});

console.log(`${removedListings.length} listings were removed`);
fs.writeFileSync('removedListings.json', JSON.stringify(removedListings, null, 4));