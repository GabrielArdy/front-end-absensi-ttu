<template>
    <q-btn
      label="Download Report"
      color="secondary"
      icon="download"
      @click="downloadReport"
      class="full-width"
      size="lg"
      glossy
      unelevated
    />
  </template>

<script>
export default {
  name: 'DownloadButton',
  methods: {
    downloadReport () {
      console.log('Downloading report...')
    }
  }
}
</script>

  <style lang="sass">

  .q-btn:hover
    transform: translateY(-2px)
    transition: transform 0.2s ease-in-out
  </style>
