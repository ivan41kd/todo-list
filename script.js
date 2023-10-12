
const input = document.querySelector(".main-input");
const optionWrapper = document.querySelector(".main-option-wrapper");
const taskWrapper = document.querySelector(".main-task-wrapper");
const add = document.querySelector(".main-add");
const footer = document.querySelector(".main-footer");

let todos = [];

document.addEventListener("DOMContentLoaded", () => {
  const data = localStorage.getItem("todos");
  todos = data ? JSON.parse(data) : [];
  renderTodos();
});

function addTodo(text) {
  todos.unshift({
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
  taskWrapper.append(li);
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
      if (changeInput.value === "") {
        changeInput.value = title.textContent;
      }
      title.textContent = changeInput.value;
      const changedText = todos.find((todo) => todo.text === text);
      changedText.text = title.textContent;
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

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id != id);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

function deleteAll() {
  todos.length = 0;
  localStorage.setItem("todos", JSON.stringify(todos));
  taskWrapper.innerHTML = "";
  footerDisplay();
  changePadding();
}

function deleteCompleted() {
  todos = todos.filter((todo) => !todo.isDone);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
  changePadding();
}

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

