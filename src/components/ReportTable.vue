<template>
  <div class="scrollable-container">
    <q-table
      flat
      :data="formattedData"
      :columns="columns"
      row-key="tanggal"
      :loading="loading"
      class="full-width"
    />
  </div>
</template>

<script>
import { h, computed } from 'vue'

export default {
  name: 'ReportTable',
  props: {
    attendanceData: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const formatTime = (val) => {
      if (!val || val === '-') {
        return h('div', {
          style: 'color: #FF0000;' // or 'color: var(--q-negative)'
        }, 'Tidak Tercatat')
      }
      return new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(new Date(val))
    }
    const columns = [
      {
        name: 'tanggal',
        label: 'Tanggal',
        align: 'left',
        field: 'tanggal',
        format: val => new Intl.DateTimeFormat('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(new Date(val))
      },
      {
        name: 'jamMasuk',
        label: 'Jam Masuk',
        align: 'center',
        field: 'jamMasuk',
        format: formatTime
      },
      {
        name: 'jamKeluar',
        label: 'Jam Keluar',
        align: 'center',
        field: 'jamKeluar',
        format: formatTime
      }
    ]

    const formattedData = computed(() => {
      return props.attendanceData
        .map(item => ({
          tanggal: item.date,
          jamMasuk: item.checkIn || '-',
          jamKeluar: item.checkOut || '-'
        }))
        .sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal))
    })

    return {
      columns,
      formattedData
    }
  }
}
</script>

<style>
.scrollable-container {
  max-height: 400px;
  overflow-y: auto;
}

.q-table thead tr th {
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
}
</style>
