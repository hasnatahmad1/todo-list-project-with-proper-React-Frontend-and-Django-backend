import './HomePage.css'

export function HomePage() {
    return (
        <>
            <title>Todo List</title>


            <header>
                <span id="userEmail"></span>
                <button id="logoutBtn">Logout</button>
            </header>

            <div className="container">
                <aside className="filters-sidebar">
                    <h3>Filters</h3>

                    <div className="filter-section">
                        <h4>Status</h4>
                        <label><input type="radio" name="statusFilter" value="all" checked /> All</label>
                        <label><input type="radio" name="statusFilter" value="Pending" /> Pending</label>
                        <label><input type="radio" name="statusFilter" value="InProgress" /> In Progress</label>
                        <label><input type="radio" name="statusFilter" value="Completed" /> Completed</label>
                        <label><input type="radio" name="statusFilter" value="Cancelled" /> Cancelled</label>
                    </div>

                    <div className="filter-section">
                        <h4>Sort by Priority</h4>
                        <label><input type="radio" name="priorityFilter" value="none" checked /> None</label>
                        <label><input type="radio" name="priorityFilter" value="high-to-low" /> High to Low</label>
                        <label><input type="radio" name="priorityFilter" value="low-to-high" /> Low to High</label>
                    </div>

                    <button id="clearFilters" className="clear-btn">Clear Filters</button>
                </aside>


                <main className="main-content">
                    <h2>My To-Do List</h2>

                    <input type="text" id="title" placeholder="Title" />
                    <input type="text" id="description" placeholder="Description" />
                    <select id="status">
                        <option>Pending</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                        <option>InProgress</option>
                    </select>
                    <select id="priority">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                    <button id="addNote">Add Note</button>

                    <hr />

                    <div id="notesList"></div>
                </main>
            </div>

            <div id="modalOverlay"></div>


            <div id="editModal">
                <h3>Edit Note</h3>
                <input type="text" id="editTitle" placeholder="Title" />
                <input type="text" id="editDescription" placeholder="Description" />
                <select id="editStatus">
                    <option>Pending</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                    <option>InProgress</option>
                </select>
                <select id="editPriority">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
                <button id="saveEdit">Save</button>
                <button onClick="closeEditModal()">Cancel</button>
            </div>
        </>
    );
}