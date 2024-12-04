<template>
  <q-page class="q-pa-md">
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <HeaderCard />
        </div>
        <div class="col-12 q-mt-md">
          <ActionButton />
        </div>
        <div class="col-12">
          <HistoryCard />
        </div>
        <div class="col-12 q-mt-md">
        </div>
      </div>
  </q-page>
</template>

<script>
import ActionButton from 'src/components/ActionButton.vue'
import HeaderCard from 'src/components/HeaderCard.vue'
import HistoryCard from 'src/components/HistoryCard.vue'
export default {
  name: 'HomePage',
  components: {
    HeaderCard,
    ActionButton,
    HistoryCard
  },
  data () {
    return {
    }
  }
}
</script>
