// Your code here
const createEmployeeRecord = function(eeData) {
    return {
        firstName: eeData[0],
        familyName: eeData[1],
        title: eeData[2],
        payPerHour: eeData[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function(eeData) {
    return eeData.map(function(ee) {
        return createEmployeeRecord(ee)
    })
}
//const createEmployeeRecords = eeData => eeData.map(ee => createEmployeeRecord(ee))

const createTimeInEvent = function(ee, timeIn) {
    let [date, time] = timeIn.split(" ")
    ee.timeInEvents.push({type: "TimeIn", date: date, hour: parseInt(time)})
    return ee
}

const createTimeOutEvent = function(ee, timeOut) {
    let [date, time] = timeOut.split(" ")
    ee.timeOutEvents.push({type: "TimeOut", date: date, hour: parseInt(time)})
    return ee
}

const hoursWorkedOnDate = function(ee, date) {
    let inDay = ee.timeInEvents.find(event => event.date === date)
    let outDay = ee.timeOutEvents.find(event => event.date === date)
    return (outDay.hour - inDay.hour)/100
}

const wagesEarnedOnDate = function(ee, date) {
    let hours = hoursWorkedOnDate(ee, date)
    return hours * ee.payPerHour
}

const allWagesFor = function(ee) {
    let dates = ee.timeInEvents.map(event => event.date)
    let wages = dates.map(date => wagesEarnedOnDate(ee, date))
    return wages.reduce((total, num) => total + num, 0)
}

const calculatePayroll = function(employees) {
    let allWages = employees.map(ee => allWagesFor(ee))
    return allWages.reduce((total, wages) => total + wages, 0)
}

const findEmployeeByFirstName = function(eeRecords, name) {
    return eeRecords.find(ee => ee.firstName === name)
}

