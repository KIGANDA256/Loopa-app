<!-- eslint-disable vue/no-multiple-template-root -->
<template>
    <div class="flex h-screen">
        <SideBarMenu />
        <div class="h-30 container mx-12 peer-[]:-12 border-1 border-amber-50 rounded-lg shadow-lg bg-white p-4 w-95">
            <!-- Dashboard Nav bar -->
            <div class="flex flex-row  justify-between items-center">
                <h2 class=" text-2xl text-center font-bold ">Dashboard</h2>
                <div class="flex flex-row space-x-4">

                    <nuxt-link to="/homeDashboard" class="text-blue-500 hover:text-blue-700">Home</nuxt-link>
                    <nuxt-link to="/profile" class="text-blue-500 hover:text-blue-700">Profile</nuxt-link>
                    <nuxt-link to="/settings" class="text-blue-500 hover:text-blue-700">Settings</nuxt-link>

                </div>
            </div>
            <p class="text-gray-600 mt-2 text-1xl text-center">Welcome to your dashboard. Here you can manage your
                activities.</p>
        </div>
        <!-- Dashboard-Content -->
        <div
            class="flex flex-col mt-30 mr-80 h-200 border-2 border-gray-300 rounded-lg px-50 py-16 shadow-lg bg-white ">
            <h1>Home Dashboard</h1>
            <h2 class="text-center text-2xl text-blue-700">Loopa-App</h2>
            <p>Welcome to your home dashboard. Here you can find an overview of your activities.</p>
            <ul>
                <li class="flex flex-col space-y-4">
                    <h2>Activity 1</h2>
                    <p>Details about activity 1.</p>
                </li>
            </ul>

            <button class="bg-green-400 h-12 rounded-b-lg text-white shadow-lg">Add New Activity </button>
        </div>




    </div>




</template>
<!-- 
class="flex   flex-start  h-screen bg-gray-100"
h-screen
        
-->