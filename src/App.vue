<script setup lang="ts">
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="app-wrapper">
    <div class="app">
      <Navigation />
      <RouterView />
      <Footer />
    </div>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}
</style>