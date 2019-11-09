// Your code here
function createEmployeeRecord(infoArray){
    return {
        firstName: infoArray[0],
    familyName: infoArray[1],
    title: infoArray[2],
    payPerHour: infoArray[3],
    timeInEvents: [],
    timeOutEvents:[]
    }
}

function createEmployeeRecords(infoArraysArray){
    return infoArraysArray.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(employee, timeStamp){
    let time = timeStamp.split(' ');
    employee.timeInEvents.push(
        {
        type: 'TimeIn',
        hour: parseInt(time[1]),
        date: time[0]
    })
    return employee
}

function createTimeOutEvent(employee, timeStamp){
    let time = timeStamp.split(' ');
    employee.timeOutEvents.push(
        {
            type: 'TimeOut',
            hour: parseInt(time[1]),
            date: time[0]
        })
    return employee
}

function hoursWorkedOnDate(employee, date){
    let timeIn = employee.timeInEvents.find(event => event.date === date)
    let timeOut = employee.timeOutEvents.find(event => event.date === date)
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, date){
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee){
    let dates = employee.timeInEvents.map(event => event.date)
    let wages = dates.map(date => wagesEarnedOnDate(employee, date))
    return wages.reduce((memo, wage) => memo + wage, 0);
}

function findEmployeeByFirstName(records, name){
    return records.find(employee => employee.firstName === name);
}

function calculatePayroll(records){
    let wages = records.map(employee => allWagesFor(employee));
    return wages.reduce((memo, wage) => memo + wage, 0)
}