$(document).ready(onReady);

let employees = [];
let arrayId = 0;

function onReady() {
    console.log('ready');
//reference the onReady function in the event-state-render-starter
    $('#submitBtn').on('click', addEmployee);
    $('#employeeTable').on('click', '.delete-btn', removeEmployee);

    render();
}

function addEmployee() {
    console.log('in addEmployee');
//reference the submitPost function in the event-state-render-starter
    let person = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        id: $('#ID').val(),
        title: $('#title').val(),
        annualSalary: $('#annualSalary').val(),
        
        arrayId: arrayId
    }
    arrayId++;

    $('#firstName').val('');
    $('#lastName').val('');
    $('#ID').val('');
    $('#title').val('');
    $('#annualSalary').val('');

    employees.push(person);

    render();
}

function removeEmployee() {
    
    let newEntries = [];

    console.log('in removeEmployee');
//reference the onDelete function in the event-state-render-starter
//use ID as your identifier
    let deleteThis = $(this).attr('id')


    console.log('deleteThis:', deleteThis);

for (let person of employees) {
    if (person.arrayId != deleteThis) {
        newEntries.push(person);
        console.log(person.arrayId, deleteThis);
    }
}
employees = newEntries;
console.log(newEntries);
render();
}

function render() {
    $('#employeeTable').empty();

    for (let person of employees) {
        $('#employeeTable').append(`
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
        `)
    }

//reference render function in the event-state-render-starter
}