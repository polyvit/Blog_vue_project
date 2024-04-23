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
      <div class="left">
        <div class="col-1">
          <RouterLink class="header" :to="{ name: 'home' }">DishonestBlog</RouterLink>
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
        <div class="col-2">
          <ul>
            <RouterLink class="link" :to="{ name: 'home' }">Home</RouterLink>
            <RouterLink class="link" :to="{ name: 'blogs' }">Blogs</RouterLink>
            <RouterLink class="link" :to="{ name: 'create-post' }">Create Post</RouterLink>
            <RouterLink v-if="!authUser" class="link" :to="{ name: 'login' }"
              >Log In / Register</RouterLink
            >
          </ul>
        </div>
      </div>
      <div class="right">
        <p>Copyright 2024 All rights reserved</p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  margin-top: auto;
  padding: 100px 25px;
  background-color: #303030;
  .container {
    display: flex;
    flex-direction: column;
    gap: 32px;
    @media (min-width: 800px) {
      flex-direction: row;
      gap: 0px;
    }

    > div {
      display: flex;
      flex: 1;
    }

    .left {
      gap: 32px;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      @media (min-width: 800px) {
        flex-direction: row;
        align-items: initial;
        gap: 0;
      }

      .header {
        text-align: center;
        font-size: 24px;
        color: #fff;
        margin-bottom: 16px;
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
      }

      .col-1,
      .col-2 {
        gap: 32px;
        display: flex;
        flex: 1;
        @media (min-width: 800px) {
          gap: 0;
        }
      }

      .col-1 {
        flex-direction: column;

        h2 {
          text-align: center;
          @media (min-width: 800px) {
            text-align: initial;
          }
        }
        ul {
          margin-top: auto;

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

      .col-2 {
        ul {
          height: 100%;
          justify-content: center;
          flex-direction: row;
          flex-wrap: wrap;
          @media (min-width: 800px) {
            flex-direction: column;
          }
          .link {
            font-size: 16px;
            font-weight: 500;
            color: #fff;
            text-decoration: none;
          }
        }
      }
    }

    .right {
      gap: 32px;
      color: #fff;
      align-items: center;
      flex-direction: column;
      @media (min-width: 800px) {
        align-items: flex-end;
        gap: 0;
      }
    }

    p {
      margin-top: auto;
    }
  }
}
</style>
