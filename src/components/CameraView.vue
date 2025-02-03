<template>
  <div class="camera-view">
    <!-- QR Code Scanner -->
    <div id="reader" class="camera-feed"></div>

    <!-- Overlay for QR Code -->
    <div class="qr-overlay">
      <div class="qr-box"></div>
      <p class="instruction-text">
        {{ instructionText }}
      </p>
    </div>

    <!-- Camera Controls -->
    <div class="camera-controls">
      <q-btn
        icon="cancel"
        color="negative"
        label="Batal"
        @click="handleCancel"
        class="full-width"
        size="lg"
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

// Import API calls
import { checkInHandler, checkOutHandler } from 'src/service/attendance'
import { GetCurrentPosition } from 'src/service/helper'

export default {
  name: 'CameraView',
  props: {
    actionType: {
      type: String,
      validator: (value) => ['checkin', 'checkout'].includes(value),
      required: true
    }
  },
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
  computed: {
    dynamicInstructions () {
      return this.actionType === 'checkin'
        ? 'Scan QR Code untuk Absen Masuk'
        : 'Scan QR Code untuk Absen Keluar'
    }
  },
  mounted () {
    this.startScanner()
    this.GetRealtimeLocation()
  },
  beforeDestroy () {
    this.stopScanner()
  },
  methods: {
    async startScanner () {
      try {
        this.instructionText = this.dynamicInstructions

        if (this.html5QrCode) {
          await this.html5QrCode.clear()
        }

        this.html5QrCode = new Html5Qrcode('reader')
        this.isScanning = true
        this.cameraError = false

        const config = {
          fps: 10,
          qrbox: Platform.is.mobile ? 250 : 300
        }

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
    async onScanSuccess (decodedText, decodedResult) {
      this.stopScanner()

      try {
        const data = {
          key: decodedText,
          longitude: localStorage.getItem('longitude'),
          latitude: localStorage.getItem('latitude')
        }
        const handler = this.actionType === 'checkin'
          ? checkInHandler
          : checkOutHandler

        const response = await handler(data)
        console.log('API Response:', response)

        this.$q.dialog({
          title: this.actionType === 'checkin'
            ? 'Berhasil Melakukan Absen Masuk'
            : 'Berhasil Melakukan Absen Keluar',
          message: `Berhasil melakukan absensi pada ${new Date().toLocaleString('id-ID')}`,
          ok: {
            label: 'Selesai',
            color: 'primary'
          }
        }).onOk(() => {
          this.$router.push('/home')
        })
      } catch (error) {
        this.handleApiError(error)
      }
    },
    onScanFailure (error) {
      console.warn('Scan error:', error)
      this.instructionText = 'Pastikan QR Code terlihat jelas'
    },
    handleApiError (error) {
      let errorMessage = 'Gagal melakukan absensi'

      switch (error.code) {
        case 400:
          switch (error.message) {
            case 'Out of range':
              errorMessage = 'Anda berada di luar jangkauan absensi'
              break
            case 'QR Code expired':
              errorMessage = 'QR Code sudah tidak berlaku'
              break
            case 'Check-in first before checking out':
              errorMessage = 'Anda harus melakukan absen masuk terlebih dahulu'
              break
            default:
              errorMessage = 'Terjadi kesalahan saat melakukan absensi'
              break
          }
          break
        case 409:
          switch (error.message) {
            case 'Already checked in':
              errorMessage = 'Anda sudah melakukan absen masuk'
              break
            case 'Already checked out':
              errorMessage = 'Anda sudah melakukan absen keluar'
              break
            default:
              errorMessage = 'Terjadi kesalahan saat melakukan absensi'
              break
          }
          break
        case 404:
          errorMessage = 'Kode QR tidak valid'
          break
        case 500:
          errorMessage = 'Terjadi kesalahan pada server'
          break
        default:
          errorMessage = 'Terjadi kesalahan saat melakukan absensi'
          break
      }

      this.$q.dialog({
        title: 'Gagal Melakukan Absensi',
        message: errorMessage,
        ok: {
          label: 'Coba Lagi',
          color: 'negative'
        }
      }).onOk(() => {
        this.resetScanner()
        this.startScanner()
      })
    },
    handleScannerError (error) {
      console.error('Scanner Error:', error)
      this.cameraError = true
      this.errorMessage = this.getErrorMessage(error)
      this.showErrorDialog = true
    },

    async GetRealtimeLocation () {
      try {
        const location = await GetCurrentPosition()
        console.log('Current location:', location)
        localStorage.setItem('longitude', location.longitude)
        localStorage.setItem('latitude', location.latitude)
        return location
      } catch (error) {
        console.error('Failed to get location:', error)
      }
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
      this.instructionText = this.dynamicInstructions
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
  height: 100%
  object-fit: cover
  position: absolute
  top: 0
  left: 0

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
