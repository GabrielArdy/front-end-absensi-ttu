<template>
    <div class="camera-view">
      <!-- QR Code Scanner -->
      <div id="reader" class="camera-feed"></div>

      <!-- Overlay untuk QR Code -->
      <div class="qr-overlay">
        <div class="qr-box"></div>
        <p class="instruction-text">
          {{ instructionText }}
        </p>
      </div>

      <!-- Kontrol Kamera -->
      <div class="camera-controls">
        <q-btn
          icon="cancel"
          color="negative"
          label="Batal"
          @click="handleCancel"
          class="full-width"
        />
      </div>

      <!-- Status Dialog -->
      <q-dialog v-model="showErrorDialog" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6">Peringatan</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ errorMessage }}
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="Tutup"
              color="primary"
              v-close-popup
              @click="resetScanner"
            />
            <q-btn
              v-if="cameraError"
              label="Coba Lagi"
              color="primary"
              @click="startScanner"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </template>

<script>
import { Html5Qrcode } from 'html5-qrcode'
import { Platform } from 'quasar'

export default {
  name: 'AlternateView',
  data () {
    return {
      html5QrCode: null,
      isScanning: false,
      showErrorDialog: false,
      errorMessage: '',
      cameraError: false,
      instructionText: 'Arahkan kamera ke QR Code'
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
        this.cameraError = false

        // Konfigurasi responsif
        const config = {
          fps: 10,
          qrbox: Platform.is.mobile ? 250 : 300
        }

        // Pilih kamera belakang atau default
        const cameraId = await this.selectBackCamera()

        await this.html5QrCode.start(
          cameraId,
          config,
          this.onScanSuccess,
          this.onScanFailure
        )
      } catch (error) {
        this.handleScannerError(error)
      }
    },
    async selectBackCamera () {
      try {
        const devices = await Html5Qrcode.getCameras()
        const backCamera = devices.find(device =>
          device.label.toLowerCase().includes('back') ||
            device.label.toLowerCase().includes('rear')
        )
        return backCamera ? backCamera.id : devices[0].id
      } catch {
        return { facingMode: 'environment' }
      }
    },
    onScanSuccess (decodedText, decodedResult) {
      this.stopScanner()
      this.$q.dialog({
        title: 'Berhasil Scan',
        message: `QR Code: ${decodedText}`,
        ok: {
          label: 'Lanjutkan',
          color: 'primary'
        }
      }).onOk(() => {
        // Proses hasil scan
        this.processQRCode(decodedText)
      })
    },
    onScanFailure (error) {
      console.warn('Scan error:', error)
      this.instructionText = 'Pastikan QR Code terlihat jelas'
    },
    processQRCode (code) {
      // Logika proses QR Code
      try {
        // Contoh: validasi atau navigasi
        this.$router.push('/home')
      } catch (error) {
        this.handleScannerError(error)
      }
    },
    handleScannerError (error) {
      console.error('Scanner Error:', error)
      this.cameraError = true
      this.errorMessage = this.getErrorMessage(error)
      this.showErrorDialog = true
    },
    getErrorMessage (error) {
      const errorMessages = {
        NotAllowedError: 'Izin kamera ditolak. Mohon aktifkan izin kamera.',
        NotFoundError: 'Kamera tidak ditemukan.',
        NotReadableError: 'Kamera sedang digunakan oleh aplikasi lain.',
        OverconstrainedError: 'Pengaturan kamera tidak sesuai.',
        default: 'Terjadi kesalahan saat membuka kamera.'
      }
      return errorMessages[error.name] || errorMessages.default
    },
    stopScanner () {
      if (this.html5QrCode && this.isScanning) {
        this.html5QrCode
          .stop()
          .then(() => {
            this.isScanning = false
            this.html5QrCode.clear()
          })
          .catch((err) => {
            console.error('Gagal menghentikan scanner:', err)
          })
      }
    },
    resetScanner () {
      this.showErrorDialog = false
      this.cameraError = false
      this.instructionText = 'Arahkan kamera ke QR Code'
    },
    handleCancel () {
      this.stopScanner()
      this.$router.push('/home')
    }
  }
}
</script>

  <style lang="sass" scoped>
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
    z-index: 10

  .qr-box
    border: 3px solid #4CAF50
    width: 250px
    height: 250px
    box-sizing: border-box
    border-radius: 10px
    box-shadow: 0 0 10px rgba(76, 175, 80, 0.5)

  .instruction-text
    color: white
    margin-top: 15px
    text-align: center
    font-size: 16px
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5)

  .camera-controls
    position: absolute
    bottom: 20px
    left: 20px
    right: 20px
    z-index: 20

  @media (max-width: 600px)
    .qr-box
      width: 200px
      height: 200px

    .instruction-text
      font-size: 14px
  </style>
