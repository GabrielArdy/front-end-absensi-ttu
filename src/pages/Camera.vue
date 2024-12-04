<template>
    <q-page padding class="camera-page">
      <div class="camera-container">
        <!-- Akses Kamera -->
        <CameraView />

        <!-- Tombol Aksi -->
      </div>
    </q-page>
  </template>

<script>
import CameraView from 'components/CameraView.vue'

export default {
  name: 'Camera',
  components: {
    CameraView
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
  .camera-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: relative;
  }
  </style>
