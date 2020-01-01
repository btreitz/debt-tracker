<template>
  <div>
    <form class="search-input" v-on:submit.prevent="nothing">
      <input type="text" name="search" placeholder="Add contact by username or email" v-on:input="searchUser" autocomplete="off">
    </form>
    <div class="user-list-container">
      <div class="user-list">
        <div class="user" v-for="(user, index) in users" :key="index" :class="{firstUser: index === 0}">
          <div class="user-all">
            <div class="user-info">
              <a class="username">{{user[0]}}</a>
              <br>
              <a class="email">{{user[1]}}</a>
            </div>
            <button class="add-btn" v-on:click="contactOperation($event, user)" :class="{firstBtn: index === 0, lastBtn: index === users.length-1}">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { eventBus } from '../main'

export default {
  name: 'addContact',
  data () {
    return {
      cancelSource: null,
      users: []
    }
  },
  methods: {
    /*
     * Search users in Database by username or email to add them as contacts
     */
    searchUser: function (e) {
      e.preventDefault()
      /* Check if value = null, @ or .
       * Prevent User from finding 20 'random' users by having empty input
       */
      if (!this.checkInput(e.target.value)) {
        this.users = []
        return
      }
      /*
       * Create cancel Token if input changes while Client still waits for response from backend
       */
      if (this.cancelSource) {
        this.cancelSource.cancel('Start new search, stop active search')
      }
      this.cancelSource = axios.CancelToken.source()
      let data = {
        searchInformation: e.target.value
      }
      axios.get('/api/searchResult', {
        params: data,
        cancelToken: this.cancelSource.token
      })
        .then((response) => {
          this.cancelSource = null
          this.users = response.data.users
          console.log(response.data.message)
        })
        .catch(() => {
          this.users = []
        })
    },
    checkInput: function (input) {
      return input.length && input !== '@' && input !== '.' && !/\s/.test(input)
    },
    nothing () {},
    // add/delete Button wurde geklickt
    contactOperation: function (e, user) {
      let data = {
        contactID: user[2]
      }
      if (e.target.innerText !== '\u2A2F') {
        // Falls der User noch nicht hinzugefügt wurde
        this.addContact(data, e)
      } else {
        // Falls der User schon hinzugefügt wurde
        this.deleteContact(data, e)
      }
    },
    /*
     * Send POST-Request to backend to add the contact to this users contacts_list in database
     */
    addContact: function (data, e) {
      axios.post('/api/addContact', data)
        .then(response => {
          console.log(response.data.message)
          eventBus.$emit('refreshContacts')
          e.target.innerText = '\u2A2F'
          e.target.style.color = '#0762d9'
          eventBus.$emit('showInfo', response.data.message)
        })
        .catch(err => {
          console.log(err)
        })
    },
    /*
     * Send POST-Request to backend to delete the contact from this users contacts_list in database
     */
    deleteContact: function (data, e) {
      axios.post('/api/deleteContact', data)
        .then(response => {
          eventBus.$emit('refreshContacts')
          e.target.innerText = '+'
          e.target.style.color = 'white'
          eventBus.$emit('showInfo', response.data.message)
        })
        .catch(err => {
          eventBus.$emit('showInfo', err.response.data.message)
        })
    }
  }
}
</script>

<style scoped>
  .user-list-container {
    margin-top: 23px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
  }
  .user-list {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .user {
    width: 100%;
    text-align: start;
    border-top-style: solid;
    border-color: rgba(255, 255, 255, 0.2);
    border-width: 1px;
  }
  .user-all {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .user-info {
    max-width: 78%;
    padding: 7px 0 7px 15px;
  }
  .username {
    font-size: 20px;
  }
  .email {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.6);
  }
  .firstUser {
    border-top-style: none;
  }
  .add-btn {
    width: 20%;
    border-style: none;
    font-size: 28px;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 0 20px 0;
    border-left-style: solid;
    border-width: 1px;
    border-color: rgba(255, 255, 255, 0.2);
    height: 55px;
    transition: 0.2s;
    outline: none;
    color: white;
  }
  .add-btn:active {
    background-color: rgba(0, 0, 0, 1);
  }
  .firstBtn {
    border-top-right-radius: 15px;
  }
  .lastBtn {
    border-bottom-right-radius: 15px;
  }
</style>
