<template>
  <div class="contact-container">
    <p class="arrow-back-container">
      <svg class="arrow-back" width="100%" height="100%" version="1.1" viewBox="20 0 800 120" @click="routeBack" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
        <metadata>
          <rdf:RDF>
            <cc:Work rdf:about="">
              <dc:format>image/svg+xml</dc:format>
              <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
              <dc:title/>
            </cc:Work>
          </rdf:RDF>
        </metadata>
        <g>
          <rect transform="rotate(-37.792)" x="-1.1442" y="74.845" width="55.185" height="5" ry="3.3073"/>
          <rect transform="rotate(37.792)" x="72.958" y="15.126" width="55.185" height="5" ry="3.3073"/>
        </g>
      </svg>
    </p>
    <div class="info-container-contact">
      <div class="username">
        <span class="username-text">{{username}}</span>
        <button class="delete-btn" @click="toggleModal('delete')">
          <svg width="30" version="1.1" viewBox="17 3 60 60" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
            <metadata>
            <rdf:RDF>
            <cc:Work rdf:about="">
            <dc:format>image/svg+xml</dc:format>
            <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
            <dc:title/>
            </cc:Work>
            </rdf:RDF>
            </metadata>
            <path fill="white" d="m55.855 30.338c0.81142 0 1.4647 0.65324 1.4647 1.4647v20.6c0 0.81142-0.65324 1.4647-1.4647 1.4647-0.81142 0-1.4647-0.65324-1.4647-1.4647v-20.6c0-0.81142 0.65324-1.4647 1.4647-1.4647zm-7.9375 0c0.81142 0 1.4647 0.65324 1.4647 1.4647v20.6c0 0.81142-0.65324 1.4647-1.4647 1.4647s-1.4647-0.65324-1.4647-1.4647v-20.6c0-0.81142 0.65324-1.4647 1.4647-1.4647zm-7.9375 0c0.81142 0 1.4647 0.65324 1.4647 1.4647v20.6c0 0.81142-0.65324 1.4647-1.4647 1.4647-0.81142 0-1.4647-0.65324-1.4647-1.4647v-20.6c0-0.81142 0.65324-1.4647 1.4647-1.4647zm7.8146-18.407a8.5045 5.9531 0 0 0-8.5044 5.9531 8.5045 5.9531 0 0 0 0.0016 0.0186h1.819a6.7361 4.7153 0 0 1 6.7298-4.6302 6.7361 4.7153 0 0 1 6.7319 4.6302h1.7255a8.5045 5.9531 0 0 0 1e-3 -0.0186 8.5045 5.9531 0 0 0-8.5044-5.9531zm-15.006 5.5185c-2.9316 0-5.2917 2.3601-5.2917 5.2917s2.3601 5.2917 5.2917 5.2917h30.522c2.9316 0 5.2916-2.3601 5.2916-5.2917s-2.3601-5.2917-5.2916-5.2917zm0.31316 1.4697h29.829c2.1056 0 3.8008 1.6952 3.8008 3.8008 0 2.1056-1.6952 3.8008-3.8008 3.8008h-29.829c-2.1056 0-3.8003-1.6952-3.8003-3.8008 0-2.1056 1.6947-3.8008 3.8003-3.8008zm-1.7301 8.5845v28.348c0 2.9316 2.3601 5.2917 5.2917 5.2917h22.867c2.9316 0 5.2917-2.3601 5.2917-5.2917v-28.348h-2.8205c0.02461 0.1851 0.04238 0.37225 0.04238 0.56431v25.916c0 2.4513-1.9733 4.4251-4.4245 4.4251h-19.121c-2.4513 0-4.4251-1.9738-4.4251-4.4251v-25.916c0-0.19205 0.01777-0.3792 0.04237-0.56431z"/>
          </svg>
      </button>
        <transition name="modal-transition">
          <div class="modal-mask" v-if="modalDeleteOpen">
            <ModalDelete class="modal-delete"></ModalDelete>
          </div>
        </transition>
      </div>
      <div class="email">
        {{email}}
      </div>
    </div>
    <button class="add-payment" @click="toggleModal('payment')">
      Add payment
    </button>
    <transition name="modal-transition">
      <div class="modal-mask" v-if="modalPaymentOpen">
        <ModalPayment class="modal-payment" :contactID="contactID"/>
      </div>
    </transition>
    <div class="payments-container">
      <div class="all-payments" id="all-payments-contact">
        <div class="payment" @click="toggleAccordion(index)" v-for="(payment, index) in payments" :class="{ lastPayment: index === payments.length-1 }" :key="index">
          <div class="payment-basic">
            <span>
              <span>
                <svg width="30" version="1.1" viewBox="8 5 15 10" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
                  <metadata>
                  <rdf:RDF>
                  <cc:Work rdf:about="">
                  <dc:format>image/svg+xml</dc:format>
                  <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
                  <dc:title/>
                  </cc:Work>
                  </rdf:RDF>
                  </metadata>
                  <g fill="#fff">
                  <path :class="{ opened1: openedDescriptions.includes(index) }" class="paths" d="M 10.1278,8.3778301 14.07,12.32003 c 0.18508,0.18508 0.18508,0.48309 0,0.66817 -0.18508,0.18508 -0.48309,0.18508 -0.66817,0 L 9.4596301,9.0459999 c -0.18508,-0.18508 -0.18508,-0.48309 -2e-7,-0.66817 0.18508,-0.18508 0.48309,-0.18508 0.6681701,2e-7 z"/>
                  <path :class="{ opened2: openedDescriptions.includes(index) }" class="paths" d="m 18.01217,9.0458 -3.9422,3.9422 c -0.18508,0.18508 -0.48309,0.18508 -0.66817,0 -0.18508,-0.18508 -0.18508,-0.48309 0,-0.66817 l 3.9422,-3.9422 c 0.18508,-0.18508 0.48309,-0.18508 0.66817,-10e-7 0.18508,0.18508 0.18508,0.48309 0,0.66818 z"/>
                  </g>
                </svg>
              </span>
              {{payment[5]}}
            </span>
            <span :class="{ pay: payment[6] === -1, receive: payment[6] === 1 }">{{ payment[2] }} {{payment[3]}}</span>
          </div>
          <div class="accordion-container" id="accordion-container-contact" :class="{ opened : openedDescriptions.includes(index) }">
            "{{ payment[4] }}"
          </div>
        </div>
      </div>
    </div>
    <div class="balance-container">
      <span>All-Time balance:</span><span :class="{ pay: balance < 0, receive: balance >= 0 }">{{ balance }} €</span>
    </div>
  </div>
