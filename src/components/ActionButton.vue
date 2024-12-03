<template>
          <div class="row q-col-gutter-md justify-between text-white">
            <div class="col-6">
              <q-btn class="bg-positive full-width" style="height: 120px" push>
                <div class="column items-center justify-center">
                  <q-icon name="eva-log-in" size="64px"/>
                  <div class="text-subtitle2 q-mt-md">Masuk</div>
                </div>
              </q-btn>
            </div>
            <div class="col-6">
              <q-btn class="bg-negative full-width" style="height: 120px" push>
                <div class="column items-center justify-center">
                  <q-icon name="eva-log-out" size="64px"/>
                  <div class="text-subtitle2 q-mt-md">Keluar</div>
                </div>
              </q-btn>
            </div>
          </div>
</template>

<script>
export default {
  name: 'ActionButton'
}

</script>
