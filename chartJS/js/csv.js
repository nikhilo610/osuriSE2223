// Parse the CSV data into the necessary arrays

async function getData(){
    const response = await fetch('../data/test.csv');
    const data = await response.text() // CSV in TEXT file
    //console.log(data);

    const table = data.split('\n').slice(1);
    console.log(table);
}