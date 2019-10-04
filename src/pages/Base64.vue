<template>
  <q-page class="flex flex-center">
  	
  	<q-img style="height: 140px; max-width: 150px" :src="'data:image/png;base64,' + imageBase64" alt="Logo"/>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'Base64',
  data(){
  	return{
  		imageBase64:{}
  	}
  },
  async mounted(){
  	await this.$axios.get("https://raw.githubusercontent.com/izinga/UI_DEMO/master/json/project_image.json")
  			.then(res=>{
  				this.imageBase64=res.data.result
  				console.log(res.data.result)
  			})
  	}
  }
 	
 

</script>
