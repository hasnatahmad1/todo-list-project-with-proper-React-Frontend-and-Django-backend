import axios from 'axios';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import './HomePage.css'

export function HomePage() {
    const [notesList, setNotesList] = useState([]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');
    const [priority, setPriority] = useState('Low');

    const [isEditModal, setIsEditModel] = useState(false);
    const [isModalOverlay, setIsModalOverlay] = useState(false);

    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editStatus, setEditStatus] = useState('');
    const [editPriority, setEditPriority] = useState('');

    const [filterStatus, setFilterStatus] = useState('');
    const [filterPriority, setFilterPriority] = useState('');

    const token = localStorage.getItem("access_token");
    console.log(localStorage.getItem("access_token"));
    const userEmail = JSON.parse(localStorage.getItem("user_email"));

    const navigateToLoginPage = useNavigate();

    useEffect(() => {
        if (!token) {
            navigateToLoginPage('/');
        }
    }, []);

    const toggleLogoutButton = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_email");

        navigateToLoginPage('/');
    };



    const fetchNotesList = async () => {
        const response = await axios.get('http://127.0.0.1:8000/notes/', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        setNotesList(response.data);
    };


    useEffect(() => {
        fetchNotesList();
    }, []);

    console.log(notesList);


    const deleteNote = async (id) => {
        await axios.delete(`http://127.0.0.1:8000/notes/${id}/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        fetchNotesList();
    };




    const showEditModal = (id, title, description, status, priority) => {
        setEditId(id);
        setEditTitle(title);
        setEditDescription(description);
        setEditStatus(status);
        setEditPriority(priority);

        setIsEditModel(true);
        setIsModalOverlay(true);
    };

    function closeEditModal() {
        setIsEditModel(false);
        setIsModalOverlay(false);
    }

    const toggleSaveEditButton = async () => {
        await axios.put(`http://127.0.0.1:8000/notes/${editId}/`, {
            title: editTitle,
            description: editDescription,
            status: editStatus,
            priority: editPriority
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        fetchNotesList();
        closeEditModal();
    };




    const toggleAddNoteButton = async () => {
        console.log(title, description, status, priority);
        if ((title === "") && (description === "")) {
            alert('Title and Description cannot be empty');
            return;
        }
        else if (title === '') {
            alert('Title cannot be Empty')
            return;
        }
        else if (description === "") {
            alert('Description cannot be empty')
            return;
        }
        else {
            await axios.post("http://127.0.0.1:8000/notes/", {
                title: title,
                description,
                status,
                priority
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            await fetchNotesList();

            setTitle('');
            setDescription('');
            setStatus('Pending');
            setPriority('Low');
        }
    };

    const getFilteredNotes = () => {
        let filtered = notesList;

        // Status filter
        if (filterStatus) {
            filtered = filtered.filter(note => note.status === filterStatus);
        }

        // Priority sort
        if (filterPriority === 'Low-to-High') {
            filtered = filtered.sort((a, b) => {
                const priorityOrder = { 'Low': 1, 'Medium': 2, 'High': 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            });
        } else if (filterPriority === 'High-to-Low') {
            filtered = filtered.sort((a, b) => {
                const priorityOrder = { 'Low': 1, 'Medium': 2, 'High': 3 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            });
        }

        return filtered;
    };

    return (
        <>
            <title>Todo List</title>


            <header>
                <span id="userEmail">
                    {userEmail}
                </span>
                <button
                    id="logoutBtn"
                    onClick={toggleLogoutButton}
                >Logout</button>
            </header>

            <h2>My To-Do List</h2>

            <input
                type="text"
                id="title"
                placeholder="Title"
                value={title}
                onChange={(event) => {
                    setTitle(event.target.value);
                }}
            />
            <input type="text" id="description" placeholder="Description" value={description} onChange={(event) => {
                setDescription(event.target.value);
            }} />
            <select id="status" value={status} onChange={(event) => {
                setStatus(event.target.value);
            }}>
                <option>Pending</option>
                <option>Completed</option>
                <option>Cancelled</option>
                <option>InProgress</option>
            </select>
            <select value={priority} id="priority" onChange={(event) => {
                setPriority(event.target.value);
            }}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>
            <button
                id="addNote"
                onClick={toggleAddNoteButton}
            >Add Note</button>

            <hr />

            <div style={{ marginBottom: '20px' }}>
                <h3>Filter Notes</h3>
                <select value={filterStatus} onChange={(event) => {
                    setFilterStatus(event.target.value);
                }}>
                    <option value="">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="InProgress">InProgress</option>
                </select>

                <select value={filterPriority} onChange={(event) => {
                    setFilterPriority(event.target.value);
                }} style={{ marginLeft: '10px' }}>
                    <option value="">No Sort</option>
                    <option value="Low-to-High">Low to High</option>
                    <option value="High-to-Low">High to Low</option>
                </select>
            </div>

            <div id="notesList">
                {
                    getFilteredNotes().map((note) => {
                        return (
                            <div key={note.id} className="note-card">
                                <h3>{note.title} ({note.status}, {note.priority})</h3>
                                <p>{note.description}</p>
                                <p>Created: {new Date(note.created_at).toLocaleString()}</p>
                                <p>Last Updated: {new Date(note.updated_at).toLocaleString()}</p>
                                <button
                                    className="delete-btn"
                                    onClick={() => { deleteNote(note.id) }}
                                >Delete</button>
                                <button
                                    className="edit-btn"
                                    onClick={() => { showEditModal(note.id, note.title, note.description, note.status, note.priority) }}
                                >Edit</button>
                            </div>
                        );
                    })
                }
            </div>


            <div id="modalOverlay" style={{
                display: isModalOverlay ? 'block' : 'none'
            }}></div>


            <div id="editModal" style={{
                display: isEditModal ? 'block' : 'none'
            }}>
                <h3>Edit Note</h3>
                <input type="text" id="editTitle" placeholder="Title" value={editTitle} onChange={(event) => {
                    setEditTitle(event.target.value);
                }} />
                <input type="text" id="editDescription" placeholder="Description" value={editDescription} onChange={(event) => {
                    setEditDescription(event.target.value);
                }} />
                <select id="editStatus" value={editStatus} onChange={(event) => {
                    setEditStatus(event.target.value);
                }}>
                    <option>Pending</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                    <option>InProgress</option>
                </select>
                <select id="editPriority" value={editPriority} onChange={(event) => {
                    setEditPriority(event.target.value);
                }}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
                <button id="saveEdit" onClick={toggleSaveEditButton}>Save</button>
                <button onClick={closeEditModal}>Cancel</button>
            </div >
        </>
    );
}