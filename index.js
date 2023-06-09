// Your code here
// createEmployeeRecord
function createEmployeeRecord(employeeData) {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

// createEmployeeRecords
function createEmployeeRecords(employeesData) {
  return employeesData.map(createEmployeeRecord);
}

// createTimeInEvent
function createTimeInEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date: date
  });
  return employee;
}

// createTimeOutEvent
function createTimeOutEvent(employee, dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date: date
  });
  return employee;
}

// hoursWorkedOnDate
function hoursWorkedOnDate(employee, date) {
  const timeInEvent = employee.timeInEvents.find(event => event.date === date);
  const timeOutEvent = employee.timeOutEvents.find(event => event.date === date);
  return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

// wagesEarnedOnDate
function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  return hoursWorked * employee.payPerHour;
}

// allWagesFor
function allWagesFor(employee) {
  const datesWorked = employee.timeInEvents.map(event => event.date);
  const totalWages = datesWorked.reduce((sum, date) => sum + wagesEarnedOnDate(employee, date), 0);
  return totalWages;
}

// calculatePayroll
function calculatePayroll(employees) {
  return employees.reduce((sum, employee) => sum + allWagesFor(employee), 0);
}
