let startAgeSc1 = 0;
let startValueSc1 = 0;
let annualSavingsSc1 = 0;
let annualReturnSc1 = 0;

let startAgeSc2 = 0;
let startValueSc2 = 0;
let annualSavingsSc2 = 0;
let annualReturnSc2 = 0;

let p2startAgeSc1 = 0;
let p2annualSavingsSc1 = 0;
let p2annualReturnSc1 = 0;

let p2startAgeSc2 = 0;
let p2annualSavingsSc2 = 0;
let p2annualReturnSc2 = 0;

let lumpSum1AgeSc1 = 0;
let lumpSum1AgeSc2 = 0;
let lumpSum1AmountSc1 = 0;
let lumpSum1AmountSc2 = 0;
let lumpSum2AgeSc1 = 0;
let lumpSum2AgeSc2 = 0;
let lumpSum2AmountSc1 = 0;
let lumpSum2AmountSc2 = 0;

let lowerStartAge = 0;
let numberYearsNetWorth = 0;

let netWorthTableDiv = document.querySelector('#netWorthTableDiv');

let ageArray = [];
let sc1Array = [];
let sc2Array = [];
let differenceArray = [];

let advancedAssumptionsButton = document.getElementById("advancedAssumptionButton");
let advancedAssumptionTableContainer = document.getElementById("advancedAssumptionTableContainer");
let advancedAssumptionsToggleMarker = document.getElementById("advancedAssumptionToggleMarker");

let chart;

let generateURLButton = document.getElementById("generateURLButton");
let customURLOutput = document.getElementById("customURLOutput");

getURLValues();
initValues();
addInputEventListeners();
generateNetWorthArrays();
drawNetWorthChart();
createNetWorthTable();
toggleAdvancedAssumptions();
generateCustomURL();

function getURLValues () {
    let hashParams = window.location.hash.substr(1).split('&'); // substr(1) to remove the `#`
    console.log(hashParams);
    if(hashParams[0] === "") {
        return;
    }
    for(let i = 0; i < hashParams.length; i++){
        console.log(hashParams.length);
        let p = hashParams[i].split('=');

        document.getElementById(p[0]).value = decodeURIComponent(p[1]);
    }
}

function drawNetWorthChart(){
    var ctx = document.getElementById('netWorthChart').getContext('2d');
    chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: ageArray,
            datasets: [
                {
                    label: "Scenario #1",
                    borderColor: 'rgb(0, 143, 149)',
                    pointBackgroundColor: 'rgb(0, 143, 149)',
                    fill: false,
                    data: sc1Array,
                    pointHitRadius: 7,
                },
    
                {
                    label: "Scenario #2",
                    borderColor: 'rgb(226, 78, 66)',
                    pointBackgroundColor: 'rgb(226, 78, 66)',
                    fill: false,
                    data: sc2Array,
                    pointHitRadius: 7,
                },
    
                
            ]
        },
    
        // Configuration options go here
        options: {
            maintainAspectRatio: false,
        
            tooltips: {
                 // Include a dollar sign in the ticks and add comma formatting
                 callbacks: {
                    label: function(tooltipItem, data) {
                        let label = data.datasets[tooltipItem.datasetIndex].label || '';
    
                        if (label) {
                            label += ': ';
                        }
                        label += '$'+Math.round(tooltipItem.yLabel).toLocaleString();
                        return label;
                    }
                },
            },
    
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks and add comma formatting
                        callback: function(value, index, values) {
                            return '$' + value.toLocaleString();
                        },

                        fontColor: "rgb(56,56,56)",
                    },
    
                    scaleLabel: {
                        display: true,
                        labelString: "Net Worth",
                        fontColor: "rgb(56,56,56)",
                        fontStyle: "bold",
                        fontSize: 15,
                    },

                    gridLines: {
                        drawTicks: false,
                        zeroLineColor: "rgb(56,56,56)",
                        zeroLineWidth: 2,
                    },
                }],
    
                xAxes: [{
                    ticks: {
                        userCallback: function(item, index) {
                            if (!(index % 5)) return item;
                         },
                         autoSkip: false,
                         fontColor: "rgb(56,56,56)",

                        maxRotation: 0,
                        minRotation: 0, 
                    },
    
                    scaleLabel: {
                        display: true,
                        labelString: "Age",
                        fontColor: "rgb(56,56,56)",
                        fontStyle: "bold",
                        fontSize: 15,
                    },

                    gridLines: {
                        drawTicks: false,
                        zeroLineColor: "rgb(56,56,56)",
                        zeroLineWidth: 2,
                    },
                }],    
            },
            
            legend: {
                labels: {
                    fontColor: "rgb(56,56,56)",
                    boxWidth: 13,
                    padding: 10,
                },
            },

            title: {
                display: true,
                text: "Net Worth Over Time",
                fontSize: 18,
                fontColor: "rgb(56,56,56)",
                padding: 2,
            },
        }
    });
}

