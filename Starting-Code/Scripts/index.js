const token = localStorage.getItem("access_token");
const userEmail = JSON.parse(localStorage.getItem("user_email"));


if (!token) {
    window.location.href = "login.html";
}

document.getElementsById("userEmail").innerText = userEmail;


const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
};

let currentEditId = null;
let allNotes = [];

const priorityOrder = {
    'High': 3,
    'Medium': 2,
    'Low': 1
};

function fetchNotes() {
    fetch("http://127.0.0.1:8000/notes/", { headers })
        .then(res => res.json())
        .then(data => {
            allNotes = data;
            displayNotes();
        });
}

function displayNotes() {
    const statusFilter = document.querySelector('input[name="statusFilter"]:checked').value;
    const priorityFilter = document.querySelector('input[name="priorityFilter"]:checked').value;

    let filteredNotes = allNotes;
    if (statusFilter !== 'all') {
        filteredNotes = filteredNotes.filter((note) => {
            if (note.status === statusFilter) {
                return true;  // Is note ko rakho
            } else {
                return false; // Is note ko hatao
            }
        });
    }
}