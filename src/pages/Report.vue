<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="text-h6 text-center text-weight-medium q-my-md">Laporan Kehadiran</div>

      <div class="q-mb-md">
        <profile-card
          :displayName="teacherData?.displayName"
          :teacherId="teacherData?.teacherId"
          :photo-url="teacherData?.photoUrl"
        />
      </div>

      <div class="q-mb-md">
        <q-card flat bordered>
          <q-card-section>
            <div class="row items-center q-gutter-sm">
              <div class="col">
                <q-select
                  v-model="selectedPeriode"
                  :options="periodeOptions"
                  label="Pilih Periode"
                  outlined
                  dense
                  options-dense
                  emit-value
                  map-options
                  @update:model-value="fetchMonthlyReport"
                >
                  <template v-slot:prepend>
                    <q-icon name="event" />
                  </template>
                </q-select>
              </div>
              <div class="col-auto">
                <q-btn
                  icon="refresh"
                  flat
                  round
                  dense
                  color="primary"
                  @click="fetchMonthlyReport"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div>
        <report-table
          :attendanceData="monthlyData"
          :loading="loading"
        />
      </div>

      <q-btn
        push
        class="q-mt-md full-width"
        label="Download Laporan"
        color="primary"
        icon="eva-download-outline"
        :disable="loading || monthlyData.length === 0"
        @click="downloadReport"
      />
    </div>
  </q-page>
</template>

<script>

import ProfileCard from 'components/ProfileCard.vue'
import { GetMonthlyReport } from 'src/api/attendance'
import { getDashboardUser } from 'src/api/dashboard'
import ReportTable from 'src/components/ReportTable.vue'

export default {
  components: {
    ProfileCard,
    ReportTable
  },
  data () {
    return {
      token: localStorage.getItem('token'),
      monthlyData: [],
      loading: false,
      error: null,
      teacherData: null,
      selectedPeriode: null
    }
  },
  computed: {
    periodeOptions () {
      const options = []
      const currentDate = new Date()

      for (let i = 0; i < 6; i++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
        options.push({
          label: `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`,
          value: {
            month: date.getMonth() + 1,
            year: date.getFullYear()
          }
        })
      }

      return options
    }
  },
  methods: {
    async fetchMonthlyReport () {
      try {
        this.loading = true
        const teacherId = localStorage.getItem('teacherId')

        if (!this.selectedPeriode) {
          this.selectedPeriode = this.periodeOptions[0]
        }

        const payload = {
          teacherId,
          month: this.selectedPeriode.value.month,
          year: this.selectedPeriode.value.year
        }

        console.log('Selected periode:', payload)

        const response = await GetMonthlyReport(
          this.token,
          payload
        )

        console.log('Monthly report:', response.data)

        if (response.data.code === 200) {
          this.monthlyData = response.data.data
        } else {
          this.$q.notify({
            type: 'warning',
            message: 'Tidak ada data laporan'
          })
        }
      } catch (error) {
        console.error('Error fetching report:', error)
        this.$q.notify({
          type: 'negative',
          message: 'Gagal mengambil laporan'
        })
      } finally {
        this.loading = false
      }
    },
    async fetchDashboardData () {
      try {
        this.loading = true
        const teacherId = localStorage.getItem('teacherId')
        const response = await getDashboardUser(this.token, teacherId)

        if (response.data.code === 200) {
          this.teacherData = response.data.data
        } else {
          throw new Error(response.data.message || 'Failed to fetch data')
        }
      } catch (err) {
        this.error = err.message
        this.$q.notify({
          type: 'negative',
          message: this.error
        })
      } finally {
        this.loading = false
      }
    },
    downloadReport () {
      this.$q.notify({
        type: 'info',
        message: 'Fitur download sedang dikembangkan'
      })
    }
  },
  mounted () {
    this.fetchDashboardData()
    this.fetchMonthlyReport()
  }
}
</script>

<style lang="sass" scoped>
.full-width
  width: 100%
</style>
