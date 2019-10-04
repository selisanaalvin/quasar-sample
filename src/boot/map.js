import * as VueGoogleMaps from 'vue2-google-maps'
// leave the export, even if you don't use it
export default ({ Vue }) => {
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyA2N39ibexwzMLMb7bMJgOVR2VIOCu2l9k",
    libraries: "places", // necessary for places input
    v:'3.26'
  }
})
   
}