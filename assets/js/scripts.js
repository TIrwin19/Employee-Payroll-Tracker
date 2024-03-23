// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// Collect employee data
// This function uses prompts to take user input and store it in an object array
// This function is triggered by a button in the html
const collectEmployees = function () {
  // TODO: Get user input to create and return an array of employee objects
  //  Declare an empty array to store the values
  let empData = []

  // Declare a variable that will trigger the loop to start again when true
  let continueAdding = true

  // Start a while loop with variables declared as empty strings, this while loop will also be triggered by the continueAdding variable 
  while (continueAdding) {
    let first = ''
    let last = ''
    let salary = ''

    // The first two while loops check if the input to the prompt is an empty string or a number. This will make sure that the user enters a string. If nothing or a number are entered the prompt will not continue.
    while (!first || !isNaN(first)) {
      first = prompt('Employee First Name')
    }

    while (!last || !isNaN(last)) {
      last = prompt('Employee Last Name')
    }

    // The last while loop will check to see that the user enters a number. if the user enters nothing or a string it will not continue.
    while (!salary || isNaN(salary)) {
      salary = prompt('Employee Salary')
    }

    // The data collected from the prompts is then stored in an object array called empData. The salary property will be entered in the array using the parseInt function.
    empData.push({
      firstName: first,
      lastName: last,
      salary: parseInt(salary)
    })

    // A window with a question and two buttons then displays to see if the user wants to enter another employee's data. If true the whole while loop runs again. If false the while loop does not trigger and the data is returned. 
    let continueInput = window.confirm('Do you want to add another Employee?')
    // The if statement checks if the user clicks cancel or false in the window. If they did the loop stops and the data is returned.
    if (!continueInput) {
      continueAdding = false
    }
  }
  return empData
} 

// Display the average salary
const displayAverageSalary = function (employeesArray) {
  // TODO: Calculate and display the average salary
  // The variable totalSalary is declared and the reduce function is used to add up the salary data from the object array.
  const totalSalary = employeesArray.reduce((acc, employeeArray) => acc + employeeArray.salary, 0)

  // The sum of the sallaries is then devided by the number of employees to give the average.
  const avgSalary = totalSalary / employeesArray.length

  // The average and number of employees are callked to a string using a template literal string and logged to the console.
  console.log(`The average salary of the ${employeesArray.length} employees is $${avgSalary}`)
}

// Select a random employee
const getRandomEmployee = function (employeesArray) {
  // TODO: Select and display a random employee
  // First a random index is chosen from the object array using Math.random and Math.floor
  const ranIndex = Math.floor(Math.random()*employeesArray.length)

  // The random index is then used to call it's object in the array.
  const ranEmployee = employeesArray[ranIndex]

  // Lastly a template literal string us used to call the specific properties desired into a string that is displayed on the console.
  console.log(`Your random eployee is: ${ranEmployee.firstName} ${ranEmployee.lastName}`)
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function () {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