function initValues() {
    //initialize phase 1 values
    startAgeSc1 = Number(document.getElementById('ageSc1').value);
    startValueSc1 = Number(document.getElementById('startSc1').value);
    annualSavingsSc1 = Number(document.getElementById('savingSc1').value);
    annualReturnSc1 = Number(document.getElementById('returnSc1').value) / 100;
    
    startAgeSc2 = Number(document.getElementById('ageSc2').value);
    startValueSc2 = Number(document.getElementById('startSc2').value);
    annualSavingsSc2 = Number(document.getElementById('savingSc2').value);
    annualReturnSc2 = Number(document.getElementById('returnSc2').value) / 100;

    //initialize phase 2 values
    p2startAgeSc1 = Number(document.getElementById('phase2AgeSc1').value);
    p2annualSavingsSc1 = Number(document.getElementById('phase2SavingSc1').value);
    p2annualReturnSc1 = Number(document.getElementById('phase2ReturnSc1').value) / 100;
    
    p2startAgeSc2 = Number(document.getElementById('phase2AgeSc2').value);
    p2annualSavingsSc2 = Number(document.getElementById('phase2SavingSc2').value);
    p2annualReturnSc2 = Number(document.getElementById('phase2ReturnSc2').value) / 100;
    
    //initialize lump sum values
    lumpSum1AgeSc1 = Number(document.getElementById('lumpSum1AgeSc1').value);
    lumpSum1AgeSc2 = Number(document.getElementById('lumpSum1AgeSc2').value);
    lumpSum1AmountSc1 = Number(document.getElementById('lumpSum1AmountSc1').value);
    lumpSum1AmountSc2 = Number(document.getElementById('lumpSum1AmountSc2').value);
    lumpSum2AgeSc1 = Number(document.getElementById('lumpSum2AgeSc1').value);
    lumpSum2AgeSc2 = Number(document.getElementById('lumpSum2AgeSc2').value);
    lumpSum2AmountSc1 = Number(document.getElementById('lumpSum2AmountSc1').value);
    lumpSum2AmountSc2 = Number(document.getElementById('lumpSum2AmountSc2').value);
    
    lowerStartAge = 0;
    if(startAgeSc1 <= startAgeSc2) {
        lowerStartAge = startAgeSc1;
    } else {
        lowerStartAge = startAgeSc2;
    }
    
    numberYearsNetWorth = Number(document.getElementById('numYears').value);
    
    ageArray = [];
    sc1Array = [];
    sc2Array = [];
    differenceArray = [];
}

function addInputEventListeners() {
    let sc1Inputs = document.getElementsByClassName("sc1Input");
    let sc2Inputs = document.getElementsByClassName("sc2Input");
    let numYearsInput = document.getElementsByClassName("numYearsInput");

    for(i=0;i<sc1Inputs.length;i++) {
        console.log("add listener");
        sc1Inputs[i].addEventListener('change',refreshNetWorthCalcs, false);
    }

    for(i=0;i<sc2Inputs.length;i++) {
        console.log("add listener");
        sc2Inputs[i].addEventListener('change',refreshNetWorthCalcs, false);
    }

    for(i=0;i<numYearsInput.length;i++) {
        console.log("add listener");
        numYearsInput[i].addEventListener('change',refreshNetWorthCalcs, false);
    }
}

