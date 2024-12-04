<template>
    <div>
      <q-card flat bordered class="q-pa-md">
        <div class="text-h6">Filter Laporan</div>
        <q-option-group
          v-model="filterType"
          :options="options"
          inline
          type="radio"
        />
      </q-card>
    </div>
  </template>

<script>
export default {
  name: 'FilterLaporan',
  data () {
    return {
      filterType: 'mingguan',
      options: [
        { label: 'Mingguan', value: 'mingguan' },
        { label: 'Bulanan', value: 'bulanan' }
      ]
    }
  }
}
</script>
