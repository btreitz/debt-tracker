<template>
  <div id="app">
    <a class="info-container" :class="{infoShowing: showInfo}">
      <div class="info">
        {{ message }}
      </div>
    </a>
    <div id="view">
      <div class="swipe-view" v-on:scroll="logScroll($event.target)" ref="swipeView">
        <router-view/>
      </div>
    </div>
    <!-- Navigation changes with v-if, when on dashboard / Login -->
    <nav>
      <a class="nav-item-wrapper" v-if="!mainView && !contactView">
        <svg class="nav-item" v-bind:class="{active: activeNavItem === 'first'}" @click="scrollView('first')" width="100%" height="100%" version="1.1" viewBox="-10 0 126 160" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
          <metadata>
            <rdf:RDF>
              <cc:Work rdf:about="">
                <dc:format>image/svg+xml</dc:format>
                <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
                <dc:title/>
              </cc:Work>
            </rdf:RDF>
          </metadata>
          <path d="m7.1815 66.348h65.39v24.19h-65.39z"/>
          <path d="m91.141 77.931-37.835 27.871 0.0096-27.892 0.0096-27.892 18.908 13.957z"/>
          <path d="m42.229 30.451c-5.1053 0-9.2461 4.1408-9.2461 9.2461v23.105l0.98438-0.02539c0.09344-0.0024 0.14764-0.0059 0.16406-0.0059 0.26555 0 0.52997 0.02073 0.79492 0.05664l1.0898 0.14648v-22.412c0-3.9682 3.1646-7.1328 7.1328-7.1328h53.004c3.9682 0 7.1328 3.1646 7.1328 7.1328v75.186c0 3.9682-3.1646 7.1328-7.1328 7.1328h-53.004c-3.9682 0-7.1328-3.1646-7.1328-7.1328v-21.146l-1.0898 0.14844c-0.26392 0.03576-0.52833 0.05469-0.79492 0.05469-0.0225 0-0.0758-0.0035-0.16211-0.0059l-0.98633-0.02539v21.898c0 5.1053 4.1408 9.2441 9.2461 9.2441h54.791c5.1053-2e-5 9.2441-4.1388 9.2441-9.2441v-76.975c0-5.1053-4.1388-9.2461-9.2441-9.2461z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" shape-rendering="auto" solid-color="#000000" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;isolation:auto;mix-blend-mode:normal;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
        </svg>
      </a>
      <a class="nav-item-wrapper" v-if="!mainView && !contactView">
        <svg class="nav-item" v-bind:class="{active: activeNavItem === 'second'}" @click="scrollView('second')" width="100%" height="100%" version="1.1" viewBox="50 32 126 140" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
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
          <path d="m100.26 112.17a37.514 27.214 0 0 0-37.486 26.647h3.8483a33.867 24.568 0 0 1 33.789-23.434 33.867 24.568 0 0 1 33.812 23.434h3.5119a37.514 27.214 0 0 0-37.475-26.647z"/>
          <path d="m99.786 70.781a19.466 19.466 0 0 0-19.466 19.466 19.466 19.466 0 0 0 19.466 19.465 19.466 19.466 0 0 0 19.465-19.465 19.466 19.466 0 0 0-19.465-19.466zm-0.0847 3.268a16.253 16.253 0 0 1 16.253 16.253 16.253 16.253 0 0 1-16.253 16.253 16.253 16.253 0 0 1-16.253-16.253 16.253 16.253 0 0 1 16.253-16.253z"/>
          <rect x="117.93" y="68.135" width="33.829" height="4.5357" ry="2.2679"/>
          <rect transform="rotate(90)" x="53.149" y="-136.62" width="33.829" height="4.5357" ry="2.2679"/>
        </g>
      </svg>
      </a>
      <a class="nav-item-wrapper" v-if="mainView || contactView">
        <svg class="nav-item" v-bind:class="{active: activeNavItem === 'first' && !contactView}" @click="scrollView('first')" width="100%" height="100%" version="1.1" viewBox="25 13 126 140" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
          <metadata>
            <rdf:RDF>
              <cc:Work rdf:about="">
                <dc:format>image/svg+xml</dc:format>
                <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
                <dc:title/>
              </cc:Work>
            </rdf:RDF>
          </metadata>
          <path transform="scale(.26458)" d="m360.29 147.67c-0.94472-0.01517-1.8744 0.08469-2.7773 0.27539-2.9748-0.50742-6.2845 0.20768-9.166 2.2695l-145.14 103.86c-5.5124 3.9443-7.3023 11.239-4.0117 16.355 3.2906 5.1167 10.378 6.0595 15.891 2.1152l29.912-21.402v183.61c0 0.16423 0.01844 0.32297 0.02148 0.48633h-26.271c-10.783-1e-5 -19.465 5.0298-19.465 11.279 0 6.2495 8.6816 11.281 19.465 11.281h283.93c10.783 0 19.465-5.0318 19.465-11.281 0-6.2495-8.6816-11.279-19.465-11.279h-29.127c0.00305-0.16336 0.02149-0.3221 0.02149-0.48633v-179.39l24.316 17.934c5.455 4.0232 12.944 3.4688 16.793-1.2422 3.849-4.711 2.5566-11.742-2.8984-15.766l-143.63-105.93c-2.3866-1.7602-5.1632-2.6443-7.8535-2.6875zm-2.1875 22.535 93.035 68.615v196.42h-48.072v-113.58c0-5.7731-5.4562-10.422-12.234-10.422h-65.434c-6.7782 0-12.234 4.6488-12.234 10.422v113.58h-47.025v-199.23l91.965-65.805zm-23.09 153.63h45.68c4.7318 0 8.541 4.6468 8.541 10.42v100.98h-62.762v-100.98c0-5.7731 3.8092-10.42 8.541-10.42z"/>
        </svg>
      </a>
      <a class="nav-item-wrapper" v-if="mainView">
        <svg class="nav-item" v-bind:class="{active: activeNavItem === 'second'}" @click="scrollView('second')" width="100%" height="100%" version="1.1" viewBox="25 37 126 140" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
          <metadata>
            <rdf:RDF>
              <cc:Work rdf:about="">
                <dc:format>image/svg+xml</dc:format>
                <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
                <dc:title/>
              </cc:Work>
            </rdf:RDF>
          </metadata>
            <path transform="scale(.26458)" d="m345.28 237.63a161.12 161.12 0 0 0-161.12 161.12 161.12 161.12 0 0 0 161.12 161.12 161.12 161.12 0 0 0 161.12-161.12 161.12 161.12 0 0 0-161.12-161.12zm-0.31445 18.688a142.43 142.43 0 0 1 142.43 142.43 142.43 142.43 0 0 1-142.43 142.43 142.43 142.43 0 0 1-142.43-142.43 142.43 142.43 0 0 1 142.43-142.43z"/>
            <path transform="scale(.26458)" d="m344.02 268.95c-5.2927 0-9.5527 4.4834-9.5527 10.055v7.8398c-28.283 5.0506-49.759 29.753-49.76 59.488-5.9e-4 33.386 27.063 60.453 60.449 60.453 0.33811-0.01512 0.67779-0.03113 1.0156-0.05078 0.45037-0.02268 0.90071-0.03781 1.3516-0.04688 24.06 5.7e-4 43.564 19.505 43.564 43.564 4.5e-4 24.06-19.504 43.566-43.564 43.566-24.061 4.5e-4 -43.567-19.505-43.566-43.566 0.01058-0.22563 0.02067-0.45056 0.03125-0.67578 0.46193-15.343-16.042-16.436-16.059 0.67578 1.0407 32.071 19.859 53.217 46.537 58.262v6.9492c0 5.5712 4.2601 10.057 9.5527 10.057s9.5547-4.4854 9.5547-10.057v-6.1133c30.381-3.1929 54.06-28.882 54.061-60.109 5.7e-4 -33.386-27.063-60.453-60.449-60.453-0.33807 0.01512-0.67583 0.02917-1.0137 0.04883-0.45036 0.02267-0.90266 0.03975-1.3535 0.04883-24.06-5.7e-4 -43.564-19.505-43.564-43.564-4.3e-4 -24.06 19.504-43.566 43.564-43.566 24.061-4.4e-4 43.567 19.505 43.566 43.566-0.00756 0.22541-0.01808 0.45055-0.0332 0.67578-0.46193 15.343 16.042 16.436 16.059-0.67578-1.0949-33.769-21.898-55.426-50.836-58.926v-7.3906c0-5.5712-4.262-10.055-9.5547-10.055z"/>
        </svg>      </a>
      <a class="nav-item-wrapper" v-if="mainView">
        <svg class="nav-item" v-bind:class="{active: activeNavItem === 'third'}" @click="scrollView('third')" width="100%" height="100%" version="1.1" viewBox="40 37 126 140" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
          <metadata>
            <rdf:RDF>
              <cc:Work rdf:about="">
                <dc:format>image/svg+xml</dc:format>
                <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
                <dc:title/>
              </cc:Work>
            </rdf:RDF>
          </metadata>
          <path d="m104.9 61.454c-2.539 0-4.5827 2.297-4.5827 5.1501v33.39h-33.017c-2.8531 0-5.1501 2.0437-5.1501 4.5827s2.297 4.5832 5.1501 4.5832h33.017v32.567c0 2.853 2.0437 5.1496 4.5827 5.1496s4.5832-2.2965 4.5832-5.1496v-32.567h32.94c2.8531 0 5.1501-2.0442 5.1501-4.5832s-2.297-4.5827-5.1501-4.5827h-32.94v-33.39c0-2.8531-2.0442-5.1501-4.5832-5.1501z"/>
        </svg>
      </a>
    </nav>
  </div>
