<template>
    <q-page padding class="camera-page">
        <alternate-view />
    </q-page>
  </template>

<script>
import AlternateView from 'components/AlternateView.vue'

export default {
  name: 'Alter',
  components: {
    AlternateView
  },
  methods: {
    handleCancel () {
      this.$router.push('/') // Arahkan ke halaman utama
    },
    handleChooseImage () {
      console.log('Choose Image clicked')
    }
  }
}
</script>

  <style>
  .camera-page {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f0f0;
  }
  </style>
