<script setup lang="ts">
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useUserStore } from './stores/UserStore'
import { useBlogStore } from './stores/BlogStore'

const route = useRoute()
const userStore = useUserStore()
const { getPostsFromDb } = useBlogStore()

const navDisabled = ref<boolean | null>(null)
const checkRoute = () => {
  if (route.name === 'login' || route.name == 'register' || route.name === 'reset-password') {
    navDisabled.value = true
    return
  }
  navDisabled.value = false
}
onMounted(() => {
  checkRoute()
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userStore.updateUser(user)
      userStore.getCurrentUser()
    }
  })
  getPostsFromDb()
})

watch(route, () => checkRoute())
</script>

<template>
  <div class="app-wrapper">
    <div class="app">
      <Navigation v-show="!navDisabled" />
      <RouterView />
      <Footer v-show="!navDisabled" />
    </div>
  </div>
</template>

<style lang="scss">
$black-color: black;
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
  // max-width: 1440px;
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

.arrow {
  margin-left: 8px;
  width: 12px;
  path {
    fill: #000;
  }
}
.arrow-light {
  path {
    fill: #fff;
  }
}

// button,
.router-button {
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #232536;
  color: #fff;
  border-radius: 20px;
  border: none;
  // text-transform: uppercase;
  text-decoration: none;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #474961;
  }
}

.btn_icon {
  height: 20px;
  width: 20px;
}
.btn_link {
  color: $black-color;
  text-decoration: none;
  &:visited {
    color: $black-color;
  }
}

.button-ghost {
  color: #000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;
  @media (min-width: 700px) {
    margin-top: 0;
    margin-left: auto;
  }

  i {
    margin-left: 8px;
  }
}

.button-light {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}

.button-inactive {
  pointer-events: none !important;
  cursor: none !important;
  background-color: #474961 !important;
}

.error {
  text-align: center;
  font-size: 12px;
  color: red;
  margin-bottom: 8px;
}

.blog-card-wrap {
  position: relative;
  padding: 80px 25px;
  background-color: white;
  @media (min-width: 700px) {
    padding: 100px 160px;
  }

  .blog-cards {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;

    @media (min-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
