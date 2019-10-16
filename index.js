// Your code here
function createEmployeeRecord(arr) {
  let employee = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employee;
}

function createEmployeeRecords(employees) {
  let employee_objects = employees.map(employee => createEmployeeRecord(employee));
  return employee_objects;
}

function createTimeInEvent(employee_record, date_stamp) {
  let [date, hour] = date_stamp.split(" ");

  let timeIn = {
    type: 'TimeIn',
    hour: parseInt(hour),
    date: date
  }

  employee_record.timeInEvents.push(timeIn);
  return employee_record;
}

function createTimeOutEvent(employee_record, date_stamp) {
  let [date, hour] = date_stamp.split(" ");

  let timeOut = {
    type: 'TimeOut',
    hour: parseInt(hour),
    date: date
  }

  employee_record.timeOutEvents.push(timeOut);
  return employee_record;
}

function hoursWorkedOnDate(employee_record, date) {
  let timeOut = employee_record.timeOutEvents.find(event => event.date === date);
  let timeOutHour = timeOut.hour;

  let timeIn = employee_record.timeInEvents.find(event => event.date === date);
  let timeInHour = timeIn.hour;

  return (timeOutHour - timeInHour)/100;
}

function wagesEarnedOnDate(employee_record, date) {
  let hours = hoursWorkedOnDate(employee_record, date);
  return employee_record.payPerHour * hours;
}

function allWagesFor(employee_record) {
  let allWages = employee_record.timeInEvents.map(event => wagesEarnedOnDate(employee_record, event.date));
  return allWages.reduce((memo, val) => memo + val, 0);
}

function calculatePayroll(employee_array) {
  let employeeWages = employee_array.reduce((memo, emp) => memo + allWagesFor(emp), 0);
  return employeeWages;
}

function findEmployeeByFirstName(employees, name) {
  return employees.find(emp => emp.firstName === name)
}