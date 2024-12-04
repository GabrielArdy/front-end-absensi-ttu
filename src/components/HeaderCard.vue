<template>
    <div class="col-12">
      <q-card class="header-card text-white">
        <div class="relative-position full-width">
          <q-card-section>
            <div class="text-subtitle2 text-right">{{ currentTime }}</div>
            <div class="text-h6">Selamat datang {{ FullName }}</div>
            <div class="text-subtitle2">NIP 8989898989898</div>
          </q-card-section>
          <q-img
            src="~assets/img/welcome.svg"
            class="header-image"
          />
        </div>
  </q-card>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
export default {
  name: 'HeaderCard',
  setup () {
    const currentTime = ref('')

    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, '0')
      const minutes = now.getMinutes().toString().padStart(2, '0')
      const seconds = now.getSeconds().toString().padStart(2, '0')
      currentTime.value = `${hours}:${minutes}:${seconds}`
    }

    let timer = null

    onMounted(() => {
      updateTime() // Initial time set
      timer = setInterval(updateTime, 1000) // Update every second
    })

    onBeforeUnmount(() => {
      if (timer) clearInterval(timer)
    })

    return {
      currentTime,
      FullName: 'John Doe'
    }
  }
}

</script>
