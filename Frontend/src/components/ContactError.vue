<template>
  <div class="contactError-container">
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
    <p class="error-text">
      This page is not available.
      <br>
      Navigate back.
    </p>
  </div>
</template>

<script>
export default {
  name: 'ContactError',
  methods: {
    /*
     * In case user routed to a contact that does not exist in hs contact list he is redirected to this component
     * Ony option is to go back to MainView
     */
    routeBack: function () {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
  .contactError-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
