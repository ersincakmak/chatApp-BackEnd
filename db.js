const firebase = require("firebase")
const firebaseConfig = {
  apiKey: "AIzaSyCEWEXNA1u_plBMsSd7BjRPEHFd9yxotbw",
  authDomain: "iot-p1-4c39d.firebaseapp.com",
  databaseURL: "https://iot-p1-4c39d.firebaseio.com",
  projectId: "iot-p1-4c39d",
  storageBucket: "iot-p1-4c39d.appspot.com",
  messagingSenderId: "502896039378",
  appId: "1:502896039378:web:87338535544eec66b7240b",
}

const db = firebase.initializeApp(firebaseConfig)
module.exports = db
