<template>
    <div class="camera-view">
      <!-- Video Kamera -->
      <video ref="video" autoplay muted playsinline class="camera-feed"></video>

      <!-- Overlay untuk QR Code -->
      <div class="qr-overlay">
        <div class="qr-box"></div>
        <p>Align QR code to fit inside the frame</p>
      </div>

      <!-- Tombol Kontrol -->
      <div class="controls">
        <button class="control-button cancel" @click="handleCancel">Cancel</button>
      </div>
    </div>
  </template>

<script>
export default {
  name: 'CameraView',
  data () {
    return {
      stream: null
    }
  },
  mounted () {
    this.startCamera()
  },
  beforeDestroy () {
    this.stopCamera()
  },
  methods: {
    async startCamera () {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        })
        this.$refs.video.srcObject = this.stream
      } catch (error) {
        console.error('Error accessing camera:', error)
      }
    },
    stopCamera () {
      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop())
      }
    },
    handleCancel () {
      this.stopCamera()
      this.$router.push('/home') // Navigasi kembali ke halaman utama
    }
  }
}
</script>

  <style lang="sass">
  .camera-view
    position: relative
    width: 100%
    height: 100vh
    display: flex
    flex-direction: column
    align-items: center
    justify-content: space-between
    background: black
    overflow: hidden

  .camera-feed
    width: 100%
    height: calc(100vh - 80px)
    object-fit: cover

  .qr-overlay
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    pointer-events: none

  .qr-box
    border: 2px solid white
    width: 200px
    height: 200px
    box-sizing: border-box

  .qr-overlay p
    color: white
    margin-top: 10px
    text-align: center
    font-size: 14px

  .controls
    width: 100%
    height: 80px
    background: rgba(0, 0, 0, 0.8)
    display: flex
    align-items: center
    justify-content: center

  .control-button
    background: white
    color: black
    padding: 10px 20px
    border: none
    border-radius: 5px
    font-size: 16px
    cursor: pointer
    transition: all 0.3s ease

  .control-button:hover
    background: #f0f0f0

  .control-button.cancel
    background: red
    color: white

  .control-button.cancel:hover
    background: darkred

  @media (max-width: 600px)
    .qr-box
      width: 150px
      height: 150px

    .qr-overlay p
      font-size: 12px

    .control-button
      font-size: 14px
      padding: 8px 16px

  </style>
