<template>
  <div class="modal">
    <div class="container">
      Are you sure you want to delete this contact?
      <div class="buttons">
        <button @click="acceptDelete" class="accept-btn">Yes</button>
        <button @click="close" class="cancel-btn">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import {eventBus} from '../main'
export default {
  name: 'ModalDelete',
  methods: {
    /*
     * Close delete-modal without deleting contact
     * In component 'Contact.vue'
     */
    close: function () {
      eventBus.$emit('closeModal', { type: 'delete' })
    },
    /*
     * Delete contact
     * In component 'Contact.vue'
     */
    acceptDelete: function () {
      eventBus.$emit('deleteContact')
    }
  }
}
</script>

<style scoped>
  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
  }
  .accept-btn, .cancel-btn {
    width: 100px;
    font-size: 22px;
    border-radius: 10px;
    margin-left: 10px;
    margin-right: 10px;
    color: white;
    padding: 5px 15px 5px;
    background-color: rgba(0, 0, 0, 0.6);
    border-style: none;
    outline: none;
    transition: 0.3s;
    text-align: center;
  }
  .accept-btn {
    border-style: solid;
    border-color: #034ba8;
    border-width: 1px;
  }
  .accept-btn:active, .cancel-btn:active {
    background-color: #034ba8;
  }
</style>
