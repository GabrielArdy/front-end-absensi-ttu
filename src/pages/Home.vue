<template>
  <q-page class="q-pa-md">
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
      fetchDashboardData()
    })

    return {
      loading,
      teacherData,
      error,
      formattedDate
    }
  }
}
</script>
