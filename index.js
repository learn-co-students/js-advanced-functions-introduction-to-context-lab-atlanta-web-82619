// Your code here
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arr) {
    return arr.map(employee => {
        return createEmployeeRecord(employee);
    })
}

function createTimeInEvent(employeeObj, datestamp) {
    const arr = datestamp.split(' ');
    const hour = parseInt(arr[1], 10);
    const date = arr[0];

    const timeIn = {
        type: 'TimeIn',
        hour,
        date
    }

    employeeObj.timeInEvents.push(timeIn);
    return employeeObj;
}

function createTimeOutEvent(employeeObj, datestamp) {
    const arr = datestamp.split(' ');
    const hour = parseInt(arr[1], 10);
    const date = arr[0];

    const timeOut = {
        type: 'TimeOut',
        hour,
        date
    }

    employeeObj.timeOutEvents.push(timeOut);
    return employeeObj;
}

function hoursWorkedOnDate(employeeObj, datestamp) {
    const timeIn = employeeObj.timeInEvents.find(event => {
        return (event.date === datestamp.split(' ')[0]);
    }).hour

    const timeOut = employeeObj.timeOutEvents.find(event => {
        return (event.date === datestamp.split(' ')[0]);
    }).hour

    return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(employeeObj, datestamp) {
    return hoursWorkedOnDate(employeeObj, datestamp) * employeeObj.payPerHour;
}

function allWagesFor(employeeObj) {
    const datestamps = employeeObj.timeInEvents.map(event => {
        return `${event.date} ${event.hour}`;
    })

    return datestamps.reduce((total, datestamp) => {
        return total + wagesEarnedOnDate(employeeObj, datestamp);
    }, 0)
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employee => {
        return employee.firstName = firstName;
    })
}

function calculatePayroll(employees) {
    return employees.reduce((total, employee) => {
        return total + allWagesFor(employee);
    }, 0)
}