function generateCustomURL() {

    generateURLButton.addEventListener('click', function() {

        let customURL = [location.protocol, '//', location.host, location.pathname].join('');
        console.log(customURL);

        customURL += "#ageSc1="+document.getElementById('ageSc1').value+"&startSc1="+document.getElementById('startSc1').value+"&savingSc1="
        +document.getElementById('savingSc1').value+"&returnSc1="+document.getElementById('returnSc1').value+"&ageSc2="+document.getElementById('ageSc2').value+"&startSc2="+document.getElementById('startSc2').value+"&savingSc2="
        +document.getElementById('savingSc2').value+"&returnSc2="+document.getElementById('returnSc2').value+"&numYears="+document.getElementById('numYears').value;
        
        if(Number(advancedAssumptionsToggleMarker.value) === 1) {
            customURL += "&advancedAssumptionToggleMarker="+document.getElementById('advancedAssumptionToggleMarker').value+"&phase2AgeSc1="+document.getElementById('phase2AgeSc1').value+"&phase2AgeSc2="+document.getElementById('phase2AgeSc2').value
            +"&phase2SavingSc1="+document.getElementById('phase2SavingSc1').value+"&phase2SavingSc2="+document.getElementById('phase2SavingSc2').value
            +"&phase2ReturnSc1="+document.getElementById('phase2ReturnSc1').value+"&phase2ReturnSc2="+document.getElementById('phase2ReturnSc2').value
            +"&lumpSum1AgeSc1="+document.getElementById('lumpSum1AgeSc1').value+"&lumpSum1AgeSc2="+document.getElementById('lumpSum1AgeSc2').value
            +"&lumpSum1AmountSc1="+document.getElementById('lumpSum1AmountSc1').value+"&lumpSum1AmountSc2="+document.getElementById('lumpSum1AmountSc2').value
            +"&lumpSum2AgeSc1="+document.getElementById('lumpSum2AgeSc1').value+"&lumpSum2AgeSc2="+document.getElementById('lumpSum2AgeSc2').value
            +"&lumpSum2AmountSc1="+document.getElementById('lumpSum2AmountSc1').value+"&lumpSum2AmountSc2="+document.getElementById('lumpSum2AmountSc2').value;
        } 

        customURLOutput.innerHTML = customURL;
        copyToClipboard('customURLOutput');

    }, false);

}

function toggleAdvancedAssumptions() {
    
    if(Number(advancedAssumptionsToggleMarker.value) === 0) {
        advancedAssumptionTableContainer.style.display = "none"; 
    } else {
        advancedAssumptionsButton.innerHTML = "Remove advanced options";
    }
    
    advancedAssumptionsButton.addEventListener('click', function() {

        if(Number(advancedAssumptionsToggleMarker.value) === 0){
            advancedAssumptionTableContainer.style.display = "block";
            advancedAssumptionsToggleMarker.value = 1;
            console.log(advancedAssumptionsToggleMarker.value);
            advancedAssumptionsButton.innerHTML = "Remove advanced options";
            refreshNetWorthCalcs();
        } else {
            advancedAssumptionTableContainer.style.display = "none";
            advancedAssumptionsToggleMarker.value = 0;
            console.log(advancedAssumptionsToggleMarker.value);
            advancedAssumptionsButton.innerHTML = "+ Advanced options";
            refreshNetWorthCalcs();
        }
    }, false);
}

function copyToClipboard(containerid) {
    if (screen.width >= 600) {
        if (document.selection) { 
            var range = document.body.createTextRange();
            range.moveToElementText(document.getElementById(containerid));
            range.select().createTextRange();
            document.execCommand("copy"); 
        
        } else if (window.getSelection) {
            var range = document.createRange();
            range.selectNode(document.getElementById(containerid));
            window.getSelection().addRange(range);
            document.execCommand("copy");
        }
    }
    else {
        return;
    }
}

function refreshNetWorthCalcs() {
    console.log("refresh net worth calcs");
    chart.destroy();
  
    let table = document.getElementById("netWorthTable");
    table.parentNode.removeChild(table);

    customURLOutput.innerHTML = "Click button to get a shareable link for your custom scenario";

    initValues();
    generateNetWorthArrays();
    drawNetWorthChart();
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

    netWorthTable1b.classList.add("sc1Header");
    netWorthTable1c.classList.add("sc2Header");

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

        netWorthTableDiv.appendChild(netWorthTable);

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
                let roundedNum = Math.round(sc1Array[i]);
                let absNum = Math.abs(roundedNum)
                
                if(sc1Array[i] === null) {
                    tableCell.innerHTML = "n/a"; 
                } else if(sc1Array[i] >= 0) {
                    tableCell.innerHTML = "$"+absNum.toLocaleString(); 
                } else {
                    tableCell.innerHTML = "($"+absNum.toLocaleString()+")"; 
                }
            }

            else if(j === 2) {
                let roundedNum = Math.round(sc2Array[i]);
                let absNum = Math.abs(roundedNum)
                
                if(sc2Array[i] === null) {
                    tableCell.innerHTML = "n/a"; 
                } else if(sc2Array[i] >= 0) {
                    tableCell.innerHTML = "$"+absNum.toLocaleString(); 
                } else {
                    tableCell.innerHTML = "($"+absNum.toLocaleString()+")"; 
                }
            }

            else if(j === 3) {
                let roundedNum = Math.round(differenceArray[i]);
                let absNum = Math.abs(roundedNum)
                
                if(differenceArray[i] === null) {
                    tableCell.innerHTML = "n/a"; 
                } else if(differenceArray[i] >= 0) {
                    tableCell.innerHTML = "$"+absNum.toLocaleString();
                    document.getElementById('row'+(i+1)+'col'+(j+1)).style.color = "#008f95"; 
                } else {
                    tableCell.innerHTML = "($"+absNum.toLocaleString()+")";
                    document.getElementById('row'+(i+1)+'col'+(j+1)).style.color = "#e24e42"; 
                }            
            }
        }
    }
}

