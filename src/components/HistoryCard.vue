<template>
        <q-card class="history-card">
            <q-card-section>
              <div class="text-h6 text-center">Riwayat Presensi</div>
              <div class="text-caption text-center">{{ date }}</div>
              <div class="history-container row justify-between">
                <div class="container-checkin column items-center">
                  <q-icon name="eva-log-in" class="text-positive" size="20px"/>
                  <div class="text-grey q-mt-sm" caption>{{ checkin }}</div>
                </div>
                <div class="container-checkout column items-center">
                  <q-icon name="eva-log-out" class="text-negative" size="20px"/>
                  <div class="text-grey q-mt-sm" caption>{{ checkout }}</div>
                </div>
              </div>
            </q-card-section>
        </q-card>
</template>

<script>
export default {
  name: 'HistoryCard',
  props: {
    checkin: {
      type: String,
      default: '00:00:00'
    },
    checkout: {
      type: String,
      default: '00:00:00'
    },
    date: {
      type: String,
      default: 'Selasa, 03 Desember 2024'
    }
  }
}

</script>
