<template>
    <q-card flat bordered class="q-pa-md">
      <div class="row items-center q-gutter-sm">
        <q-avatar size="80px">
          <img :src="photoUrl" alt="Profile Picture" />
        </q-avatar>
        <div>
          <div class="text-h6">{{ displayName }}</div>
          <div class="text-caption">NIP {{ teacherId }}</div>
        </div>
      </div>
    </q-card>
  </template>

<script>
export default {
  name: 'ProfileCard',
  // use props to pass data from parent component
  props: {
    displayName: {
      type: String,
      default: 'DISPLAY_NAME'
    },
    teacherId: {
      type: String,
      default: 'TEACHER_ID'
    },
    photoUrl: {
      type: String,
      default: 'https://storage.googleapis.com/sigap-storage/default//user.png'
    }
  }
}
</script>
