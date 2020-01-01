<template>
  <div id="all-content">
    <form v-on:submit="register">
      <input type="text" name="username" placeholder="Username" ref="username" required/><br>
      <input type="text" name="email" placeholder="Email" ref="email" required/><br>
      <input type="password" name="password" placeholder="Password" ref="password" required/><br>
      <input type="password" name="confPassword" placeholder="Password" ref="confPassword" required/><br>
      <input type="submit" value="Sign up"/>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { eventBus } from '../main'
export default {
  name: 'Register',
  methods: {
    register: (e) => {
      e.preventDefault()
      let register = () => {
        // Beide Informationen werden zu einer data zusammengefasst
        let data = {
          username: e.target.elements.username.value,
          email: e.target.elements.email.value,
          password: e.target.elements.password.value,
          confPassword: e.target.elements.confPassword.value
        }
        /*
         * Server-side validation and insertion in database
         */
        axios.post('/api/register', data)
          .then((response) => {
            /* Info-popup
             * In component 'App.vue'
             */
            eventBus.$emit('showInfo', response.data.message[0])
            /* Routing zum Dashboard
             * In component 'App.vue'
             */
            eventBus.$emit('scroll', 'first')
          })
          .catch((error) => {
            eventBus.$emit('showInfo', error.response.data.message[0])
          })
      }
      register()
    }
  }
}
</script>
<style scoped>
  #all-content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  form {
    height: 44.3%;
    width: 100%;
  }
</style>
