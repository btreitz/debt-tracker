<template>
  <div id="all-content">
    <img src="../assets/logo.png" alt="logo">
    <form v-on:submit="login">
      <input type="text" name="email" placeholder="Email"/><br>
      <input type="password" name="password" placeholder="Password"/><br>
      <input type="submit" value="Login"/>
    </form>
 </div>
</template>

<script>
import axios from 'axios'
import { eventBus } from '../main'
export default {
  name: 'Login',
  methods: {
    login: (e) => {
      e.preventDefault()
      let login = () => {
        // Beide Informationen werden zu einer data zusammengefasst
        let data = {
          email: e.target.elements.email.value,
          password: e.target.elements.password.value
        }
        /*
         * Send data to Backend for authentication
         */
        axios.post('/api/login', data)
          .then((response) => {
            /* Routing zum Dashboard
             * In component 'App.vue'
             */
            eventBus.$emit('changePhase', true)
          })
          .catch((error) => {
            eventBus.$emit('showInfo', error.response.data.message[0])
          })
      }
      login()
    },
    /*
     * If User is already logged in on route to Login, reroute immediately to MainViews
     */
    checkUserAuthenticated: function () {
      axios.get('/api/checkAuthenticated')
        .then(response => {
          this.$router.push({name: 'MainViews'})
        })
        .catch(() => {
        })
    }
  },
  created () {
    this.checkUserAuthenticated()
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
    height: 43%;
    width: 100%;
  }
  img {
    height: 130px;
    width: 130px;
    margin-bottom: 50px;
  }
</style>
