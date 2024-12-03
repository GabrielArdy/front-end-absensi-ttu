<template>
  <q-page class="flex flex-center">
    <div class="column items-center q-pa-sm">
      <q-img
        src="~assets/img/Teaching-pana.svg"
        spinner-color="white"
        style="height: 200px; max-width: 220px"
      />
      <h5 class="text-primary text-bold">Login Page</h5>
      <q-input color="text-primary" v-model="usernip" label="NIP" class="q-mb-md" filled>
        <template v-slot:prepend>
          <q-icon name="eva-person-outline" />
        </template>
      </q-input>
      <q-input color="text-primary" v-model="password" label="Password" class="q-mb-md" filled>
        <template v-slot:prepend>
          <q-icon name="eva-lock-outline" />
        </template>
      </q-input>
      <q-btn color="primary" label="Login" class="text-white q-mb-md" :style="{ width: '100%', height: '56px' }"/>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageLogin',
  data () {
    return {
      usernip: '',
      password: ''
    }
  }
}
</script>
