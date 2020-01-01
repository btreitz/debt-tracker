<template>
  <div class="login-reg-view">
    <div id="login" class="views">
      <Login/>
    </div>
    <div id="sign-up" class="views">
      <Register/>
    </div>
  </div>
</template>

<script>
import Register from './Register'
import Login from './Login'
export default {
  name: 'LoginRegProcess',
  components: {Login, Register}
}
</script>

<style scoped>
  .login-reg-view {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  .views {
    height: 100%;
    width: 100%;
    flex-shrink: 0;
    overflow-y: scroll;
    scroll-snap-align: start; /* latest (Chrome 69+) */
    scroll-snap-coordinate: 0% 0%; /* older (Firefox/IE) */
    -webkit-scroll-snap-coordinate: 0% 0%; /* older (Safari) */
  }
</style>
