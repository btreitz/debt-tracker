<template>
<div class="main-views">
  <div id="dashboard" class="views">
    <Dashboard/>
  </div>
  <div id="feed" class="views">
    <Feed/>
  </div>
  <div id="addContact" class="views">
    <AddContact/>
  </div>
  </div>
</template>

<script>
import AddContact from './AddContact'
import Feed from './Feed'
import Dashboard from './Dashboard'
export default {
  name: 'MainViews',
  components: {AddContact, Feed, Dashboard}
}
</script>

<style scoped>
  .main-views {
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
