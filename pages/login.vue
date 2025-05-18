<template>


  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <!-- <img class="mx-auto h-10 w-auto" /> -->
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
          <div class="mt-2">
            <input type="email" name="email" id="email" autocomplete="email" required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input type="password" name="password" id="password" autocomplete="current-password" required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
            in</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Not a member?
        {{ ' ' }}
        <nuxt-link to="/Sign-up" class="font-semibold text-indigo-600 hover:text-indigo-500">Sign up to get an
          Account</nuxt-link>
      </p>
    </div>
  </div>
</template>



<!-- <script setup>
  const supabase = useSupabaseClient()
  const loading = ref(false)
  const email = ref('')

  const handleLogin= async ()=>{
     try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({ email: email.value })
    if (error) throw error
    alert('Check your email for the login link!')
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }

  }
</script>

<template>
  <div>
    <main class="signin-container">
      <section class="signin-form">
        <h1>Sign In</h1>
        <form @submit.prevent="handleLogin">
          <input type="email" placeholder="email" v-model="email" required>
          <input type="password" placeholder="Password" required>
        </form>
        <button type="submit">Log In</button>
        <p class="signup-link">Don't have an account?
          <nuxt-link to="/Sign-up">Sign up</nuxt-link>

        </p>
      </section>
    </main>

  </div>
</template>
<style lang="css" scoped>
* {
  font-family: -apple-system;
  font-size: large;
}

.signin-container {
  border: 1px solid navy;
  display: block;
  height: 500px;
  margin: 30px 40px;
  background-color: aliceblue;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.signin-form {
  display: flex;
  margin: 20px;
  padding: 30px;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}

input {
  display: flex;
  flex-direction: column;
  height: 30px;
  width: 300px;
  border: none;
  border-radius: 5px;
  margin: 30px;
}

button {
  width: 150px;
  height: 40px;
  border: none;
  border-radius: 5px;

}

button:hover {
  background-image: linear-gradient(90deg, cyan, navy);
  color: azure;
  transition: ease-in;
}
</style> -->
