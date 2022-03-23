<template>
  <form @submit.prevent="submit">
    <form-input
      v-model="username"
      name="UserName"
      type="text"
      :error="usernameStatus.message"
      autocomplete="username"
    />

    <form-input
      v-model="password"
      name="Password"
      type="password"
      :error="passwordStatus.message"
      autocomplete="password"
    />

    <button
      class="button is-primary"
      :disabled="!usernameStatus.valid || !passwordStatus.valid"
    >
      Submit
    </button>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import FormInput  from '@/components/UI/FormInput.vue'
import {Status, validate, required, length} from '../validation'
import { User, useStore } from '../store'
import { useModal } from '../useModal'

export default defineComponent({
  components: {
    FormInput
  },

  setup() {
    const modal = useModal()
    const store = useStore()

    const username = ref('username')
    const password =ref('password')
    const usernameStatus = computed<Status>(() => {
      return validate(username.value, [required(), length({min: 5, max: 10})])
    })

    const passwordStatus = computed<Status>(() => {
      return validate(password.value, [required(), length({min: 10, max: 40})])
    })

    const submit = async (evt: Event) => {
      // evt.preventDefault()

      if( !usernameStatus.value.valid ||
          !passwordStatus.value.valid
      ) {
        return false
      }

      const newUser:User = {
        id: '-1',
        username: username.value,
        password: password.value
      }

      await store.createUser(newUser)
      modal.hideModal()
    }

    return {
      usernameStatus,
      username,
      password,
      passwordStatus,
      submit
    }
  }
});
</script>

<style scoped>
  form {
    padding: 15px;
    background-color: #fff;
  }
</style>
