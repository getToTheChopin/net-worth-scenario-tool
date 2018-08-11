let startAgesc1 = 0;
let startValuesc1 = 0;
let annualSavingssc1 = 0;
let annualReturnsc1 = 0;

let startAgesc2 = 0;
let startValuesc2 = 0;
let annualSavingssc2 = 0;
let annualReturnsc2 = 0;

let lowerStartAge = 0;
let numberYearsNetWorth = 0;

let netWorthTableDiv = document.querySelector('#netWorthTableDiv');

let ageArray = [];
let sc1Array = [];
let sc2Array = [];
let differenceArray = [];

initValues();
addInputEventListeners();
generateNetWorthArrays();
createNetWorthTable();

function initValues() {

    startAgesc1 = Number(document.getElementById('startAgesc1').value);
    startValuesc1 = Number(document.getElementById('startValuesc1').value);
    annualSavingssc1 = Number(document.getElementById('annualSavingssc1').value);
    annualReturnsc1 = Number(document.getElementById('annualReturnsc1').value) / 100;
    
    startAgesc2 = Number(document.getElementById('startAgesc2').value);
    startValuesc2 = Number(document.getElementById('startValuesc2').value);
    annualSavingssc2 = Number(document.getElementById('annualSavingssc2').value);
    annualReturnsc2 = Number(document.getElementById('annualReturnsc2').value) / 100;
    
    lowerStartAge = 0;
    if(startAgesc1 <= startAgesc2) {
        lowerStartAge = startAgesc1;
    } else {
        lowerStartAge = startAgesc2;
    }
    
    numberYearsNetWorth = Number(document.getElementById('numberYearsNetWorth').value);
    
    ageArray = [];
    sc1Array = [];
    sc2Array = [];
    differenceArray = [];

}

function addInputEventListeners() {
    let inputFields = document.getElementsByClassName("netWorthInputField");

    for(i=0;i<inputFields.length;i++) {

        console.log("add listener");

        inputFields[i].addEventListener('change',refreshNetWorthCalcs, false);
    }
}

function refreshNetWorthCalcs() {
    console.log("refresh net worth calcs");

    let table = document.getElementById("netWorthTable");
    table.parentNode.removeChild(table);
    initValues();
    generateNetWorthArrays();
    createNetWorthTable();

}

function createNetWorthTable() {

    let netWorthTable = document.createElement('table');
    netWorthTable.classList.add("netWorthTable");
    netWorthTable.setAttribute('id',"netWorthTable");        

    
    //Add header row with titles
    let netWorthTable1 = document.createElement('tr');
    
    let netWorthTable1a = document.createElement('th');
    let netWorthTable1b = document.createElement('th');
    let netWorthTable1c = document.createElement('th');
    let netWorthTable1d = document.createElement('th');


    netWorthTable1a.textContent = "Age";
    netWorthTable1b.textContent = "Scenario #1";
    netWorthTable1c.textContent = "Scenario #2";
    netWorthTable1d.textContent = "Difference";


    netWorthTable1.appendChild(netWorthTable1a);
    netWorthTable1.appendChild(netWorthTable1b);
    netWorthTable1.appendChild(netWorthTable1c);
    netWorthTable1.appendChild(netWorthTable1d);

    netWorthTable.appendChild(netWorthTable1);

    for(i=0; i<=numberYearsNetWorth; i++) {

        console.log("add table row");

        let tableRow = document.createElement('tr');
        tableRow.classList.add("tableRow");
        tableRow.setAttribute('id','row'+(i+1));        
        netWorthTable.appendChild(tableRow);

        let numberOfCol = 4;

        for(j=0; j<numberOfCol; j++) {

            console.log("add table data");

            let tableCell = document.createElement('td');
            tableCell.classList.add("tableCell");
            tableCell.setAttribute('id','row'+(i+1)+'col'+(j+1));        
            tableRow.appendChild(tableCell);

            if(j === 0) {
                tableCell.innerHTML = ageArray[i]; 
            }

            else if(j === 1) {
                tableCell.innerHTML = "$"+Math.round(sc1Array[i]).toLocaleString(); 
            }

            else if(j === 2) {
                tableCell.innerHTML = "$"+Math.round(sc2Array[i]).toLocaleString(); 
            }

            else if(j === 3) {
                tableCell.innerHTML = "$"+Math.round(differenceArray[i]).toLocaleString(); 
            }

        }
    }
    
    netWorthTableDiv.appendChild(netWorthTable);

}

function generateNetWorthArrays () {


    for(i=0;i<=numberYearsNetWorth;i++) {

        let currentAge = lowerStartAge + i;
        
        ageArray[i] = currentAge;

        if(currentAge<startAgesc1) {
            sc1Array[i] = 0;
        } else if(currentAge === startAgesc1) {
            sc1Array[i] = startValuesc1;
        } else {
            sc1Array[i] = sc1Array[i-1] + sc1Array[i-1] * annualReturnsc1 + annualSavingssc1;
        }

        if(currentAge<startAgesc2) {
            sc2Array[i] = 0;
        } else if(currentAge === startAgesc2) {
            sc2Array[i] = startValuesc2;
        } else {
            sc2Array[i] = sc2Array[i-1] + sc2Array[i-1] * annualReturnsc2 + annualSavingssc2;
        }

        differenceArray[i] = sc1Array[i] - sc2Array[i];
    }

}