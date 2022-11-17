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

        export const saveTask = (title, description) =>
            addDoc(collection(db, 'tasks'),{title, description});

        export const getTasks = () => getDocs(collection(db, 'tasks'));

        export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'),callback );

        export const deleteTask = (id) => deleteDoc(doc(db, 'tasks', id));

        export const getTask = (id) => getDoc(doc(db, 'tasks', id));
        
        export const updateTask = (id, newFields) => updateDoc(doc(db,'tasks', id), newFields);

        