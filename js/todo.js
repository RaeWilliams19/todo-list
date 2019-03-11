window.onload = function(){
    addNewToDo();
    getTasks();
}

let taskArray = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

function addNewToDo(){
    document.getElementsByClassName('btn--add')[0].addEventListener('click', function() {    
        const cardTitle = document.getElementById('title').value.toUpperCase();
        const cardDescription = document.getElementById('description').value.toUpperCase();
        
        if (cardTitle === '' || cardDescription === ''){
            alert('Oops! Please enter a title and description of your task');
        } else {
            const card = {
                title: cardTitle,
                description: cardDescription
            }
            taskArray.push(card);
            createCard(cardTitle, cardDescription);
        }
        
        localStorage.setItem('tasks', JSON.stringify(taskArray));
        document.getElementById("title").value = '';
        document.getElementById("description").value = '';
    });
}

function getTasks(){
    if(localStorage.getItem('tasks')){
        const data = JSON.parse(localStorage.getItem('tasks'));
        data.forEach(obj => {
            createCard(obj.title, obj.description);
        })
    }
}

function createCard(title, description){
    const div = document.createElement('div');
    div.setAttribute('class', 'card');

    const cardContainer = document.getElementsByClassName('card-container')[0];
    cardContainer.appendChild(div);

    generateTitle(title, div);
    generateDescription(description, div);
    createRemoveBtn(div)
    generateTimeStamp(div);
    taskStatus(div);
}

function generateTitle(title, element){
    const h1 = document.createElement('h1');
    const text = document.createTextNode(title)
    h1.setAttribute('class', 'card-title');
    h1.appendChild(text);
    element.appendChild(h1);
}

function generateDescription(description, element){
    const p = document.createElement('p');
    const text = document.createTextNode(description);
    p.setAttribute('class', 'card-description');
    p.appendChild(text);
    element.appendChild(p);
}

function taskStatus(element){
    element.addEventListener('click', () => {
        const el = element.children;
        const removeBtn = element.children[2];
        for (let i = 0; i<2; i++) {
            const text = el[i];
            if (text.style.textDecoration === 'none'){
                text.style.textDecoration = 'line-through';
                element.style.backgroundColor = '#DCF0D9';
                removeBtn.style.display = 'inline';                
            } else {
                text.style.textDecoration = 'none';
                element.style.backgroundColor = 'aliceblue';
                removeBtn.style.display = 'none';                
            }
        }
    });
}

function createRemoveBtn(element){
    const button = document.createElement('button');
    button.setAttribute('class', 'btn btn--remove');
    button.textContent = 'REMOVE';
    button.style.display = 'none';
    button.onclick =  function(){
        deleteTask(element);
        element.remove();
    }
    element.appendChild(button);
}

function deleteTask(element){
    const taskTitle = element.childNodes[0].textContent;
    const taskDescription = element.childNodes[1].textContent;

    for(let i = 0; i < taskArray.length; i++ ){
        const obj = taskArray[i];
        if(obj.title === taskTitle && obj.description === taskDescription){
             const index = taskArray.indexOf(obj);
             taskArray.splice(index, 1);
             localStorage.setItem('tasks', JSON.stringify(taskArray));
        } 
    }
}

function generateTimeStamp(element){
    const today = new Date().toLocaleDateString('en-GB', {  
        day : 'numeric',
        month : 'numeric',
        year : 'numeric',
        hour: '2-digit',
	    minute: '2-digit'
    })
    
    const p = document.createElement('p');
    const text = document.createTextNode(today);
    p.setAttribute('class', 'timestamp');
    p.appendChild(text);
    element.appendChild(p);
}