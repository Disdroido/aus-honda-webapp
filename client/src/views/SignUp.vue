
<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
        alt="Workflow"
      />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign Up
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div class="mt-1">
            <input
              v-model="email"
              type="text"
              required=""
              placeholder="aushonda@gmail.com"
              class="appearance-none block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-aushondared focus:border-aushondared sm:text-sm duration-300"
            />
          </div>
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div class="mt-1">
            <input
              v-model="password"
              type="password"
              required=""
              placeholder="accordCl9"
              class="appearance-none block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-aushondared focus:border-aushondared sm:text-sm duration-300"
            />
          </div>
        </div>

        <div class="flex items-center justify-between my-5">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a
              href="#"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            @click="signUp"
            class="w-full text-white border border-gray-300 rounded-md py-2 px-4 bg-transparent hover:border-aushondared hover:text-aushondared duration-300"
          >
            Sign Up
          </button>
        </div>

        <div class="mt-6">
          <div class="relative">
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-aushondared">Or Continue With</span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-1 gap-3">
            <div>
              <button
                @click="singInWithGoogle"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md bg-transparent hover:border-aushondared hover:text-aushondared duration-300 hover:shadow-lg hover:shadow-aushondared/50"
              >
                <span class="sr-only">Sign in with Google</span>

                <fa :icon="['fab', 'google']" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const signUp = () => {
  const auth = getAuth();

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Successfully Registered!");
      console.log(auth.currentUser);
      router.push("/profile");

    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);

    });
};

const singInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      router.push("/profile");

    })
    .catch((error) => {

    })
};

</script>
