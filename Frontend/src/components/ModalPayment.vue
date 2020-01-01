<template>
  <div class="modal">
    <div class="container">
      <form v-on:submit="addPayment">
        <a class="row" id="radio-btns">
          <a class="center-container">
            <a class="radio-btn">
              <input type="radio" id="receive" name="whoOwesWho" value="receive" checked>
              <label for="receive">Receive</label>
            </a>
            <a class="radio-btn">
              <input type="radio" id="pay" name="whoOwesWho" value="pay">
              <label for="pay">Pay</label>
            </a>
          </a>
        </a>
        <a class="row">
          <label class="explain-input" for="amount">Amount</label>
          <a class="amount-fields">
            <input id="amount" type="number" name="amount" step="0.01" min="0" placeholder="0.00" ref="amount" required/>
            <span class="currency">€</span>
          </a>
        </a>
        <a class="row">
          <label class="explain-input" for="date">Date</label>
          <input type="date" id="date" name="date" ref="date" required/>
        </a>
        <a class="row">
          <label class="explain-input" for="description">Description</label>
          <input type="text" id="description" name="description" maxlength="200"/>
        </a>
        <a class="row">
          <a class="center-container">
            <input id="add-payment" type="submit" value="Add payment"/>
            <button @click="close" class="cancel-btn">Cancel</button>
          </a>
        </a>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {eventBus} from '../main'
export default {
  name: 'ModalPayment',
  props: ['contactID'],
  methods: {
    /*
     * Close Modal without change
     */
    close: function () {
      eventBus.$emit('closeModal', { type: 'payment', changed: false })
    },
    addPayment: function (e) {
      e.preventDefault()
      let data = {
        contactID: this.contactID,
        receive: e.target.elements.receive.checked,
        amount: e.target.elements.amount.valueAsNumber,
        currency: '€',
        description: e.target.elements.description.value,
        date: e.target.elements.date.value
      }
      /*
       * Send data to backend
       */
      axios.post('/api/addPayment', data)
        .then(() => {
        })
        .catch(() => {
        })
        .finally(() => {
          /* Close modal with change
           * In component 'Contact.vue'
           */
          eventBus.$emit('closeModal', { type: 'payment', changed: true })
        })
    }
  }
}
</script>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .row {
    width: 100%;
    font-size: 20px;
    margin-top: 10px;
    display: flex;
  }
  #amount {
    margin-right: 7px;
    width: 120px;
    text-align: center;
    flex-grow: 1;
  }
  .cancel-btn {
    font-size: 22px;
    border-radius: 10px;
    color: white;
    background-color: rgba(0, 0, 0, 0.6);
    border-style: none;
    outline: none;
    transition: 0.3s;
    text-align: center;
    height: 40px;
    padding-left: 15px;
    padding-right: 15px;
    margin-left: 5px;
  }
  .cancel-btn:active {
    background-color: #034ba8;
  }
  .currency {
    height: 40px;
    font-size: 20px;
    border-radius: 15px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    background-color:rgba(0, 0, 0, 0.4);
    color: white;
    border-style: none;
    padding-left: 15px;
    padding-right: 15px;
    line-height: 40px;
  }
  #add-payment {
    width: auto;
    margin-top: 0;
    background-color: rgba(0, 0, 0, 0.6);
    border-style: solid;
    border-color: #034ba8;
    border-radius: 10px;
    border-width: 1px;
    margin-right: 5px;
  }
  #add-payment:active {
    color: #034ba8;
  }
  label {
    margin-left: 5px;
  }
  .radio-btn {
    height: 40px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.6);
    border-width: 1px;
    border-radius: 15px;
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
    align-items: center;
    margin-right: 5px;
    margin-left: 5px;
  }
  .explain-input {
    width: 30%;
    font-size: 14px;
    margin-left: 0;
    text-align: left;
  }
  #description {
    width: 70%;
  }
  #date {
    width: 70%;
  }
  .amount-fields {
    width: 70%;
    display: flex;
    justify-content: flex-end;
  }
  .center-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>
