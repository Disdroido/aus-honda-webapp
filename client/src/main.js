import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab  } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fab);



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { onUnmounted } from "vue";
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

const db = getFirestore();
const storeCollection = collection(db, 'store');

export const createStoreItem = store => {
    return storeCollection.add(store);
};

export const getStoreItem = async id => {
    const store = await storeCollection.doc(id).get();
    return store.exists ? store.data() : null;
};

export const updateStoreItem = (id, store) => {
    return storeCollection.doc(id).update(store);
};

export const deleteStoreItem = id => {
    return storeCollection.doc(id).delete();
};

export const useLoadStore = () => {
    const store = ref([]);
    const close = storeCollection.onSnapshot(snapshot => {
        store.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });
    onUnmounted(close);
    return store;
}



const app = createApp(App);

app.component('fa', FontAwesomeIcon);

app.use(router);

app.mount("#app");
