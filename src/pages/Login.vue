<template>
  <q-page class="flex flex-center">
    <div class="column items-center q-pa-md" style="max-width: 400px; width: 100%">

      <q-img
        src="~assets/img/icon.svg"
        spinner-color="white"
        style="height: 200px; max-width: 220px"
      />
      <h5 class="text-primary text-bold">Selamat Datang</h5>

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
          v-model="email"
          label="Email"
          class="q-mb-md"
          filled
          :rules="[val => !!val || 'Email Tidak Boleh Kosong']"
        >
          <template v-slot:prepend>
            <q-icon name="eva-email-outline" />
          </template>
        </q-input>

        <q-input
          ref="passwordRef"
          color="text-primary"
          :type="isPwdVisible ? 'text' : 'password'"
          v-model="password"
          label="Password"
          class="q-mb-md"
          filled
          :rules="[val => !!val || 'Password Tidak Boleh Kosong']"
        >
        <template v-slot:prepend>
      <q-icon name="eva-lock-outline" />
    </template>
    <template v-slot:append>
      <q-icon
        :name="isPwdVisible ? 'eva-eye-off-outline' : 'eva-eye-outline'"
        class="cursor-pointer"
        @click="togglePassword"
        role="button"
        aria-label="Toggle password visibility"
      />
    </template>
        </q-input>

        <q-btn
          type="submit"
          color="primary"
          label="MASUK"
          class="text-white q-mb-md"
          :loading="loading"
          :style="{ width: '100%', height: '56px' }"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { Notify } from 'quasar'
import { getClaims, loginWithCredentials } from 'src/api/auth'

export default {
  name: 'LoginPage',
  data () {
    return {
      email: '',
      password: '',
      loading: false,
      loginError: null,
      isPwdVisible: false
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
      this.email = ''
      this.password = ''
      this.loginError = null
    },
    async handleLogin () {
      try {
        const request = {
          email: this.email,
          password: this.password
        }
        const response = await loginWithCredentials(request)
        localStorage.setItem('token', response.data.token)
        // Periksa apakah status code dan message menunjukkan login berhasil
        if (response.data.code === 200) {
          const token = localStorage.getItem('token')
          const claimsData = await getClaims(token)
          localStorage.setItem('teacherId', claimsData.data.teacherId)
          localStorage.setItem('role', claimsData.data.role)
          console.table(claimsData)
          // Login berhasil, simpan token dan redirect ke /home
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
        this.handleError(error)
      }
    },
    togglePassword () {
      this.isPwdVisible = !this.isPwdVisible
    },
    handleError (error) {
      let errorMessage = 'Gagal masuk ke aplikasi'
      switch (error.code) {
        case 500:
          switch (error.message) {
            case 'Firebase: Error (auth/invalid-credential).':
              errorMessage = 'Email atau password salah'
              break
            default:
              errorMessage = 'Terjadi kesalahan saat masuk'
              break
          }
      }
      Notify.create({
        type: 'negative',
        message: errorMessage,
        icon: 'eva-alert-triangle-outline'
      })
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
