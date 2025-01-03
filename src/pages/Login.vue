<template>
  <q-page class="flex flex-center">
    <div class="column items-center q-pa-md" style="max-width: 400px; width: 100%">

      <q-img
        src="~assets/img/Teaching-pana.svg"
        spinner-color="white"
        style="height: 200px; max-width: 220px"
      />
      <h5 class="text-primary text-bold">Login Page</h5>

      <!-- Login Form -->
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="full-width"
        ref="loginForm"
      >
        <q-input
          ref="usernameRef"
          color="text-primary"
          v-model="username"
          label="NIP"
          class="q-mb-md"
          filled
          :rules="[val => !!val || 'NIP is required']"
        >
          <template v-slot:prepend>
            <q-icon name="eva-person-outline" />
          </template>
        </q-input>

        <q-input
          ref="passwordRef"
          color="text-primary"
          type="password"
          v-model="password"
          label="Password"
          class="q-mb-md"
          filled
          :rules="[val => !!val || 'Password is required']"
        >
          <template v-slot:prepend>
            <q-icon name="eva-lock-outline" />
          </template>
        </q-input>

        <q-btn
          type="submit"
          color="primary"
          label="Login"
          class="text-white q-mb-md"
          :loading="loading"
          :style="{ width: '100%', height: '56px' }"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
import { Notify } from 'quasar'

export default {
  name: 'LoginPage',
  data () {
    return {
      username: '',
      password: '',
      loading: false,
      loginError: null // for error message
    }
  },
  methods: {
    async onSubmit () {
      try {
        this.loading = true
        // Trigger form validation
        await this.$refs.loginForm.validate()

        if (!this.$refs.loginForm.hasError) {
          await this.handleLogin()
        }
      } catch (error) {
        console.error('Validation failed:', error)
      } finally {
        this.loading = false
      }
    },
    onReset () {
      this.username = ''
      this.password = ''
      this.loginError = null
    },
    async handleLogin () {
      try {
        const response = await axios.post(`${process.env.AUTH_API}/api/auth/v1/login`, {
          username: this.username,
          password: this.password
        })

        // Periksa apakah status code dan message menunjukkan login berhasil
        if (response.data.code === 200 && response.data.message === 'Success') {
          // Login berhasil, simpan token dan redirect ke /home
          localStorage.setItem('authToken', response.data.data.token)
          this.$router.push('/home')
        } else {
          // Jika response mengandung error meskipun statusnya 200
          this.loginError = 'Invalid username or password'
          Notify.create({
            type: 'negative',
            message: 'Invalid username or password',
            icon: 'eva-alert-triangle-outline'
          })
        }
      } catch (error) {
        // Cek apakah error berasal dari response HTTP
        if (error.response) {
          // Jika ada error response (misalnya 401, 403, dsb)
          console.error('Error response:', error.response)
          this.loginError = 'Invalid username or password'
          Notify.create({
            type: 'negative',
            message: 'Invalid username or password',
            icon: 'eva-alert-triangle-outline'
          })
        } else if (error.request) {
          // Jika tidak ada respons dari server
          console.error('Error request:', error.request)
          this.loginError = 'No response from server. Please try again later.'
          Notify.create({
            type: 'negative',
            message: 'No response from server. Please try again later.',
            icon: 'eva-alert-triangle-outline'
          })
        } else {
          // Error lainnya
          console.error('Unexpected error:', error.message)
          this.loginError = 'An unexpected error occurred.'
          Notify.create({
            type: 'negative',
            message: 'An unexpected error occurred.',
            icon: 'eva-alert-triangle-outline'
          })
        }
      }
    }
  }
}
</script>

<style scoped>
.q-banner {
  width: 100%;
  text-align: center;
}
</style>