</template>

<script>
import ModalDelete from './ModalDelete'
import ModalPayment from './ModalPayment'
import {eventBus} from '../main'
import axios from 'axios'
export default {
  name: 'Contact',
  components: { ModalDelete, ModalPayment },
  comments: {
    ModalDelete,
    ModalPayment
  },
  data () {
    return {
      // Werte einsetzen zum testen
      contactID: 0,
      username: '',
      email: '',
      payments: [],
      modalDeleteOpen: false,
      modalPaymentOpen: false,
      openedDescriptions: []
    }
  },
  methods: {
    /*
     * GET-Request to backend for all information between user and contact
     */
    getContactInformation: function (contactID) {
      axios.get('/api/contactInformation', {
        params: {
          ID: contactID
        }
      })
        .then(response => {
          this.username = response.data.contact[0][0]
          this.email = response.data.contact[0][1]
          this.payments = response.data.payments
          this.payments.forEach((item) => {
            item[2] *= item[6]
          })
        })
        .catch(() => {
          this.$router.push({ name: 'ContactError' })
        })
    },
    routeBack: function () {
      this.$router.push('/home')
    },
    /*
     * POST-Request to backend to delete the current contact from this users contacts_list
     */
    deleteContact: function () {
      let data = {
        contactID: this.contactID
      }
      axios.post('/api/deleteContact', data)
        .then((response) => {
          this.routeBack()
          eventBus.$emit('showInfo', response.data.message)
        })
        .catch(err => {
          eventBus.$emit('showInfo', err.response.data.message)
        })
    },
    /*
     * Open and Close either ModalDelete or ModalPayment
     */
    toggleModal: function (modalString) {
      if (modalString === 'delete') {
        this.modalDeleteOpen = !this.modalDeleteOpen
      } else {
        this.modalPaymentOpen = !this.modalPaymentOpen
      }
    },
    /*
     * Open/Close the payment description of each payment-container
     */
    toggleAccordion: function (index) {
      if (this.openedDescriptions.includes(index)) {
        this.openedDescriptions = this.openedDescriptions.filter(element => element !== index)
      } else {
        this.openedDescriptions.push(index)
      }
    }
  },
  mounted () {
    this.contactID = this.$route.params.id
    this.getContactInformation(this.contactID)
  },
  created () {
    eventBus.$on('closeModal', (modalString) => {
      if (modalString.type === 'delete') {
        this.modalDeleteOpen = false
      } else if (modalString.type === 'payment') {
        if (modalString.changed) {
          // reload page to avoid failure because of multiple eventbus call bug
          this.$router.go()
        }
        this.modalPaymentOpen = false
      }
    })
    eventBus.$on('deleteContact', () => {
      this.deleteContact()
    })
  },
  computed: {
    balance: function () {
      let tempBalance = 0
      this.payments.forEach(item => {
        tempBalance += item[2]
      })
      // to 2 decimal digits in case of calculation inaccuracy
      return tempBalance.toFixed(2)
    }
  },
  beforeDestroy () {
    // '$off' to prevent multiple eventBus calls bug
    eventBus.$off('setContact')
    eventBus.$off('deleteContact')
  }
}
</script>

