
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on pages containing the Kanban board container
    const board = document.querySelector('.flex.flex-wrap.-m-4');
    if (!board) {
        return;
    }

    // Importing SortableJS
    const Sortable = window.Sortable;

    // Function to create a new task card
    function createTask(title, description, isComplete) {
        const taskCard = document.createElement('div');
        taskCard.className = 'p-4 bg-white rounded-lg shadow-md mb-4';
        taskCard.innerHTML = `
            <h2 class="text-lg font-medium text-gray-900">${title}</h2>
            <p class="text-gray-500">${description}</p>
            <input type="checkbox" ${isComplete ? 'checked' : ''}> Complete
        `;
        return taskCard;
    }

    // Function to create a new column
    function createColumn(name) {
        const column = document.createElement('div');
        column.className = 'p-4 w-full md:w-1/3';
        column.innerHTML = `
            <div class="h-full bg-gray-200 rounded-lg overflow-hidden">
                <div class="p-6">
                    <h1 class="title-font text-lg font-medium text-gray-900 mb-3">${name}</h1>
                    <div class="task-container"></div>
                    <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Task</button>
                </div>
            </div>
        `;

        // Adding functionality to 'Add Task' button
        const addButton = column.querySelector('button');
        if (addButton) {
            addButton.addEventListener('click', () => {
            const title = prompt('Enter task title:');
            const description = prompt('Enter task description:');
            if (title && description) {
                const taskContainer = column.querySelector('.task-container');
                taskContainer.appendChild(createTask(title, description, false));
            }
        });

        return column;
    }

    // Adding drag-and-drop functionality
    function addDragAndDrop(container) {
        new Sortable(container, {
            group: 'shared',
            animation: 150,
            ghostClass: 'bg-blue-100',
        });
    }

    // Adding the columns to the board
    const columns = ['To Do', 'In Progress', 'Completed'];
    columns.forEach(colName => {
        const col = createColumn(colName);
        board.appendChild(col);
        const container = col.querySelector('.task-container');
        if (container) {
            addDragAndDrop(container);
        }
    });
});

// Load SortableJS from CDN
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/sortablejs@1.14.0/Sortable.min.js';
script.onload = () => console.log('SortableJS loaded');
document.head.appendChild(script);
