<template>
    <div class="scrollable-container">
      <q-table
        flat
        :data="rows"
        :columns="columns"
        row-key="tanggal"
        class="full-width"
      />
    </div>
  </template>

<script>
export default {
  name: 'ScrollableTable',
  data () {
    return {
      columns: [
        { name: 'tanggal', label: 'Tanggal', align: 'left', field: 'tanggal' },
        { name: 'jamMasuk', label: 'Jam Masuk', align: 'center', field: 'jamMasuk' },
        { name: 'jamKeluar', label: 'Jam Keluar', align: 'center', field: 'jamKeluar' }
      ],
      rows: [
        { tanggal: '01-01-1997', jamMasuk: '00:00:00', jamKeluar: '23:59:59' },
        { tanggal: '01-01-1997', jamMasuk: '00:00:00', jamKeluar: '23:59:59' },
        { tanggal: '01-01-1997', jamMasuk: '00:00:00', jamKeluar: '23:59:59' },
        { tanggal: '01-01-1997', jamMasuk: '00:00:00', jamKeluar: '23:59:59' },
        { tanggal: '01-01-1997', jamMasuk: '00:00:00', jamKeluar: '23:59:59' },
        { tanggal: '01-01-1997', jamMasuk: '00:00:00', jamKeluar: '23:59:59' },
        { tanggal: '01-01-1997', jamMasuk: '00:00:00', jamKeluar: '23:59:59' },
        { tanggal: '01-01-1997', jamMasuk: '00:00:00', jamKeluar: '23:59:59' },
        { tanggal: '01-01-1997', jamMasuk: '00:00:00', jamKeluar: '23:59:59' },
        { tanggal: '01-01-1997', jamMasuk: '00:00:00', jamKeluar: '23:59:59' }
      ]
    }
  }
}
</script>

  <style lang="sass">
  .scrollable-container
    max-height: 300px
    overflow-y: auto
    border: 1px solid #e0e0e0
    border-radius: 4px

  .q-table thead tr th
    position: sticky
    top: 0
    background: white
    z-index: 1

  </style>
