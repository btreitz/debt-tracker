<template>
  <div class="dashboard-container">
    <form class="search-input" v-on:submit.prevent="nothing">
      <input type="text" name="search" placeholder="Search by username or email" v-on:input="filterContacts" autocomplete="off">
    </form>
    <div id="contacts-container">
      <div class="contact" v-for="(contact, index) in filteredContacts" :key="index" @click="routeToUser(contact[0])">
        {{contact[1]}}
      </div>
    </div>
    <div class="no-contacts" v-if="!originalContacts.length" v-on:click="scrollAddContact">
      Add new contacts to see them on your Dashboard
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { eventBus } from '../main'

export default {
  name: 'Login',
  data () {
    return {
      originalContacts: [],
      filteredContacts: [],
      componentKey: 0
    }
  },
  methods: {
    /*
     * GET-Request to Backend for all contacts this user has
     */
    getContacts: function () {
      axios.get('/api/contacts')
        .then(response => {
          this.originalContacts = response.data.contacts
        })
        .catch(() => {
          this.originalContacts = []
          this.$router.push({ name: 'LoginRegProcess' })
        })
        .finally(() => {
          this.filteredContacts = this.originalContacts
          // Load all payments in feed after the contacts, because user first gets to dashboard and not feed
          eventBus.$emit('loadAllPayments')
        })
    },
    // Prevent submit action from doing anything
    nothing () {},
    /*
     * Quick-Search in input field to filter all contacts in case there are many
     * Not case-sensitive
     */
    filterContacts: function (e) {
      e.preventDefault()
      this.filteredContacts = this.originalContacts.filter(contact => contact[1].toLowerCase().includes(e.target.value.toLowerCase()))
    },
    /*
     * Click on specific contact-container routes to this contact by id
     */
    routeToUser: async function (id) {
      await this.$router.push({ name: 'Contact', params: {id: id} })
    },
    /*
     * If user does not have any contacts yet
     * Click on 'no-contacts' container scrolls to 'AddContact.vue' component
     */
    scrollAddContact: function () {
      eventBus.$emit('scroll', 'third')
    }
  },
  mounted () {
    this.getContacts()
  },
  created () {
    // Dynamic refresh when new contact is added/deleted
    eventBus.$on('refreshContacts', () => {
      this.getContacts()
    })
  }
}
</script>
<style scoped>
.dashboard-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
#contacts-container {
  width: 90%;
  margin-top: 23px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.contact {
  border-style: none;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  width: 43.5vw;
  height: 43.5vw;
  margin-bottom: 3vw;
  box-shadow: 0 0 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(7, 98, 217, 0.3);
  font-size: 22px;
}
.no-contacts {
  width: 80%;
  padding: 10px 10px;
  font-size: 24px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50%;
}
</style>
