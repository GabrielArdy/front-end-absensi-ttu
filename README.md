# Absensi App (absen-front)

A Quasar Project

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://v1.quasar.dev/quasar-cli/quasar-conf-js).

sekarang bantu saya untuk mengintegrasikan backend dan front end untuk QR Code Scanner berikut

`components/CameraView.vue`
```
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

// Import API calls
import { checkInAPI, checkOutAPI } from 'src/api/attendance'

export default {
  name: 'CameraView',
  props: {
    // Prop untuk menentukan tipe aksi
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
    // Dinamis instruction berdasarkan action type
    dynamicInstructions () {
      return this.actionType === 'checkin'
        ? 'Scan QR Code untuk Absen Masuk'
        : 'Scan QR Code untuk Absen Keluar'
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
        // Reset state
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
        // Pilih API berdasarkan action type
        const apiCall = this.actionType === 'checkin'
          ? checkInAPI
          : checkOutAPI

        // Panggil API dengan QR Code
        const response = await apiCall(decodedText)

        // Tampilkan dialog hasil
        this.$q.dialog({
          title: this.actionType === 'checkin'
            ? 'Absen Masuk Berhasil'
            : 'Absen Keluar Berhasil',
          message: response.message || 'Terima kasih',
          ok: {
            label: 'Selesai',
            color: 'primary'
          }
        }).onOk(() => {
          // Navigasi atau aksi selanjutnya
          this.$router.push('/dashboard')
        })
      } catch (error) {
        // Tangani error dari API
        this.handleApiError(error)
      }
    },
    onScanFailure (error) {
      console.warn('Scan error:', error)
      this.instructionText = 'Pastikan QR Code terlihat jelas'
    },
    handleApiError (error) {
      // Tangani error spesifik dari API
      const errorMessage = error.response?.data?.message ||
        'Gagal melakukan absensi'

      this.$q.dialog({
        title: 'Gagal',
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
      this.$router.push('/dashboard')
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

```

lalu service untuk mengolah
`src/service/attendance.js`
```
import { RecordCheckInTime, RecordCheckOutTime } from 'src/api/attendance'
import { GetCurrentPosition, GetCurrentTime } from './helper'

export const checkInHandler = async (data) => {
  const loc = await GetCurrentPosition()
  const time = GetCurrentTime()
  const teacherId = localStorage.getItem('teacherId')

  const payload = {
    teacherId,
    longitude: loc.longitude,
    latitude: loc.latitude,
    scannedAt: time,
    key: data
  }

  const token = localStorage.getItem('token')
  const response = await RecordCheckInTime(token, payload)
  return response
}

export const checkOutHandler = async (data) => {
  const loc = await GetCurrentPosition()
  const time = GetCurrentTime()
  const teacherId = localStorage.getItem('teacherId')

  const payload = {
    teacherId,
    longitude: loc.longitude,
    latitude: loc.latitude,
    scannedAt: time,
    key: data
  }

  const token = localStorage.getItem('token')
  const response = await RecordCheckOutTime(token, payload)
  return response
}
```

dan fungsi API Callsnya
```
export const RecordCheckInTime = async (token, request) => {
  try {
    const response = await api.post('/api/attendance/checkin', request, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return response
  } catch (error) {
    throw error.response?.data || error
  }
}

export const RecordCheckOutTime = async (token, request) => {
  try {
    const response = await api.post('/api/attendance/checkout', request, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return response
  } catch (error) {
    throw error.response?.data || error
  }
}

```

sekarang bantu integrasi halaman ini dengan backend api callsnya
`profile.vue`
```
<template>
  <q-page class="profile-page">
    <div class="profile-container">
      <div class="profile-header">
        <q-avatar size="120px" class="profile-avatar">
          <q-img
            :src="profile.image"
            spinner-color="primary"
            spinner-size="30px"
          />
        </q-avatar>
      </div>

      <div class="profile-content">
        <div class="profile-details">
          <q-item>
            <q-item-section avatar>
              <q-icon name="person" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-bold">{{ profile.name }}</q-item-label>
              <q-item-label caption>Nama Lengkap</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item>
            <q-item-section avatar>
              <q-icon name="badge" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ profile.nip }}</q-item-label>
              <q-item-label caption>Nomor Induk Pegawai</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item>
            <q-item-section avatar>
              <q-icon name="work" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ profile.position }}</q-item-label>
              <q-item-label caption>Jabatan</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item>
            <q-item-section avatar>
              <q-icon name="email" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ profile.email }}</q-item-label>
              <q-item-label caption>Email Resmi</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { GetUserData } from 'src/api/attendance'
import { onMounted, ref } from 'vue'

export default {
  name: 'Profile',
  setup () {
    let profile = ref(null)
    const token = localStorage.getItem('token')
    const teacherId = localStorage.getItem('teacherId')

    const fetchProfile = async () => {
      try {
        const response = await GetUserData(token, teacherId)
        console.log(response)
        if (response.data.code === 200) {
          profile.value = response.data.data
        } else {
          throw new Error(response.data.message || 'Failed to fetch data')
        }
      } catch (err) {
        console.error(err)
      }
    }

    onMounted(() => {
      fetchProfile()
    })
  }
}
</script>

<style lang="scss" scoped>
.profile-page {
  background-color: #f4f6f9;
}

.profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.profile-header {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.profile-avatar {
  border: 3px solid var(--q-primary);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.profile-content {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.profile-details {
  .q-item {
    padding: 12px 16px;
  }

  .q-item-label {
    font-size: 15px;
  }

  .q-item-label[caption] {
    font-size: 12px;
    color: #757575;
  }
}
</style>
```

api calls
```
export const GetUserData = async (token, teacherId) => {
  try {
    const response = await api.get(`/api/users/${teacherId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    return response
  } catch (error) {
    throw error.response?.data || error
  }
}

```

dan contoh responsenya
```
{
    "code": 200,
    "message": "User data retrieved successfully",
    "data": {
        "displayName": "MERRY CHRYST NH. BAKUMAWA, S.Kom",
        "email": "merrybakumawa01@guru.smp.belajar.id",
        "position": "Guru",
        "PhotoUrl": "https://storage.googleapis.com/sigap-storage/default%2F%2Fuser.png",
        "teacherId": "197911302009032001",
        "grade": "Golongan IV/a - Pembina"
    }
}
```

