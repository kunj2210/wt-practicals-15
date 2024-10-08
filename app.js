let students = [];
let editingIndex = null;



const storeStudents = () => {
    localStorage.setItem('students', JSON.stringify(students));
};


function displayStudents() {
    const tableBody = document.getElementById("studentTableBody");
    tableBody.innerHTML = "";


    students.forEach((student, index) => {
        const row = `
            <tr>
                <td>${student.fname}</td>
                <td>${student.mname}</td>
                <td>${student.lname}</td>
                <td>${student.age}</td>
                <td>${student.EnrollementID}</td>
                <td>${student.phone}</td>
                <td>${student.Address}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editStudent(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

const loadStudents = () => {
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
        console.log("sgdrgt")
        students = JSON.parse(storedStudents);
        displayStudents();
    } else {
        students = [];
    }
};

loadStudents();

function addStudent(fname, mname, lname, age, EnrollementID, phone, Address) {
    const student = { fname, mname, lname, age, EnrollementID, phone, Address };
    students.push(student);
}


document
    .getElementById("studentForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();


        const fname = document.getElementById("fname").value;
        const mname = document.getElementById("mname").value;
        const lname = document.getElementById("lname").value;
        const age = document.getElementById("age").value;
        const EnrollementID = document.getElementById("EnrollementID").value;
        const phone = document.getElementById("phone").value;
        const Address = document.getElementById("Address").value;


        if (editingIndex !== null) {
            students[editingIndex] = { fname, mname, lname, age, EnrollementID, phone, Address };
            editingIndex = null;
        } else {
            addStudent(fname, mname, lname, age, EnrollementID, phone, Address);
        }


        displayStudents();
        storeStudents();

        document.getElementById("studentForm").reset();
    });


function editStudent(index) {
    const student = students[index];
    document.getElementById("fname").value = student.name;
    document.getElementById("mname").value = student.mname;
    document.getElementById("lname").value = student.lname;
    document.getElementById("age").value = student.age;
    document.getElementById("EnrollementID").value = student.EnrollementID;
    document.getElementById("phone").value = student.phone;
    document.getElementById("Address").value = student.Address;
    document.querySelector("button[type=submit]").innerText = "Save";
    editingIndex = index;
}


function deleteStudent(index) {
    students.splice(index, 1);
    displayStudents();
}

const clearStudentsButton = document.getElementById('clear-students-button');
clearStudentsButton.addEventListener('click', () => {
    localStorage.clear();
    students = [];
    displayStudents();
});