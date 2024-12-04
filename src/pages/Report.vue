<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="text-h6 text-center text-weight-medium q-my-md">Laporan</div>

      <div class="q-mb-md">
        <profile-card />
      </div>

      <div class="q-mb-md">
        <filter-section />
      </div>

      <div>
        <report-table />
      </div>

      <q-btn
        push
        class="q-mt-md full-width"
        label="Download Laporan"
        color="primary"
        icon="eva-download-outline"
      />
    </div>
  </q-page>
</template>

<script>

import ProfileCard from 'components/ProfileCard.vue'
import FilterSection from 'src/components/FilterSection.vue'
import ReportTable from 'src/components/ReportTable.vue'

export default {
  components: {
    ProfileCard,
    FilterSection,
    ReportTable
  }
}
</script>

<style lang="sass">
  .full-width
    width: 100%

</style>
