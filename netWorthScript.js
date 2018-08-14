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

let chart;

let generateURLButton = document.getElementById("generateURLButton");
let customURLOutput = document.getElementById("customURLOutput");

getURLValues();
initValues();
addInputEventListeners();
generateNetWorthArrays();
drawNetWorthChart();
createNetWorthTable();
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

    startAgesc1 = Number(document.getElementById('ageSc1').value);
    startValuesc1 = Number(document.getElementById('startSc1').value);
    annualSavingssc1 = Number(document.getElementById('savingSc1').value);
    annualReturnsc1 = Number(document.getElementById('returnSc1').value) / 100;
    
    startAgesc2 = Number(document.getElementById('ageSc2').value);
    startValuesc2 = Number(document.getElementById('startSc2').value);
    annualSavingssc2 = Number(document.getElementById('savingSc2').value);
    annualReturnsc2 = Number(document.getElementById('returnSc2').value) / 100;
    
    lowerStartAge = 0;
    if(startAgesc1 <= startAgesc2) {
        lowerStartAge = startAgesc1;
    } else {
        lowerStartAge = startAgesc2;
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

        customURLOutput.innerHTML = customURL;

        // customURLOutput.select();
        // document.execCommand("copy");

        copyToClipboard('customURLOutput');

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

function generateNetWorthArrays () {

    for(i=0;i<=numberYearsNetWorth;i++) {

        let currentAge = lowerStartAge + i;
        
        ageArray[i] = currentAge;

        if(currentAge<startAgesc1) {
            sc1Array[i] = null;
        } else if(currentAge === startAgesc1) {
            sc1Array[i] = startValuesc1;
        } else {
            sc1Array[i] = sc1Array[i-1] + sc1Array[i-1] * annualReturnsc1 + annualSavingssc1;
        }

        if(currentAge<startAgesc2) {
            sc2Array[i] = null;
        } else if(currentAge === startAgesc2) {
            sc2Array[i] = startValuesc2;
        } else {
            sc2Array[i] = sc2Array[i-1] + sc2Array[i-1] * annualReturnsc2 + annualSavingssc2;
        }

        if(sc1Array[i] === null || sc2Array[i] === null) {
            differenceArray[i] = null;
        } else {
            differenceArray[i] = sc1Array[i] - sc2Array[i];
        }   
    }
}