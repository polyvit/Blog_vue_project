<script setup lang="ts">
import IconInstagram from './icons/IconInstagram.vue'
import IconTwitter from './icons/IconTwitter.vue'
import IconYoutube from './icons/IconYoutube.vue'
import { useUserStore } from '../stores/UserStore'
import { computed } from 'vue'

const authUser = computed(() => useUserStore().user)
</script>

<template>
  <footer>
    <div class="container">
      <div class="top">
        <RouterLink class="header" :to="{ name: 'home' }">DishonestBlog</RouterLink>
        <ul>
          <RouterLink class="link" :to="{ name: 'home' }">Home</RouterLink>
          <RouterLink class="link" :to="{ name: 'blogs' }">Blogs</RouterLink>
          <RouterLink v-if="authUser" class="link" :to="{ name: 'create-post' }"
            >Create Post</RouterLink
          >
          <RouterLink v-if="!authUser" class="link" :to="{ name: 'login' }"
            >Log In / Register</RouterLink
          >
        </ul>
      </div>
      <div class="bottom">
        <p>polina98_08@mail.ru</p>
        <ul>
          <li>
            <a href="#">
              <IconInstagram class="svg-icon" />
            </a>
          </li>
          <li>
            <a href="#">
              <IconTwitter class="svg-icon" />
            </a>
          </li>
          <li>
            <a href="#">
              <IconYoutube class="svg-icon" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
$dark-color: #232536;

footer {
  margin-top: auto;
  padding: 50px 25px;
  background-color: $dark-color;
  .container {
    display: flex;
    flex-direction: column;
    gap: 32px;
    @media (min-width: 800px) {
      flex-direction: column;
      gap: 32px;
    }

    > div {
      display: flex;
      flex: 1;
    }

    .top {
      gap: 32px;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      @media (min-width: 800px) {
        flex-direction: row;
        justify-content: space-between;
      }

      .header {
        font-size: 24px;
        color: #fff;
        text-decoration: none;
        font-weight: 600;
        @media (min-width: 800px) {
          text-align: initial;
        }
      }
      ul {
        gap: 16px;
        list-style: none;
        display: flex;
        height: 100%;
        justify-content: center;
        flex-wrap: wrap;
        .link {
          font-size: 16px;
          font-weight: 500;
          color: #fff;
          text-decoration: none;
        }
        // ul {
        //   height: 100%;
        //   justify-content: center;
        //   flex-direction: row;
        //   flex-wrap: wrap;
        //   @media (min-width: 800px) {
        //     flex-direction: column;
        //   }
        //   .link {
        //     font-size: 16px;
        //     font-weight: 500;
        //     color: #fff;
        //     text-decoration: none;
        //   }
        // }
      }

      // .col-1,
      // .col-2 {
      //   gap: 32px;
      //   display: flex;
      //   flex: 1;
      //   @media (min-width: 800px) {
      //     gap: 0;
      //   }
      // }

      // .col-1 {
      //   flex-direction: column;

      //   h2 {
      //     text-align: center;
      //     @media (min-width: 800px) {
      //       text-align: initial;
      //     }
      //   }
      // }

      // .top {
      //   ul {
      //     height: 100%;
      //     justify-content: center;
      //     flex-direction: row;
      //     flex-wrap: wrap;
      //     @media (min-width: 800px) {
      //       flex-direction: column;
      //     }
      //     .link {
      //       font-size: 16px;
      //       font-weight: 500;
      //       color: #fff;
      //       text-decoration: none;
      //     }
      //   }
      // }
    }

    .bottom {
      gap: 32px;
      color: #fff;
      align-items: center;
      flex-direction: column;
      @media (min-width: 800px) {
        flex-direction: row;
        justify-content: space-between;
      }

      ul {
        gap: 16px;
        list-style: none;
        display: flex;

        li {
          display: flex;
          align-items: center;
          .svg-icon {
            width: 24px;
            height: auto;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
