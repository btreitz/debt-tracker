<template>
  <div class="feed-container">
    <div class="title-container">
      <span class="title">Payment history</span>
      <button class="logout" v-on:click="logout">
        <svg width="45" version="1.1" viewBox="75 16 40 30" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
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
          <g transform="matrix(.26458 0 0 .26458 25.53 9.6518)">
            <path d="m249.18 66.348h65.39v24.19h-65.39z"/>
            <path d="m333.14 77.931-37.835 27.871 0.02-55.784 18.908 13.957z"/>
          </g>
            <path d="m99.192 43.269c1.3508 0 2.4464-1.0956 2.4464-2.4464v-6.1132l-0.26045 0.0067c-0.0247 6.35e-4 -0.0391 0.0016-0.0434 0.0016-0.0703 0-0.14022-0.0055-0.21032-0.01499l-0.28835-0.03876v5.9298c0 1.0499-0.83729 1.8872-1.8872 1.8872h-14.024c-1.0499 0-1.8872-0.8373-1.8872-1.8872v-19.893c0-1.0499 0.8373-1.8872 1.8872-1.8872h14.024c1.0499 0 1.8872 0.8373 1.8872 1.8872v5.5949l0.28834-0.03927c0.0698-0.0095 0.13979-0.01447 0.21032-0.01447 6e-3 0 0.0201 9.26e-4 0.0429 0.0016l0.26097 0.0067v-5.7938c0-1.3508-1.0956-2.4458-2.4464-2.4458h-14.497c-1.3508 5e-6 -2.4458 1.0951-2.4458 2.4458v20.366c0 1.3508 1.0951 2.4464 2.4458 2.4464z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" shape-rendering="auto" solid-color="#000000" stroke-width=".26458" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;isolation:auto;mix-blend-mode:normal;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
          </g>
          </svg>
      </button>
    </div>
    <div class="payments-container" id="payments-container-feed">
      <div class="all-payments">
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
              {{payment[6]}}
            </span>
            <span :class="{ pay: payment[7] === -1, receive: payment[7] === 1 }">{{ payment[2] }} {{payment[3]}}</span>
          </div>
          <div class="accordion-container" id="accordion-container-feed" :class="{ opened : openedDescriptions.includes(index) }">
            <span class="payment-date">{{ payment[5]}}</span>
            <span class="payment-description">"{{ payment[4] }}"</span>
          </div>
        </div>
      </div>
    </div>
    <div class="no-payments" v-if="!payments.length">
      No payments so far
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { eventBus } from '../main'
export default {
  name: 'Feed',
  data () {
    return {
      payments: [],
      openedDescriptions: []
    }
  },
  methods: {
    /*
     * Send GET-Request to Backend for all payments to/from this user
     */
    getAllPayments: function () {
      axios.get('/api/allUserPayments')
        .then(response => {
          this.payments = response.data.payments
        })
        .catch(err => {
          eventBus.$emit('showInfo', err.response.data.message)
        })
    },
    /*
     * Send GET-Request to Backend to end this users session
     */
    logout: function (e) {
      axios.get('/api/logout')
        .then(() => {
          // args: true -> change phase to Login
          eventBus.$emit('changePhase', false)
          eventBus.$emit('showInfo', 'Logged out')
        })
    },
    /*
     * Open/Close the payment description of each payment-container
     */
    toggleAccordion: function (index) {
      if (this.openedDescriptions.includes(index)) {
        // openedDescriptions consists of indexes from array 'payments'
        this.openedDescriptions = this.openedDescriptions.filter(element => element !== index)
      } else {
        this.openedDescriptions.push(index)
      }
    }
  },
  created () {
    // '$once' to avoid multiple calls because of eventbus bug
    eventBus.$once('loadAllPayments', () => {
      this.getAllPayments()
    })
  }
}
</script>

<style scoped>
  .feed-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .title-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: start;
    width: 100%;
    font-size: 25px;
    border-bottom-style: solid;
    padding: 5px 20px 5px;
    border-width: 1px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }
  .title {
    padding: 7px 0;
  }
  .logout {
    padding: 5px 0;
    height: 43px;
    outline:none;
    border-style: none;
    flex: 1;
    text-align: right;
    background-color: rgba(0,0,0,0);
  }
  /* Ab hier kopiert von contact */
  #payments-container-feed {
    margin-top: 5px;
  }
  #accordion-container-feed {
    display: flex;
    flex-direction: column;
  }
  .payment-date {
    margin-bottom: 7px;
  }
  .payment-description {
    font-style: italic;
  }
  .no-payments {
    margin: auto;
    width: 80%;
    font-size: 24px;
  }
</style>
