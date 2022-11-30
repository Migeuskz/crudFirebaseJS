import {
    saveTask,
    getTasks,
    onGetTasks,
    deleteTask,
    getTask,
    updateTask,
    saveImage
} from "./firebase.js";

const taskForm = document.getElementById('task-form');
const taskContainer = document.getElementById('task-container');

let editStatus = false;
let id = '';

const uploadFileAction = (e) => {
    const file = e.target.files[0];

    //console.log(file.type);
    saveImage(file);
}

window.addEventListener('DOMContentLoaded', async () => {

    onGetTasks((querySnapshot) => {
        let html = '';

        querySnapshot.forEach(doc => {
            const task = doc.data();
            html += `
                <div>
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>`;
            if (task.imageUrl) {
                html += ` <img src='${task.imageUrl}' width="300px">`

            }
            html += `
                    <button class='btn-delete' data-id="${doc.id}">Delete</button>
                    <button class='btn-edit' data-id="${doc.id}">Edit</button>
                </div> 
            `;
        });
        taskContainer.innerHTML = html;

        const btnsDelete = taskContainer.querySelectorAll('.btn-delete');

        btnsDelete.forEach(btn => {
            btn.addEventListener('click', ({ target: { dataset } }) => {
                deleteTask(dataset.id)
            })
        })

        const btnsEdit = taskContainer.querySelectorAll('.btn-edit');
        btnsEdit.forEach((btn) => {
            btn.addEventListener('click', async (e) => {
                const doc = await getTask(e.target.dataset.id);
                const task = doc.data();

                taskForm['task-title'].value = task.title;
                taskForm['task-description'].value = task.description;

                editStatus = true;
                id = e.target.dataset.id;

                taskForm['btn-task-form'].innerText = 'update';
            })
        })

        console.log(btnsDelete);
    });
    document.querySelector('#file-task').addEventListener('change', uploadFileAction);
});



taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = taskForm['task-title'].value;
    const description = taskForm['task-description'].value;
    const imageUrl = document.querySelector('#image').src;

    // saveTask(title.value, description.value);
    // console.log(title.value, description.value);
    if (title.length > 3 || description.length > 3) {

        if (!editStatus) {
            saveTask(title, description, imageUrl);
            document.querySelector('#image').src = '';

        } else {
            updateTask(id, {
                title: title,
                description: description,
            });

            editStatus = false;
        }

        taskForm.reset();
    } else {
        alert('Debes escribir algo 🤔');
    }
})


