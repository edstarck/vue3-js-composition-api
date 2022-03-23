<template>
  <div class="navbar">
    <div class="navbar-end">
      <div
        v-if="auth"
        class="buttons"
      >
        <router-link
          to="/posts/new"
          class="button"
        >
          New Post
        </router-link>
        <button
          class="button"
          @click="signOut"
        >
          Sign OUT
        </button>
      </div>

      <div
        v-else
        class="buttons"
      >
        <button
          class="button"
          @click="signUp"
        >
          Sign UP
        </button>
        <button
          class="button"
          @click="signIn"
        >
          Sign IN
        </button>
      </div>
    </div>
  </div>

  <teleport to="#modal">
    <component :is="component" />
  </teleport>
</template>

<script lang="ts">
import { defineComponent, computed, h, markRaw } from 'vue'
import { useModal } from '../../useModal'
import Signup from '@/components/Signup.vue'
import {useStore} from '@/store';

export default defineComponent({
  components: {
    Signup
  },
  setup() {
    const modal = useModal()
    const store = useStore()

    const auth = computed(() => {
      return !!store.getState().authors.currentUserId
    })

    const signOut = () => {
    }
    const signIn = () => {
      const Demo = defineComponent({
        setup() {
          return () => h('div', 'Demo')
        }
      })

      modal.component.value = markRaw(Demo)
      modal.showModal()
    }
    const signUp = () => {
      modal.component.value = markRaw(Signup)
      modal.showModal()
    }

    return {
      component: modal.component,
      signOut,
      signIn,
      signUp,
      auth
    }
  }
});
</script>