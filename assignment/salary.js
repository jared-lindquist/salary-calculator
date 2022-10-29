$(document).ready(onReady);

//initialize global variables to be used in functions
let employees = [];
let arrayId = 0;
let totalAnnualSal = 0;
let monthlySal = 0;


function onReady() {
    console.log('ready');
    //click listener for submit button
    $('#submitBtn').on('click', addEmployee);
    // click listener for removeEmployee button
    $('#employeeTable').on('click', '.delete-btn', removeEmployee);

    render();
}

function addEmployee() {
    console.log('in addEmployee');
    //add employee object
    let person = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        id: $('#ID').val(),
        title: $('#title').val(),
        annualSalary: $('#annualSalary').val(),
        arrayId: arrayId
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
    //render to DOM
    render();
}

function removeEmployee() {
    //initialize new array for employees not deleted
    let newEntries = [];

    console.log('in removeEmployee');

    //initalize deleteThis with with bling this and the attribute 'id'
    //of the removeEmployee button
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
}
//se the new value of the employees array to our newly created
//newEntries array
employees = newEntries;
console.log(newEntries);
//render
render();
}

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
        
            <td>
            <button id ="${person.arrayId}"class="delete-btn">
                Remove Employee
            </button>
            </td>
        </tr>
        `)// dynamically create a remove employee button with the 
          //class delete-btn and an Id matching the object appended to the DOM
    }
}