function generateNetWorthArrays() {

    for(i=0;i<=numberYearsNetWorth;i++) {

        let currentAge = lowerStartAge + i;

        let sc1LumpSum1 = 0;
        let sc1LumpSum2 = 0;
        let sc2LumpSum1 = 0;
        let sc2LumpSum2 = 0;

        let chooseAnnualSavingsSc1 = annualSavingsSc1;
        let chooseAnnualSavingsSc2 = annualSavingsSc2;
        let chooseAnnualReturnSc1 = annualReturnSc1;
        let chooseAnnualReturnSc2 = annualReturnSc2;

        //Grab lump sum values if it is the correct year
        if(currentAge === lumpSum1AgeSc1 && Number(advancedAssumptionsToggleMarker.value) === 1) {
            sc1LumpSum1 = lumpSum1AmountSc1;
        } else {
            sc1LumpSum1 = 0;
        }
        if(currentAge === lumpSum2AgeSc1 && Number(advancedAssumptionsToggleMarker.value) === 1) {
            sc1LumpSum2 = lumpSum2AmountSc1;
        } else {
            sc1LumpSum2 = 0;
        }
        if(currentAge === lumpSum1AgeSc2 && Number(advancedAssumptionsToggleMarker.value) === 1) {
            sc2LumpSum1 = lumpSum1AmountSc2;
        } else {
            sc2LumpSum1 = 0;
        }
        if(currentAge === lumpSum2AgeSc2 && Number(advancedAssumptionsToggleMarker.value) === 1) {
            sc2LumpSum2 = lumpSum2AmountSc2;
        } else {
            sc2LumpSum2 = 0;
        }

        //Use phase 2 annual savings and return amount, if applicable
        if(Number(advancedAssumptionsToggleMarker.value) === 1 && p2startAgeSc1 > startAgeSc1 && p2startAgeSc1 < currentAge) {
            chooseAnnualSavingsSc1 = p2annualSavingsSc1;
            chooseAnnualReturnSc1 = p2annualReturnSc1;
        }
        if(Number(advancedAssumptionsToggleMarker.value) === 1 && p2startAgeSc2 > startAgeSc2 && p2startAgeSc2 < currentAge) {
            chooseAnnualSavingsSc2 = p2annualSavingsSc2;
            chooseAnnualReturnSc2 = p2annualReturnSc2;
        }

        ageArray[i] = currentAge;

        if(currentAge<startAgeSc1) {
            sc1Array[i] = null;
        } else if(currentAge === startAgeSc1) {
            sc1Array[i] = startValueSc1;
        } else {
            sc1Array[i] = sc1Array[i-1] + sc1Array[i-1] * chooseAnnualReturnSc1 + chooseAnnualSavingsSc1 + sc1LumpSum1 + sc1LumpSum2;
        }

        if(currentAge<startAgeSc2) {
            sc2Array[i] = null;
        } else if(currentAge === startAgeSc2) {
            sc2Array[i] = startValueSc2;
        } else {
            sc2Array[i] = sc2Array[i-1] + sc2Array[i-1] * chooseAnnualReturnSc2 + chooseAnnualSavingsSc2 + sc2LumpSum1 + sc2LumpSum2;
        }

        if(sc1Array[i] === null || sc2Array[i] === null) {
            differenceArray[i] = null;
        } else {
            differenceArray[i] = sc1Array[i] - sc2Array[i];
        }   
    }
}