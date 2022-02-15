import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHatWizard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDA_KVLrIcr9P8Y57NbbrbysUmZkHQTaYk",
  authDomain: "aus-honda.firebaseapp.com",
  projectId: "aus-honda",
  storageBucket: "aus-honda.appspot.com",
  messagingSenderId: "130997050838",
  appId: "1:130997050838:web:72d0b8ceee435b05a3d877"
};

initializeApp(firebaseConfig);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router);

app.mount("#app");
