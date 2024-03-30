document.addEventListener("DOMContentLoaded", function () {
    const todoInput = document.getElementById("todo-input");
    const addButton = document.getElementById("add-button");
    const allTodosList = document.getElementById("all-todos");
    const deleteSelectedButton = document.getElementById("delete-selected");
    const deleteAllButton = document.getElementById("delete-all");
    const filterButtons = document.querySelectorAll(".dropdown-content a");
    const completedCount = document.getElementById("c-count");
    const remainingCount = document.getElementById("r-count");

    let todos = [];

    function renderTodos() {
        allTodosList.innerHTML = "";
        todos.forEach((todo, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <input type="checkbox" data-index="${index}" ${
                todo.completed ? "checked" : ""
                }/>
                <span>${todo.text}</span>
            `;
            allTodosList.appendChild(listItem);
        });

        const completedTodos = todos.filter((todo) => todo.completed);
        completedCount.textContent = completedTodos.length;
        remainingCount.textContent = todos.length;
    }

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText !== "") {
            todos.push({ text: todoText, completed: false });
            renderTodos();
            todoInput.value = "";
        }
    }

    function deleteSelected() {
        todos = todos.filter((todo) => !todo.completed);
        renderTodos();
    }

    function deleteAll() {
        todos = [];
        renderTodos();
    }

    function handleCheckboxChange(index) {
        todos[index].completed = !todos[index].completed;
        renderTodos();
    }

    addButton.addEventListener("click", addTodo);
    deleteSelectedButton.addEventListener("click", deleteSelected);
    deleteAllButton.addEventListener("click", deleteAll);

    filterButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const filterType = this.id;
            if (filterType === "all") {
                renderTodos();
            } else if (filterType === "rem") {
                const remainingTodos = todos.filter((todo) => !todo.completed);
                allTodosList.innerHTML = "";
                remainingTodos.forEach((todo, index) => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `
                        <input type="checkbox" data-index="${index}"/>
                        <span>${todo.text}</span>
                    `;
                    allTodosList.appendChild(listItem);
                });
            } else if (filterType === "com") {
                const completedTodos = todos.filter((todo) => todo.completed);
                allTodosList.innerHTML = "";
                completedTodos.forEach((todo, index) => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `
                        <input type="checkbox" data-index="${index}" checked/>
                        <span>${todo.text}</span>
                    `;
                    allTodosList.appendChild(listItem);
                });
            }
        });
    });

    allTodosList.addEventListener("change", function (event) {
        if (event.target.type === "checkbox") {
            const index = event.target.getAttribute("data-index");
            handleCheckboxChange(index);
        }
    });
});
