function calculateTotalGuestsPerTable() {
    const guests = document.getElementById('guestInput').value;
    const numberOfTables = document.getElementById('tableInput').value;
    const guestsNumber = parseInt(guests); 
    const tablesNumber = parseInt(numberOfTables);

   const totalGuestsPerTable = Math.floor(guestsNumber/tablesNumber);
   const remainderGuests = guestsNumber % tablesNumber;
   const guestsDistribution = distributeGuests(totalGuestsPerTable, remainderGuests, tablesNumber);
    

    const result = {
        totalGuestsPerTable: totalGuestsPerTable,
        remainderGuests: remainderGuests, 
    };
    
    document.getElementById('totalGuestsPerTable').textContent = 'Total Guests Per Table: ' + result.totalGuestsPerTable.toFixed(0);
    document.getElementById('remainderGuests').textContent = 'Remainder Guests:'+ result.remainderGuests;
    document.getElementById('guestsDistribution').textContent = 'Guests Distribution:'+ guestsDistribution.join(',');

    const outputString = formatOutput (totalGuestsPerTable, guestsDistribution, guestsNumber);
    document.getElementById ('output').textContent = outputString;
}
    
function formatOutput(baseGuests, Distribution, guestsNumber) {
    const tableGroups = {};

    for (let i = 0; i < Distribution.length; i++) {
        const guestsAtTable = Math.floor(guestsNumber / Distribution.length) + (i < guestsNumber % Distribution.length ? 1 : 0);

        if (!tableGroups[guestsAtTable]) {
            tableGroups[guestsAtTable] = [];
        }

        tableGroups[guestsAtTable].push(`Table ${i + 1}`);
    }

    let outputString = `Your ${guestsNumber} guests will be seated as follows:`;

    for (const guestsAtTable in tableGroups) {
        const tables = tableGroups[guestsAtTable].length;
        outputString += `\n${tables} table${tables > 1 ? 's' : ''} of ${guestsAtTable},`;

    }

    return outputString;
}



function distributeGuests(baseGuests, remainder, numberOfTables){
    const Distribution = Array.from({length: numberOfTables},() => baseGuests);

    for (let i = 0; i< remainder; i++){
        Distribution[i % numberOfTables]++;
    }

    return Distribution;
}


