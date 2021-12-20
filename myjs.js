const taskContainer = document.querySelector(".task__container");  
let globalStore = [];
console.log(taskContainer);

const generateNewCard = (taskData) =>`
 <div class="col-sm-12 col-md-6 col-lg-4" >
  <div class="card">
    <div class="card-header d-flex justify-content-end">
      <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
<button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"><i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i></button>
    </div>
    <div class="card-body">
      <img src=${taskData.imageUrl} class="card-img-top" alt="...">
      <h5 class="card-title mt-3 fw-bold text-primary">${taskData.taskTitle}</h5>
      <p class="card-text">${taskData.taskDescription} 
      </p>
      <a href="#" class="btn btn-primary">${taskData.taskType}</a>
    </div>
  </div>
</div>`;


const loadInitialCardData = () => {
  //local storage to get tasky card data
  const getCardData = localStorage.getItem("tasky");
  //convert to normal object
  const {cards} = JSON.parse(getCardData);
  //loop over those array of task object to create html card and inject it to DOM
  cards.map((cardObject) => {
    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(cardObject));
  
  //update your globalstore
  globalStore.push(cardObject);
  })
};

//delete function
const deleteCard = (event) => 
{
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
  localStorage.setItem("tasky",JSON.stringify({cards: globalStore}));

  if (tagname == "BUTTON")
  {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }
  else {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);

  }
};

const saveChanges = () => {
 const taskData = {
     id: `${Date.now()}`,
     imageUrl: document.getElementById("ImageUrl").value,
     taskTitle: document.getElementById("TaskTitle").value,
     taskType: document.getElementById("TaskType").value,
     taskDescription: document.getElementById("TaskDescription").value

 };

 console.log(taskData);

 taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData) ) ;

 globalStore.push(taskData);
 localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
};



