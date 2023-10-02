// Переменные с нужными элементами
const task = document.querySelector(".main-task");
const deleteCompleted = document.querySelector(".main-delete-completed");
const input = document.querySelector(".main-input");
const optionWrapper = document.querySelector(".main-option-wrapper");
const taskWrapper = document.querySelector(".main-task-wrapper");
const add = document.querySelector(".main-add");
const deleteAll = document.querySelector(".main-delete-all");

// Добавление задачи
function addTask(text) {
  const date = Date.now();
  const todoObj = {
    id: date,
    text,
  };
  renderTodo(todoObj);
}

// Кнопка добавления
add.addEventListener("click", () => {
  const inputValue = input.value;
  addTask(inputValue);
  input.value = "";
});

// Кнопка удаления всех элементов
deleteAll.addEventListener("click", () => {
  optionWrapper.innerHTML = "";
});

// Отрисовка элемента с функциями удаления
function renderTodo(obj) {
  const todo = document.createElement("div");
  todo.className = "main-task-wrapper";
  todo.innerHTML = `<input type="checkbox" name="" id="" class="main-checkbox" />
              <p class="main-task">
                ${obj.text}
              </p>
              <p class="main-delete">❌</p>`;
  optionWrapper.append(todo);
  const deleteCross = todo.querySelector(".main-delete");
  deleteCross.addEventListener("click", () => {
    optionWrapper.removeChild(todo);
  });
  const checkBox = todo.querySelector(".main-checkbox");
  checkBox.addEventListener("click", () => {
    const checkTask = todo.querySelector(".main-task");
    checkTask.style.textDecoration = checkBox.checked ? "line-through" : "none";
  });
}

// Удаление завершенных задач
deleteCompleted.addEventListener("click", () => {
  const tasks = document.querySelectorAll(".main-task-wrapper");
  tasks.forEach((task) => {
    const checkTask = task.querySelector(".main-task");
    if (checkTask.style.textDecoration === "line-through") {
      optionWrapper.removeChild(task);
    }
  });
});
