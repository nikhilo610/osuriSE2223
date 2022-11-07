// Parse the CSV data into the necessary arrays

async function getData(){
    const response = await fetch('../data/ZonAnn.TS+dSST.csv');
    const data = await response.text() // CSV in TEXT file
    //console.log(data);

    const table = data.split('\n').slice(1); // split by line and remove the 0th row

    table.forEach(row => {  // operate on each row
        const columns = row.split(','); // split the row into columns
        const year = columns[0]; // get the year
        const temp = columns[1]; // temp deviation
        const nhTemp = columns[2]; // northern hemisphere temp
        const shTemp = columns[3]; // southern hemisphere temp
        console.log(year, temp, nhTemp, shTemp);
    })
}

getData();