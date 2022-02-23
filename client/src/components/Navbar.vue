<script setup>
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(false);

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/');
  });
};

const open = ref(false);
</script>

<template>
  <Disclosure as="nav">
    <div class="max-w-full mx-auto sm:px-4 lg:px-8 bg-aushondablack">
      <div class="relative flex items-center justify-between h-20">
        <div class="flex items-center lg:px-0">
          <div class="flex-shrink-0">
            <a href="/">
              <img
                class="block lg:hidden h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
              <img
                class="hidden lg:block h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                alt="Workflow"
              />
            </a>
          </div>
          <div class="hidden lg:block lg:ml-6">
            <div class="flex space-x-4">
              <a
                href="#"
                class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                >Dashboard</a
              >
              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Team</a
              >
              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Projects</a
              >
              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >Calendar</a
              >
            </div>
          </div>
        </div>
        <div class="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
          <div class="max-w-lg w-full lg:max-w-xs">
            <label for="search" class="sr-only">Search</label>
            <div class="relative">
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <SearchIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="search"
                name="search"
                class="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-transparent text-white placeholder-gray-400 hover:border-aushondared focus:outline-none focus:border-aushondared focus:ring-aushondared focus:text-white sm:text-sm duration-300"
                placeholder="Search"
                type="search"
              />
            </div>
          </div>
        </div>
        <div class="flex lg:hidden">
          <!-- Mobile menu button -->
          <button
            class="inline-flex items-center justify-center p-2 rounded-md text-aushondared cursor-pointer"
            @click="open = !open"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon class="block h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden lg:block lg:ml-4">
          <div class="flex items-center">
            <!-- Profile dropdown -->
            <Menu as="div" class="relative inline-block text-left">
              <div>
                <MenuButton
                  class="rounded-full flex items-center text-aushondared hover:opacity-50 duration-300"
                >
                  <span class="sr-only">Open options</span>
                  <DotsVerticalIcon class="h-5 w-5" aria-hidden="true" />
                </MenuButton>
              </div>

              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="origin-top-right absolute right-0 mt-7 w-56 rounded-b-md shadow-lg bg-aushondablack"
                >
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <a
                        href="/profile"
                        :class="[
                          active
                            ? 'bg-aushondablack text-aushondared duration-300'
                            : 'text-gray-300',
                          'block px-4 py-2 text-sm',
                        ]"
                        >Your Profile</a
                      >
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <a
                        href="/signin"
                        :class="[
                          active
                            ? 'bg-aushondablack text-aushondared duration-300'
                            : 'text-gray-300',
                          'block px-4 py-2 text-sm',
                        ]"
                        >Sign In</a
                      >
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <a
                        href="/signup"
                        :class="[
                          active
                            ? 'bg-aushondablack text-aushondared duration-300'
                            : 'text-gray-300',
                          'block px-4 py-2 text-sm',
                        ]"
                        v-if="!isLoggedIn === true"
                        >Sign Up</a
                      >
                    </MenuItem>
                    <form method="POST" action="#">
                      <MenuItem v-slot="{ active }">
                        <button
                          :class="[
                            active
                              ? 'bg-aushondablack text-aushondared duration-300'
                              : 'text-gray-300',
                            'block w-full text-left px-4 py-2 text-sm',
                          ]"
                          v-if="isLoggedIn === true"
                        >
                          Sign out
                        </button>
                      </MenuItem>
                    </form>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  </Disclosure>

  <div>
    <TransitionRoot
      :show="open"
      enter="transition-all duration-75"
      enter-from="-right-full"
      enter-to="right-0"
      leave="transition-all duration-150"
      leave-from="right-0"
      leave-to="-right-full"
    >
      <Dialog
        as="div"
        class="fixed inset-0 overflow-hidden"
        @close="open = false"
      >
        <div class="absolute inset-0 overflow-hidden">
          <DialogOverlay class="absolute inset-0" />

          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <div
                class="pointer-events-auto w-screen max-w-md bg-aushondablack"
              >
                <div
                  class="flex h-full flex-col overflow-y-scroll py-6 shadow-xl"
                >
                  <div class="px-4 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-lg font-medium text-white">
                        Panel title
                      </DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="rounded-md text-aushondared"
                          @click="open = false"
                        >
                          <span class="sr-only">Close panel</span>
                          <XIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="relative mt-6 flex-1 px-4 sm:px-6">
                    <div class="lg:hidden">
                      <div class="px-2 pt-2 pb-3 space-y-1">
                        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                        <button
                          as="a"
                          href="#"
                          class="text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
                        >
                          Dashboard
                        </button>
                        <button
                          as="a"
                          href="#"
                          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                          Team
                        </button>
                        <button
                          as="a"
                          href="#"
                          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                          Projects
                        </button>
                        <button
                          as="a"
                          href="#"
                          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                          Calendar
                        </button>
                      </div>
                      <div class="pt-4 pb-3 border-t border-aushondared">
                        <div class="flex items-center">
                          <div class="ml-3 px-2">
                            <div class="text-base font-medium text-white">
                              Tom Cook
                            </div>
                          </div>
                        </div>
                        <div class="mt-3 px-2 space-y-1">
                          <button
                            as="a"
                            href="#"
                            class="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                          >
                            Your Profile
                          </button>
                          <button
                            as="a"
                            href="#"
                            class="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                            @click="handleSignOut"
                            v-if="isLoggedIn"
                          >
                            Sign Out
                          </button>
                          <button
                            as="a"
                            href="/signin"
                            class="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                            v-if="!isLoggedIn"
                          >
                            Sign In
                          </button>
                          <button
                            as="a"
                            href="/signup"
                            class="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                            v-if="!isLoggedIn"
                          >
                            Sign Up
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script>
import {
  Disclosure,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { DotsVerticalIcon, SearchIcon } from '@heroicons/vue/solid';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline';

export default {
  components: {
    Disclosure,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    DotsVerticalIcon,
    BellIcon,
    MenuIcon,
    SearchIcon,
    XIcon,
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  },
};
</script>
