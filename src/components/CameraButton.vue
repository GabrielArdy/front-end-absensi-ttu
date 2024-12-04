<template>
    <div class="action-buttons">
      <q-btn
        color="white"
        flat
        icon="close"
        @click="$emit('cancel')"
        class="cancel-button"
      />
      <q-btn
        color="primary"
        outline
        label="Choose Image"
        @click="$emit('chooseImage')"
        class="choose-button"
      />
    </div>
  </template>

<script>
export default {
  name: 'CameraButton'
}
</script>

  <style lang="sass">
  .action-buttons
    position: absolute
    bottom: 20px
    left: 50%
    transform: translateX(-50%)
    display: flex
    gap: 15px

  .cancel-button
    background-color: rgba(255, 255, 255, 0.8)
    border-radius: 50%
    width: 50px
    height: 50px
    display: flex
    align-items: center
    justify-content: center

  .choose-button
    padding: 10px 20px

  </style>
