const token = localStorage.getItem("access_token"); // JWT
console.log(localStorage.getItem("access_token"));
const userEmail = JSON.parse(localStorage.getItem("user_email")); // Email stored at login
console.log(userEmail);

if (!token) {
    window.location.href = "login.html"; // redirect if not logged in
}

// Show user email in header
document.getElementById("userEmail").innerText = userEmail;

// Logout button
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_email");
    window.location.href = "login.html";
});

const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
};

let currentEditId = null;
let allNotes = []; // Store all notes for filtering

// Priority order mapping
const priorityOrder = {
    'High': 3,
    'Medium': 2,
    'Low': 1
};

// Fetch notes
function fetchNotes() {
    fetch("http://127.0.0.1:8000/notes/", { headers })
        .then(res => res.json())
        .then(data => {
            allNotes = data;
            displayNotes();
        });
}

// Display notes with current filters applied
function displayNotes() {
    const statusFilter = document.querySelector('input[name="statusFilter"]:checked').value;
    const priorityFilter = document.querySelector('input[name="priorityFilter"]:checked').value;

    // Filter by status
    let filteredNotes = allNotes;
    if (statusFilter !== 'all') {
        filteredNotes = filteredNotes.filter(note => note.status === statusFilter);
    }

    // Sort by priority
    if (priorityFilter === 'high-to-low') {
        filteredNotes.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    } else if (priorityFilter === 'low-to-high') {
        filteredNotes.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    const notesDiv = document.getElementById("notesList");
    notesDiv.innerHTML = "";

    if (filteredNotes.length === 0) {
        notesDiv.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">No notes found with current filters.</p>';
        return;
    }

    // filteredNotes.forEach(note => {
    //     const statusClass = note.status.toLowerCase().replace(' ', '');
    //     const priorityClass = note.priority.toLowerCase();

    //     notesDiv.innerHTML += `
    //         <div class="note-card priority-${priorityClass}">
    //             <h3>${escapeHtml(note.title)}</h3>
    //             <div>
    //                 <span class="status-badge status-${statusClass}">${note.status}</span>
    //                 <span class="priority-badge priority-${priorityClass}">${note.priority}</span>
    //             </div>
    //             <p>${escapeHtml(note.description)}</p>
    //             <p style="font-size: 12px; color: #999;">
    //                 <strong>Created:</strong> ${new Date(note.created_at).toLocaleString()}<br>
    //                 <strong>Updated:</strong> ${new Date(note.updated_at).toLocaleString()}
    //             </p>
    //             <button class="edit-btn" onclick="showEditModal(${note.id}, '${escapeHtml(note.title)}', '${escapeHtml(note.description)}', '${note.status}', '${note.priority}')">Edit</button>
    //             <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
    //         </div>
    //     `;
    // });
    filteredNotes.forEach(note => {
        const statusClass = note.status.toLowerCase().replace(' ', '');
        const priorityClass = note.priority.toLowerCase();

        console.log(note.title);

        // // ✅ SOLUTION: Use double quotes aur escapeHtml properly
        // const escapedTitle = escapeHtml(note.title).replace(/'/g, '&apos;');
        const escapedDesc = escapeHtml(note.description).replace(/'/g, '&apos;');

        notesDiv.innerHTML += `
        <div class="note-card priority-${priorityClass}">
            <h3>${escapeHtml(note.title)}</h3>
            <div>
                <span class="status-badge status-${statusClass}">${note.status}</span>
                <span class="priority-badge priority-${priorityClass}">${note.priority}</span>
            </div>
            <p>${escapeHtml(note.description)}</p>
            <p style="font-size: 12px; color: #999;">
                <strong>Created:</strong> ${new Date(note.created_at).toLocaleString()}<br>
                <strong>Updated:</strong> ${new Date(note.updated_at).toLocaleString()}
            </p>
            <button class="edit-btn" onclick="showEditModal(${note.id}, '${note.title}', '${escapedDesc}', '${note.status}', '${note.priority}')">Edit</button>
            <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
        </div>
    `;
    });
}

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add event listeners to filters
document.querySelectorAll('input[name="statusFilter"]').forEach(radio => {
    radio.addEventListener('change', displayNotes);
});

document.querySelectorAll('input[name="priorityFilter"]').forEach(radio => {
    radio.addEventListener('change', displayNotes);
});

// Clear filters button
document.getElementById('clearFilters').addEventListener('click', () => {
    document.querySelector('input[name="statusFilter"][value="all"]').checked = true;
    document.querySelector('input[name="priorityFilter"][value="none"]').checked = true;
    displayNotes();
});

// Add note
document.getElementById("addNote").addEventListener("click", () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const status = document.getElementById("status").value;
    const priority = document.getElementById("priority").value;

    if (!title.trim()) {
        alert("Please enter a title!");
        return;
    }

    fetch("http://127.0.0.1:8000/notes/", {
        method: "POST",
        headers,
        body: JSON.stringify({ title, description, status, priority })
    })
        .then(res => res.json())
        .then(() => {
            fetchNotes();
            document.getElementById("title").value = "";
            document.getElementById("description").value = "";
            document.getElementById("status").value = "Pending";
            document.getElementById("priority").value = "Low";
        })
        .catch(error => {
            console.error("Error adding note:", error);
            alert("Failed to add note. Please try again.");
        });
});

// Delete note
function deleteNote(id) {
    if (!confirm("Are you sure you want to delete this note?")) {
        return;
    }

    fetch(`http://127.0.0.1:8000/notes/${id}/`, {
        method: "DELETE",
        headers
    })
        .then(() => {
            fetchNotes();
        })
        .catch(error => {
            console.error("Error deleting note:", error);
            alert("Failed to delete note. Please try again.");
        });
}

// Edit modal
function showEditModal(id, title, description, status, priority) {
    currentEditId = id;
    document.getElementById("editTitle").value = title;
    console.log(title);
    document.getElementById("editDescription").value = description;
    document.getElementById("editStatus").value = status;
    document.getElementById("editPriority").value = priority;

    document.getElementById("editModal").style.display = "block";
    document.getElementById("modalOverlay").style.display = "block";
}

function closeEditModal() {
    document.getElementById("editModal").style.display = "none";
    document.getElementById("modalOverlay").style.display = "none";
}

// Close modal when clicking overlay
document.getElementById("modalOverlay").addEventListener("click", closeEditModal);

// Save edit
document.getElementById("saveEdit").addEventListener("click", () => {
    const title = document.getElementById("editTitle").value;
    const description = document.getElementById("editDescription").value;
    const status = document.getElementById("editStatus").value;
    const priority = document.getElementById("editPriority").value;

    if (!title.trim()) {
        alert("Please enter a title!");
        return;
    }

    fetch(`http://127.0.0.1:8000/notes/${currentEditId}/`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ title, description, status, priority })
    })
        .then(() => {
            fetchNotes();
            closeEditModal();
        })
        .catch(error => {
            console.error("Error updating note:", error);
            alert("Failed to update note. Please try again.");
        });
});

// Initial fetch
fetchNotes();