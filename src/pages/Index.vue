<template>
  <q-page class="flex flex-center">
  	<q-input label="Generate QR Code" v-model="qrtxt" @keyup.enter="GenQR"/>
  	<div v-if="gentxt!==''">
    	<qrcode :value="gentxt" :options="{ width: 200 }"></qrcode>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'Sample',
  data(){
  	return {
  		qrtxt:'',
  		gentxt:''
  	}
  },
  	methods: {
    	GenQR(){
  			this.gentxt = this.qrtxt
  			console.log(this.gentxt)
  		}
  	}
  
  }

</script>
