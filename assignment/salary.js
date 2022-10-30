$(document).ready(onReady);

//initialize global variables to be used in functions
let employees = [];
let arrayId = 0;
let totalAnnualSalary = 0;
let monthlyBudget = 0;


function onReady() {
    console.log('ready');
    //click listener for submit button
    $('#submitBtn').on('click', addEmployee);
    // click listener for removeEmployee button
    $('#employeeTable').on('click', '.delete-btn', removeEmployee);

    render();
}//end onReady

function addEmployee() {
    console.log('in addEmployee');
    //add employee object
    let person = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        id: $('#ID').val(),
        title: $('#title').val(),
        annualSalary: $('#annualSalary').val(),
        arrayId: arrayId//global variable from above
    }
    //increment our global arrayId
    arrayId++;
    //clear inputs 
    $('#firstName').val('');
    $('#lastName').val('');
    $('#ID').val('');
    $('#title').val('');
    $('#annualSalary').val('');
    //push entry to global employees array
    employees.push(person);

    //call updateMonthlyBudget function from below
    updateMonthlyBudget();
    //render to DOM
    render();
}//end addEmployee

function removeEmployee() {
    //initialize new array for employees not deleted
    let newEntries = [];

    console.log('in removeEmployee');

    //initalize deleteThis with with bling this and the attribute 'id'
    //of the removeEmployee button that is clicked
    let deleteThis = $(this).attr('id')


    console.log('deleteThis:', deleteThis);
    //loop through the employees array, if the id of the remove 
    //button that we click does not match the person.arrayId
    //we push those objects into the newEntries array
    //and console log to check
for (let person of employees) {
    if (person.arrayId != deleteThis) {
        newEntries.push(person);
        console.log(person.arrayId, deleteThis);
    }
}//end for loop

//set the new value of the employees array to our newly created
//newEntries array
employees = newEntries;
console.log(newEntries);

//update monthlyBudget
updateMonthlyBudget();
//render
render();
}//end removeEmployee

function updateMonthlyBudget() {
    //restating our global variables from above
    monthlyBudget = 0;
    totalAnnualSalary = 0;
    //loop through the employees array, updating our 
    //global monthlyBudget value to += all of the added employee objects
    //annualSalary divided by 12
    for (person of employees) {
        monthlyBudget += (person.annualSalary/12);
    }
    //converting the monthlyBudget value to a number fixed to two decimal places
    monthlyBudget = Number(monthlyBudget.toFixed(2));
     console.log('monthly budget', monthlyBudget);
    //if else statement checking if the monthlyBudget value
    //is above or below 20000 and changing the class accordingly
    if (monthlyBudget > 20000) {
        $('#monthlyBudget').addClass('overBudget');
        $('#monthlyBudget').removeClass('underBudget');
    } else {
        $('#monthlyBudget').removeClass('overBudget');
        $('#monthlyBudget').addClass('underBudget');
    }
    return;
}//end updateMonthlyBudget

function render() {
    //empty the contents of the employeeTable
    $('#tableBody').empty();
    //loop through the employees array and append to the DOM
    //the values of the object keys
    for (let person of employees) {
        $('#tableBody').append(`
        <tr>
            <td>${person.firstName}</td>
            <td>${person.lastName}</td>
            <td>${person.id}</td>
            <td>${person.title}</td>
            <td>${person.annualSalary}</td>
        
            <td id="remove-column">
            <button id ="${person.arrayId}"class="delete-btn">
                Remove Employee
            </button>
            </td>
        </tr>
        `)// dynamically create a remove employee button with the 
          //class delete-btn and an Id matching the object appended to the DOM
          //the arrayID is unique to each employee object added
    }

    //empty monthlyBudget
    $('#monthlyBudget').empty();
    //append updated monthlyBudget value to DOM
    $('#monthlyBudget').append(` $ ${monthlyBudget}`)
}//end render