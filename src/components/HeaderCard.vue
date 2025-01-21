<template>
  <div class="col-12">
    <q-card class="header-card text-white">
      <div class="relative-position full-width">
        <q-card-section>
          <div class="text-subtitle2 text-right">{{ currentTime }}</div>
          <div class="text-h6">Selamat datang {{ FullName }}</div>
          <div class="text-subtitle2">NIP {{ TeacherId }}</div>
        </q-card-section>
        <q-img
          src="~assets/img/welcome.svg"
          class="header-image"
        />
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'HeaderCard',
  props: {
    DisplayName: {
      type: String,
      default: 'DISPLAY_NAME' // Sesuaikan dengan default value yang lebih jelas
    },
    teacherId: {
      type: String,
      default: 'TEACHER_ID' // Sesuaikan dengan default value yang lebih jelas
    }
  },
  data () {
    return {
      currentTime: '' // Data untuk waktu saat ini
    }
  },
  computed: {
    FullName () {
      return this.DisplayName // Mengakses prop DisplayName
    },
    TeacherId () {
      return this.teacherId // Mengakses prop teacherId
    }
  },
  methods: {
    updateTime () {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const seconds = now.getSeconds().toString().padStart(2, '0')
      this.currentTime = `${hours}:${minutes}:${seconds}`
    }
  },
  mounted () {
    this.updateTime() // Set waktu awal
    this.timer = setInterval(this.updateTime, 1000) // Update waktu setiap detik
  },
  beforeDestroy () {
    if (this.timer) clearInterval(this.timer) // Membersihkan interval saat komponen dihancurkan
  }
}
</script>
