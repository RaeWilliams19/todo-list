const taskArray = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

function generateTitle(title, element) {
  const h1 = document.createElement('h1');
  const text = document.createTextNode(title);
  h1.setAttribute('class', 'card-title');
  h1.appendChild(text);
  element.appendChild(h1);
}

function generateDescription(description, element) {
  const h5 = document.createElement('h5');
  const text = document.createTextNode(description);
  h5.setAttribute('class', 'card-description');
  h5.appendChild(text);
  element.appendChild(h5);
}

function deleteTask(element) {
  const title = element.childNodes[0].textContent;
  const description = element.childNodes[1].textContent;

  taskArray.forEach((item) => {
    if (item.title === title && item.description === description) {
      const taskIndex = taskArray.indexOf(item);
      taskArray.splice(taskIndex, 1);
      localStorage.setItem('tasks', JSON.stringify(taskArray));
    }
  });
}

function createRemoveBtn(element, status) {
  const button = document.createElement('button');
  button.textContent = 'REMOVE';

  button.setAttribute('class', `${status ? 'btn btn--remove' : 'btn btn--remove hidden'}`);

  button.onclick = () => {
    deleteTask(element);
    element.remove();
  };

  element.appendChild(button);
}

function toggleTaskStatus(element) {
  const title = element.childNodes[0].textContent;
  const description = element.childNodes[1].textContent;
  const removeBtn = element.childNodes[2];
  const card = taskArray.find(task => task.title === title && task.description === description);

  element.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') {
      card.isDone = !card.isDone;
      element.classList.toggle('done');
      removeBtn.classList.toggle('hidden');
      localStorage.setItem('tasks', JSON.stringify(taskArray));
    }
  });
}

function generateTimeStamp(element) {
  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const p = document.createElement('p');
  const text = document.createTextNode(today);
  p.setAttribute('class', 'timestamp');
  p.appendChild(text);
  element.appendChild(p);
}

function createCard(title, description, status) {
  const div = document.createElement('div');
  const cardContainer = document.getElementsByClassName('card-container')[0];

  div.setAttribute('class', `card ${status ? 'done' : ''}`);

  cardContainer.appendChild(div);
  generateTitle(title, div);
  generateDescription(description, div);
  createRemoveBtn(div, status);
  generateTimeStamp(div);
  toggleTaskStatus(div);
}

function addNewToDo() {
  const addTaskBtn = document.getElementsByClassName('btn--add')[0];
  addTaskBtn.addEventListener('click', () => {
    const cardTitle = document.getElementById('title').value.toUpperCase();
    const cardDescription = document.getElementById('description').value.toUpperCase();
    const card = {
      title: cardTitle,
      description: cardDescription,
      isDone: false,
    };

    taskArray.push(card);
    createCard(cardTitle, cardDescription, card.isDone);

    localStorage.setItem('tasks', JSON.stringify(taskArray));
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
  });
}

function getTasks() {
  if (localStorage.getItem('tasks')) {
    const data = JSON.parse(localStorage.getItem('tasks'));
    data.forEach((obj) => {
      createCard(obj.title, obj.description, obj.isDone);
    });
  }
}

function sort() {
  const sortAZ = document.getElementsByClassName('btn--sortAZ')[0];
  const sortZA = document.getElementsByClassName('btn--sortZA')[0];

  sortAZ.addEventListener('click', () => {
    let taskItems = document.getElementsByClassName('card');
    taskItems = [...taskItems];
    taskItems.sort((a, b) => a.textContent.localeCompare(b.textContent));

    for (let i = 0; i < taskItems.length; i += 1) {
      const parent = taskItems[i].parentNode;
      const detatchedTask = parent.removeChild(taskItems[i]);
      parent.appendChild(detatchedTask);
    }
  });

  sortZA.addEventListener('click', () => {
    let taskItems = document.getElementsByClassName('card');
    taskItems = [...taskItems];
    taskItems.sort((a, b) => b.textContent.localeCompare(a.textContent));

    for (let i = 0; i < taskItems.length; i += 1) {
      const parent = taskItems[i].parentNode;
      const detatchedTask = parent.removeChild(taskItems[i]);
      parent.appendChild(detatchedTask);
    }
  });
}

window.onload = function start() {
  addNewToDo();
  getTasks();
  sort();
};