<style scoped>
  .contact-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .info-container-contact {
    width: 100%;
  }
  .username {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: start;
    width: 100%;
    font-size: 25px;
    border-bottom-style: solid;
    padding: 5px 20px 5px;
    border-width: 1px;
  }
  .username-text {
    padding: 7px 0;
  }
  .delete-btn {
    outline: none;
    border-style: none;
    border-radius: 10px;
    color: white;
    padding: 0 15px 0;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .email {
    width: 100%;
    text-align: start;
    padding: 10px 20px 10px;
    margin-bottom: 4px;
  }
  .add-payment {
    width: 80%;
    min-height: 40px;
    font-size: 15px;
    border-radius: 15px;
    margin-bottom: 14px;
    padding-left: 15px;
    padding-right: 15px;
    outline: none;
    background-color:rgba(0, 0, 0, 0.6);
    color: white;
    border-style: none;
  }
  .add-payment:active {
    color: #034ba8;
  }
  #all-payments-contact {
    border-top-style: solid;
    border-bottom-style: solid;
    border-color: rgba(255, 255, 255, 0.4);
    border-width: 1px;
  }
  #accordion-container-contact {
    padding-top: 5px;
    font-style: italic;
  }
  .balance-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 26px;
    margin-top: auto;
    padding: 20px 20px 20px;
  }
  .modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 0.5s;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .modal-delete, .modal-payment {
    width: 80%;
    box-shadow: 0 0 20px rgba(0,0,0,0.8), 0 6px 6px rgba(0,0,0,0.30);
    border-radius: 15px;
    background-color: #222222;
  }
  .modal-transition-enter-active, .modal-transition-leave-active {
    transition: opacity .3s;
  }
  .modal-transition-enter, .modal-transition-leave-to {
    opacity: 0;
  }
</style>
