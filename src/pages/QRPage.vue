<template>
    <q-page class="attendance-page">
      <div class="content-wrapper">
        <h1 class="title">Absensi Guru</h1>

        <div class="qr-container">
          <q-img
            src="~assets/img/qr.svg"
            spinner-color="primary"
            class="qr-code"
          />
        </div>

        <div class="countdown">
          <span class="time">{{ formattedTime }}</span>
        </div>
      </div>
    </q-page>
  </template>

<script>
export default {
  name: 'TeacherAttendance',
  data () {
    return {
      time: 59,
      timer: null
    }
  },
  computed: {
    formattedTime () {
      const minutes = Math.floor(this.time / 60)
      const seconds = this.time % 60
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
  },
  mounted () {
    this.startTimer()
  },
  beforeDestroy () {
    this.clearTimer()
  },
  methods: {
    startTimer () {
      this.timer = setInterval(() => {
        if (this.time > 0) {
          this.time--
        } else {
          this.clearTimer()
        }
      }, 1000)
    },
    clearTimer () {
      if (this.timer) {
        clearInterval(this.timer)
      }
    }
  }
}
</script>

  <style lang="sass">
  .attendance-page
    min-height: 100vh
    background-color: #e0f2f1
    display: flex
    align-items: center
    justify-content: center

    .content-wrapper
      text-align: center
      padding: 2rem
      width: 100%
      max-width: 800px
      position: relative
      margin-top: -5rem

      .title
        color: #00695c
        font-size: 3rem
        margin-bottom: 3rem
        font-weight: bold
        position: relative
        top: -2rem

      .qr-container
        background: white
        padding: 1.5rem
        border-radius: 12px
        display: inline-block
        margin-bottom: 2.5rem
        box-shadow: 0 4px 8px rgba(0,0,0,0.1)

        .qr-code
          width: 400px
          height: 400px

      .countdown
        .time
          font-size: 4rem
          font-weight: bold
          color: #333
  </style>
