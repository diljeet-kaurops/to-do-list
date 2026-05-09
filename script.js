const taskList =
document.getElementById("taskList");

let tasks =
JSON.parse(localStorage.getItem("tasks"))
|| [];

renderTasks();

function addTask(){

  const title =
  document.getElementById("title").value;

  const description =
  document.getElementById("description").value;

  const time =
  document.getElementById("time").value;

  const priority =
  document.getElementById("priority").value;

  if(title.trim() === ""){

    alert("Please enter task title");

    return;
  }

  const task = {

    id:Date.now(),

    title,

    description,

    time,

    priority,

    completed:false
  };

  tasks.push(task);

  saveTasks();

  clearInputs();

  renderTasks();
}

function renderTasks(){

  if(tasks.length === 0){

    taskList.innerHTML = `

      <div class="empty">
        No tasks added yet...
      </div>

    `;

    updateStats();

    return;
  }

  taskList.innerHTML = "";

  tasks.forEach(task => {

    const div =
    document.createElement("div");

    div.className =
    `task ${task.completed ? "completed" : ""}`;

    div.innerHTML = `

      <div class="left">

        <h3 class="task-title">
          ${task.title}
        </h3>

        <p class="desc">
          ${task.description || "No description added"}
        </p>

        <div class="info">

          <span class="tag">
            ⏰ ${task.time || "No Time"}
          </span>

          <span class="tag ${task.priority}">
            ${task.priority.toUpperCase()}
          </span>

        </div>

      </div>

      <div class="right">

        <button
          class="complete"
          onclick="toggleTask(${task.id})"
        >
          ${task.completed ? "Undo" : "Done"}
        </button>

        <button
          class="delete"
          onclick="deleteTask(${task.id})"
        >
          Delete
        </button>

      </div>

    `;

    taskList.appendChild(div);

  });

  updateStats();
}

function toggleTask(id){

  tasks = tasks.map(task => {

    if(task.id === id){

      task.completed =
      !task.completed;
    }

    return task;
  });

  saveTasks();

  renderTasks();
}

function deleteTask(id){

  tasks =
  tasks.filter(task =>
    task.id !== id
  );

  saveTasks();

  renderTasks();
}

function saveTasks(){

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );
}

function clearInputs(){

  document.getElementById("title").value = "";

  document.getElementById("description").value = "";

  document.getElementById("time").value = "";
}

function updateStats(){

  document.getElementById("total")
  .textContent = tasks.length;

  const completedTasks =
  tasks.filter(task =>
    task.completed
  ).length;

  document.getElementById("completed")
  .textContent = completedTasks;
}

