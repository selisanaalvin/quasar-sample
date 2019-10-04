
<template>
  <GmapMap
     :center="position"
    :zoom="30"
    map-type-id="terrain"
    style="width: 500px; height: 300px"
  >
  
  <GmapMarker ref="myMarker"
    :position="position" />
  
  </GmapMap>
</template>

<script>

  export default {
    name:'Map',
  
    data(){
      return {
        position:{lat:0,lng:0}
      }
    },
    mounted(){
      
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(this.showPosition)
      }
    },
    methods:{
      showPosition(pos){
         this.position = {lat:pos.coords.latitude,lng:pos.coords.longitude}
         console.log('Latitude: '+pos.coords.latitude)
         console.log('Long: '+pos.coords.longitude)
         console.log(pos.coords.accuracy)
      }

    }

  }
</script>