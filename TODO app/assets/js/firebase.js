const firebaseConfig = {

    apiKey: "AIzaSyB6npmjKlByroUKxu9uHuiKrL3AUEXu7dk",
  
    authDomain: "todo-app-dd67f.firebaseapp.com",
  
    projectId: "todo-app-dd67f",
  
    storageBucket: "todo-app-dd67f.appspot.com",
  
    messagingSenderId: "711305155928",
  
    appId: "1:711305155928:web:1315950bd71d993365c12d",
  
    measurementId: "G-PLPZ9K1EPC"
  
  };
  
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  var db = firebase.firestore();
  