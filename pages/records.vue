<!-- eslint-disable vue/no-multiple-template-root -->
<template>
    <Nav-bar />

    <div class="flex flex-col mx-20 my-20 h-200 border-2 border-gray-300 rounded-lg px-50 py-16 shadow-lg bg-white ">
        <h1>Records</h1>
        <h2 class="text-center text-2xl text-blue-700">Loopa-App</h2>
        <p>Here you can find all the records related to your case.</p>
        <ul>
            <quote class="flex flex-col space-y-4">
                <h2>Record 1</h2>
                <p>Details about record 1.</p>
            </quote>
        </ul>
        <div>
            <table class="border-1 border-neutral-300">
                <thead>
                    <tr>
                        <th>Record ID</th>
                        <th>Record Name</th>
                        <th>Record Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Record 1</td>
                        <td>2023-10-01</td>
                        <td><button>Edit</button></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Record 2</td>
                        <td>2023-10-02</td>
                        <td><button>Edit</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button>Add New Record</button>
    </div>
</template>