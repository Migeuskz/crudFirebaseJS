// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNTVPKdpIvkNcMYyC_nxXqD8mCKDv-6Fg",
  authDomain: "fir-crudjs-6a036.firebaseapp.com",
  projectId: "fir-crudjs-6a036",
  storageBucket: "fir-crudjs-6a036.appspot.com",
  messagingSenderId: "13073217235",
  appId: "1:13073217235:web:c8ef28c9fa1416780a8626"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
const storage = getStorage(app);

export const saveTask = (title, description, imageUrl) =>
  addDoc(collection(db, 'tasks'), { title, description, imageUrl });

export const getTasks = () => getDocs(collection(db, 'tasks'));

export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback);

export const deleteTask = (id) => deleteDoc(doc(db, 'tasks', id));

export const getTask = (id) => getDoc(doc(db, 'tasks', id));
//hola mundo
export const updateTask = (id, newFields) => updateDoc(doc(db, 'tasks', id), newFields);


export const saveImage = file => {
  const storageRef = ref(storage, `images/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //console.log('Upload is ' + progress + '% done');
      //document.querySelector('#progress').value = 'Upload is ' + progress + '% done';
      document.querySelector('#progress').value = progress;
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //document.querySelector('#progress').value = 'Fin!';
        document.querySelector('#image').src = downloadURL;
        console.log('File available at', downloadURL);
      });
    }
  );
}