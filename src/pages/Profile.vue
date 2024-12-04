<template>
    <q-page>
        <q-page-container>
        <div class="q-pa-md">
            <h1>{{ profile.title }}</h1>
            <p>{{ profile.description }}</p>
        </div>
        </q-page-container>
    </q-page>
</template>

<script>
export default {
  data () {
    return {
      profile: {
        title: 'Profile',
        description: 'This is a profile page'
      }
    }
  }
}
</script>
