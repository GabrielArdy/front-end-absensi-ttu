<template>
    <div class="col-12 q-mt-md">
          <q-card class="history-card">
            <q-card-section>
              <div class="text-h6 text-center">Riwayat Presensi</div>
              <div class="text-caption text-center">Selasa, 03 Desember 2024</div>
              <div class="history-container row justify-between">
                <div class="container-checkin column items-center">
                  <q-icon name="eva-log-in" class="text-positive" size="20px"/>
                  <div class="text-grey q-mt-sm" caption>00:00:00</div>
                </div>
                <div class="container-checkout column items-center">
                  <q-icon name="eva-log-out" class="text-negative" size="20px"/>
                  <div class="text-grey q-mt-sm" caption>00:00:00</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
</template>

<script>
export default {
  name: 'HistoryCard'
}

</script>
