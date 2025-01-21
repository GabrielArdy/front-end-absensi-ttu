<template>
  <div class="camera-view">
    <!-- QR Code Scanner -->
    <div id="reader" class="camera-feed"></div>

    <!-- Overlay untuk QR Code -->
    <div class="qr-overlay">
      <div class="qr-box"></div>
      <p>Align QR code to fit inside the frame</p>
    </div>

    <!-- Status deteksi QR Code -->
    <!-- <div v-if="scanStatus" class="scan-status">
      <p>{{ scanStatus }}</p>
    </div> -->

    <!-- Tombol Kontrol -->
    <div class="controls">
      <button class="control-button cancel" @click="handleCancel">Cancel</button>
    </div>
  </div>
</template>

<script>
import { Html5Qrcode } from 'html5-qrcode'

export default {
  name: 'CameraView',
  data () {
    return {
      html5QrCode: null,
      isScanning: false,
      scanStatus: 'QR code belum terdeteksi' // Status awal
    }
  },
  mounted () {
    this.startScanner()
  },
  beforeDestroy () {
    this.stopScanner()
  },
  methods: {
    async startScanner () {
      try {
        // Hapus scanner jika ada instans sebelumnya
        if (this.html5QrCode) {
          await this.html5QrCode.clear()
        }

        this.html5QrCode = new Html5Qrcode('reader')
        this.isScanning = true

        const config = { fps: 10, qrbox: 250 } // Konfigurasi frame QR Code

        // Mulai scanning
        await this.html5QrCode.start(
          { facingMode: 'environment' },
          config,
          (decodedText, decodedResult) => {
            // Callback saat QR Code berhasil dibaca
            console.log('Decoded text:', decodedText)
            this.handleScanSuccess(decodedText)
          },
          (errorMessage) => {
            console.warn('QR Code error:', errorMessage)
            this.scanStatus = 'QR code belum terdeteksi'
          }
        )
      } catch (error) {
        console.error('Error initializing QR code scanner:', error)
        this.scanStatus = 'Gagal memulai pemindaian'
      }
    },
    stopScanner () {
      if (this.html5QrCode && this.isScanning) {
        this.html5QrCode
          .stop()
          .then(() => {
            console.log('QR Code scanning stopped.')
            this.isScanning = false
            this.html5QrCode.clear() // Bersihkan elemen scanner
          })
          .catch((err) => {
            console.error('Error stopping the scanner:', err)
          })
      }
    },
    handleScanSuccess (decodedText) {
      // Update status menjadi QR terdeteksi
      this.scanStatus = `QR code terdeteksi: ${decodedText}`

      // Berhenti scanning
      this.stopScanner()

      // Tampilkan dialog dengan hasil scan
      this.$q.dialog({
        title: 'Hasil Scan',
        message: `QR Code berhasil dipindai: ${decodedText}`,
        ok: 'OK'
      }).onOk(() => {
        // Navigasi ke halaman utama setelah dialog ditutup
        this.$router.push('/home')
      })
    },
    handleCancel () {
      this.stopScanner()
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
  background: black

.camera-feed
  flex: 1
  width: 100%
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

.scan-status
  position: absolute
  bottom: 20px
  left: 50%
  transform: translateX(-50%)
  background-color: rgba(0, 0, 0, 0.7)
  color: white
  padding: 10px
  border-radius: 5px
  font-size: 16px

@media (max-width: 600px)
  .qr-box
    width: 150px
    height: 150px

  .qr-overlay p
    font-size: 12px

  .control-button
    font-size: 14px
    padding: 8px 16px

  .scan-status
    font-size: 14px
    bottom: 10px
</style>
