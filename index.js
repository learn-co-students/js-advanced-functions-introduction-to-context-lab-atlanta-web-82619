// Your code here
function createEmployeeRecord(array) {
    let employee =  {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employee
}

function createEmployeeRecords(employees) {
    return employees.map(employee => createEmployeeRecord(employee))
}

function timeHelperMethod(employee, string, type) {
    let splitTime = string.split(" ")
    let date = splitTime[0]
    let time = splitTime[1]

    const clockEvent = {
        type: type,
        date: date,
        hour: parseInt(time)
    }
    return clockEvent 
}

function createTimeInEvent(employee, string) {
    let clockIn = (timeHelperMethod(employee, string, "TimeIn"))
    employee.timeInEvents.push(clockIn)
    return employee
}

function createTimeOutEvent(employee, string) {
    let clockOut = (timeHelperMethod(employee, string, "TimeOut"))
    employee.timeOutEvents.push(clockOut)
    return employee
}

function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(time => time.date === date)
    let timeOut = employee.timeOutEvents.find(time => time.date === date)
    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employee, date) {
    let hours = hoursWorkedOnDate(employee, date)
    return employee.payPerHour * hours
}

function allWagesFor(employee) {
    let wages = employee.timeInEvents.map(event => wagesEarnedOnDate(employee, event.date))
    return wages.reduce((pay, sum) => pay + sum, 0)
}

function calculatePayroll(employees) {
    let allWages = employees.map(employee => allWagesFor(employee))
    return allWages.reduce((wages, sum) => wages + sum, 0)
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employee => employee.firstName === firstName)
}