</template>

<script>
import { eventBus } from './main'
export default {
  name: 'App',
  data () {
    return {
      // Für Farbliche Markierung, welches Icon blau sein soll
      swipeViewWidth: 0,
      activeNavItem: 'first',
      mainView: false,
      contactView: false,
      message: '',
      showInfo: false
    }
  },
  methods: {
    /*
     * Scroll horizontal on click on navigation
     * 'first' & 'second' in LoginRegProcess
     * 'first', 'second# & 'third' in MainViews
     */
    scrollView: function (destination) {
      // If user is in contactView, route to mainViews
      if (this.contactView) {
        this.$router.push('/home')
      } else {
        // Login wurde geklickt und sign up view ist gerade offen
        if (destination === 'first' && this.activeNavItem !== 'first') {
          this.$refs.swipeView.scrollTo({
            left: 0,
            behavior: 'smooth'
          })
        } else if (destination === 'second' && this.activeNavItem !== 'second') {
          this.$refs.swipeView.scrollTo({
            left: this.swipeViewWidth,
            behavior: 'smooth'
          })
        } else if (destination === 'third' && this.activeNavItem !== 'third') {
          this.$refs.swipeView.scrollTo({
            left: this.swipeViewWidth * 2,
            behavior: 'smooth'
          })
        }
      }
    },
    /*
     * Set navigation active, depending on current scrollLeft in window
     */
    logScroll: function (e) {
      if (this.activeNavItem !== 'first' && e.scrollLeft < this.swipeViewWidth / 2) {
        this.activeNavItem = 'first'
      } else if (this.activeNavItem !== 'third' && e.scrollLeft > this.swipeViewWidth * 1.5) {
        this.activeNavItem = 'third'
      } else if (this.activeNavItem !== 'second' && e.scrollLeft > this.swipeViewWidth / 2 && e.scrollLeft < this.swipeViewWidth * 1.5) {
        this.activeNavItem = 'second'
      }
    },
    /*
     * Set window width for horizontal scroll
     */
    getSwipeViewWidth: function () {
      this.swipeViewWidth = this.$refs.swipeView.clientWidth
    }
  },
  mounted () {
    this.getSwipeViewWidth()
  },
  created () {
    // set navigation icons
    this.mainView = this.$route.name === 'MainViews'
    this.contactView = this.$route.name === 'Contact'
    /*
     * Change phase between /home & /login at successful login/logout
     */
    eventBus.$on('changePhase', (toMainPhase) => {
      if (toMainPhase) {
        this.$router.push('/home')
      } else {
        this.$router.push('/login')
      }
    })
    /*
     * Scroll activated from other vue-components
     */
    eventBus.$on('scroll', (destination) => {
      this.scrollView(destination)
    })
    /*
     * Activate info-popup with dynamic message
     */
    eventBus.$on('showInfo', (message) => {
      this.message = message
      this.showInfo = true
      // eslint-disable-next-line no-return-assign
      setTimeout(() => this.showInfo = false, 3000)
    })
  },
  watch: {
    /*
     * After logout, login component should be active (scrollLeft = 0), not registration
     */
    '$route' (to, from) {
      if (to.name === 'LoginRegProcess') {
        this.$refs.swipeView.scrollLeft = 0
      }
      // set navigation icons
      this.mainView = to.name === 'MainViews'
      this.contactView = to.name === 'Contact'
    }
  }
}
</script>
<style lang="css" src="./styles/main.css">
</style>
