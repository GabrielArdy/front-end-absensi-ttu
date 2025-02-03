<template>
    <q-page>
      <camera-view :actionType="value"/>
    </q-page>
</template>
<script>
import CameraView from 'src/components/CameraView.vue'

export default {
  name: 'CheckOut',
  components: {
    CameraView
  },
  data () {
    return {
      value: 'checkout'
    }
  }
}
</script>
