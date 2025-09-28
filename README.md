### Instructions

When exporting JSON files, select the desired fields here **(note that VIN and daysOnMarket are required!)**

<img width="714" height="514" alt="image" src="https://github.com/user-attachments/assets/30681f01-291f-4e31-bf72-e73670faa0bf" />

Run the following command to diff the input files

```node diff-files.js {STARTING_FILE} {ENDING_FILE} {DAYS_ON_MARKET}```

```node diff-files.js export1.json export2.json 60```

The output will be rendered in a ```removedListings.json``` file
