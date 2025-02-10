<template>
  <q-page class="q-pa-md">
    <q-banner
      v-if="showInstallBanner"
      class="bg-primary text-white q-mb-md"
      rounded
    >
      <template v-slot:avatar>
        <q-icon name="eva-download-outline" />
      </template>
      Instal aplikasi untuk pengalaman yang lebih baik
      <template v-slot:action>
        <q-btn
          flat
          label="Instal"
          @click="installPWA"
        />
        <q-btn
          flat
          label="Tutup"
          @click="showInstallBanner = false"
        />
      </template>
    </q-banner>
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <HeaderCard
          v-if="!loading"
          :DisplayName="teacherData?.displayName"
          :teacherId="teacherData?.teacherId"
        />
        <q-skeleton v-else type="rect" class="full-width" height="200px" />
      </div>
      <div class="col-12 q-mt-md">
        <ActionButton />
      </div>
      <div class="col-12">
        <HistoryCard
        v-if="!loading"
        :checkin="teacherData?.checkIn"
        :checkout="teacherData?.checkOut"
        :date="formattedDate"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import ActionButton from 'src/components/ActionButton.vue'
import HeaderCard from 'src/components/HeaderCard.vue'
import HistoryCard from 'src/components/HistoryCard.vue'
import { getDashboardUser } from 'src/api/dashboard'
import { formatDate } from 'src/utils/helper'

export default {
  name: 'HomePage',
  components: {
    HeaderCard,
    ActionButton,
    HistoryCard
  },
  setup () {
    const showInstallBanner = ref(false)
    let deferredPrompt = null
    const token = localStorage.getItem('token')
    const loading = ref(false)
    const teacherData = ref(null)
    const error = ref(null)
    const formattedDate = computed(() => {
      return teacherData.value?.date
        ? formatDate(teacherData.value.date)
        : ''
    })
    const fetchDashboardData = async () => {
      try {
        loading.value = true
        const teacherId = localStorage.getItem('teacherId')
        const response = await getDashboardUser(token, teacherId)

        if (response.data.code === 200) {
          teacherData.value = response.data.data
          localStorage.setItem('flag', teacherData.value.flag)
          console.table(teacherData.value.date)
        } else {
          throw new Error(response.data.message || 'Failed to fetch data')
        }
      } catch (err) {
        error.value = err.message
        this.$q.notify({
          type: 'negative',
          message: error.value
        })
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing prompt
        e.preventDefault()
        // Stash the event so it can be triggered later
        deferredPrompt = e
        // Show the banner
        showInstallBanner.value = true
      })

      // Check if PWA is already installed
      if (window.matchMedia('(display-mode: standalone)').matches) {
        showInstallBanner.value = false
      }
      fetchDashboardData()
    })
    const installPWA = async () => {
      if (!deferredPrompt) return

      // Show the install prompt
      deferredPrompt.prompt()

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice
      // Hide the banner regardless of outcome
      showInstallBanner.value = false
      // Notify based on outcome
      if (outcome === 'accepted') {
        this.$q.notify({
          type: 'positive',
          message: 'Terima kasih telah menginstal aplikasi'
        })
      }
      deferredPrompt = null
    }

    return {
      loading,
      teacherData,
      error,
      formattedDate,
      showInstallBanner,
      installPWA
    }
  }
}
</script>

<style scoped>
.q-banner {
  border-radius: 8px;
}
</style>
