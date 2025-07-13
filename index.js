// Global Task Lists
var todoList = []
var comdoList = []
var remList = []

// Element Selectors
var addButton = document.getElementById("add-button")
var todoInput = document.getElementById("todo-input")
var deleteAllButton = document.getElementById("delete-all")
var allTodos = document.getElementById("all-todos")
var deleteSButton = document.getElementById("delete-selected")

// Button Event Listeners
addButton.addEventListener("click", (e) => {
    e.preventDefault()
    add()
})

todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault()
        add()
    }
})

// Delete All & Selected Buttons
deleteAllButton.addEventListener("click", deleteAll)
deleteSButton.addEventListener("click", deleteSelected)

// Filter Buttons
document.addEventListener("click", (e) => {
    const className = e.target.className.split(" ")[0]
    if (className === "complete" || className === "ci") completeTodo(e)
    if (className === "delete" || className === "di") deleteTodo(e)
    if (e.target.id === "all") viewAll()
    if (e.target.id === "rem") viewRemaining()
    if (e.target.id === "com") viewCompleted()
})

// Add Task
function add() {
    var value = todoInput.value.trim()
    if (value === '') {
        alert("😮 Task cannot be empty")
        return
    }

    todoList.push({
        task: value,
        id: `${Date.now().toString()}-${Math.floor(Math.random() * 1000)}`,
        complete: false
    })

    todoInput.value = ''
    update()
    render(todoList)
}

// Render Tasks to the UI
function render(list) {
    allTodos.innerHTML = ""
    list.forEach(item => {
        var element = `
            <li id="${item.id}" class="todo-item">
                <p id="task">${item.complete ? `<strike>${item.task}</strike>` : item.task}</p>
                <div class="todo-actions">
                    <button class="complete btn btn-success">
                        <i class="ci bx bx-check bx-sm"></i>
                    </button>
                    <button class="delete btn btn-error">
                        <i class="di bx bx-trash bx-sm"></i>
                    </button>
                </div>
            </li>
        `
        allTodos.innerHTML += element
    })
}

// Toggle Complete
function completeTodo(e) {
    var id = e.target.closest(".todo-item").id
    todoList.forEach(task => {
        if (task.id === id) task.complete = !task.complete
    })
    update()
    render(todoList)
}

// Delete Single Task
function deleteTodo(e) {
    var id = e.target.closest(".todo-item").id
    todoList = todoList.filter(task => task.id !== id)
    update()
    render(todoList)
}

// Delete All Tasks
function deleteAll() {
    todoList = []
    update()
    render(todoList)
}

// Delete Only Completed Tasks
function deleteSelected() {
    todoList = todoList.filter(task => !task.complete)
    update()
    render(todoList)
}

// Filter Functions
function viewCompleted() {
    render(comdoList)
}
function viewRemaining() {
    render(remList)
}
function viewAll() {
    render(todoList)
}

// Update Task Counts
function update() {
    comdoList = todoList.filter(task => task.complete)
    remList = todoList.filter(task => !task.complete)

    document.getElementById("c-count").innerText = comdoList.length.toString()
    document.getElementById("r-count").innerText = todoList.length.toString()
}

