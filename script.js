// Переменные с нужными элементами
const input = document.querySelector(".main-input");
const optionWrapper = document.querySelector(".main-option-wrapper");
const taskWrapper = document.querySelector(".main-task-wrapper");
const add = document.querySelector(".main-add");
const footer = document.querySelector(".main-footer");

// Массив задач
let todos = [];

document.addEventListener("DOMContentLoaded", () => {
  const data = localStorage.getItem("todos");
  todos = data ? JSON.parse(data) : [];
  renderTodos();
});

//Добавление сущности(задачи) в массив задач
function addTodo(text) {
  todos.push({
    text: text,
    id: `${Date.now()}`,
    isDone: false,
  });
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

add.addEventListener("click", () => {
  const inputValue = input.value;
  if (input.value.trim() === "") {
    alert("Пустая строка!");
  } else {
    addTodo(inputValue);
    input.value = "";
  }
});

function createTodo({ id, isDone, text }) {
  const li = document.createElement("li");
  const div = document.createElement("div");
  const buttons = document.createElement("div");

  div.className = "main-option-item";
  div.innerHTML = `                <input type="checkbox" ${
    isDone ? "checked" : ""
  }  id="${id}" class="main-checkbox" />
  <p class="main-task">${text}</p>`;

  buttons.className = "main-buttons-wrapper";
  buttons.innerHTML = `  <p class='main-change'>✏️</p>
  <p class="main-delete">🗑</p>`;

  li.className = "main-option";
  li.prepend(div);
  taskWrapper.prepend(li);
  li.append(buttons);

  const title = li.querySelector(".main-task");
  const change = li.querySelector(".main-change");
  const save = document.createElement("p");
  save.className = ".main-save";
  save.textContent = "✅";
  change.addEventListener("click", () => {
    const save = document.createElement("p");
    const changeInput = document.createElement("input");
    changeInput.className = "main-input-change";
    changeInput.value = title.textContent;

    title.replaceWith(changeInput);
    change.replaceWith(save);

    save.className = "main-save";
    save.innerHTML = "✅";

    save.addEventListener("click", () => {
      changeInput.replaceWith(title);
      save.replaceWith(change);
      title.textContent = changeInput.value;
      const toggleditem = todos.find((todo) => todo.text === text);
      toggleditem.text = title.textContent;
      renderTodos();
      localStorage.setItem("todos", JSON.stringify(todos));
    });
  });
  const crossDel = li.querySelector(".main-delete");
  crossDel.addEventListener("click", () => deleteTodo(id));
  const checkBox = div.querySelector(".main-checkbox");
  checkBox.addEventListener("change", () => {
    toggleIsDone(id);
    localStorage.setItem("todos", JSON.stringify(todos));
  });
}

function renderTodos() {
  taskWrapper.innerHTML = "";
  footer.innerHTML = "";
  todos.forEach(createTodo);
  const footerWrapper = document.createElement("div");
  footerWrapper.className = "main-footer-wrapper";
  footerWrapper.innerHTML = `<button type="button" class="main-delete-completed">
  Удалить завершенные
  </button>
  <button type="button" class="main-delete-all">Удалить все</button>`;
  footer.append(footerWrapper);
  const deleteCompletedButt = footerWrapper.querySelector(
    `.main-delete-completed`
  );
  const deleteAllButt = footerWrapper.querySelector(".main-delete-all");
  deleteAllButt.addEventListener("click", () => deleteAll());

  deleteCompletedButt.addEventListener("click", () => deleteCompleted());
  if (todos.length === 0) {
    footerDisplay();
  }
  changePadding();
}

// Удвление задачи (одной конкретной)
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id != id);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

// Удаление всех задач
function deleteAll() {
  todos.length = 0;
  localStorage.setItem("todos", JSON.stringify(todos));
  taskWrapper.innerHTML = "";
  footerDisplay();
  changePadding();
}

// Удаление выполненных задач (isDone: true)
function deleteCompleted() {
  todos = todos.filter((todo) => !todo.isDone);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
  changePadding();
}

// Отображение footer
function footerDisplay() {
  const footer = document.querySelector(".main-footer");
  const footerWrapper = document.querySelector(".main-footer-wrapper");

  footer.innerHTML = "";
  footerWrapper.innerHTML = "";
}

function toggleIsDone(id) {
  const toggleditem = todos.find((todo) => todo.id === id);
  toggleditem.isDone = !toggleditem.isDone;
}

function changePadding() {
  if (todos.length > 0) {
    optionWrapper.style.paddingTop = "32px";
  } else {
    optionWrapper.style.paddingTop = "";
  }
}

// Кнопка добавления

// add.addEventListener("click", () => {
//   const inputValue = input.value;
//   inputValue !== "" ? addTask(inputValue) : alert("Пустая строка!");
//   input.value = "";
// });

// // Кнопка удаления всех элементов
// deleteAll.addEventListener("click", () => {
//   optionWrapper.innerHTML = "";
// });

// // Отрисовка элемента с функциями удаления
// function renderTodo(obj) {
//   const todo = document.createElement("div");
//   todo.className = "main-task-wrapper";
//   todo.innerHTML = `<input type="checkbox" name="" id="" class="main-checkbox" />
//               <p class="main-task">
//                 ${obj.text}
//               </p>
//               <p class="main-delete">❌</p>`;
//   optionWrapper.append(todo);
//   const deleteCross = todo.querySelector(".main-delete");
//   deleteCross.addEventListener("click", () => {
//     optionWrapper.removeChild(todo);
//   });
//   const checkBox = todo.querySelector(".main-checkbox");
//   checkBox.addEventListener("click", () => {
//     const checkTask = todo.querySelector(".main-task");
//     checkTask.style.textDecoration = checkBox.checked ? "line-through" : "none";
//   });
// }

// deleteCompleted.addEventListener("click", () => {
//   const tasks = document.querySelectorAll(".main-task-wrapper");
//   tasks.forEach((task) => {
//     const checkTask = task.querySelector(".main-task");
//     if (checkTask.style.textDecoration === "line-through") {
//       optionWrapper.removeChild(task);
//     }
//   });
// });
