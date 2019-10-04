<template>
	<div class="flex flex-center q-pa-md">
		<div class="row q-pa-md">
			<q-input class="col-md-12"  v-model="item.barcode" label="Barcode"/>

			<q-btn dense class="col-md-12 " @click="addTodo">Send<q-icon name="send"/></q-btn>

		</div>
	
	
	<div class=" row q-pa-md">
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left"></th>
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="(t,i) in items" :key="i">
         <td class="text-left"><q-checkbox :value="t.done" @click.native="updateTodo(t)"/></td>
          <td class="text-left">{{t.barcode}}</td>
          <td class="text-right">{{t.image}}</td>
          <td class="text-right" @click="removeTodo(t)"><q-btn round><q-icon name="delete" /></q-btn></td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>

</div>
</template>

<script>
const Datastore =require('nedb-promises')
var icollection= Datastore.create('ams')
export default {
	name: 'Todo',
 	data(){
	 	return{
	 		items:[],
	 		item:{
	 			done:false,
	 			barcode:'',
	 			image:''
	 		},
 		}
 	},
	async mounted(){

			const load = await icollection.find({})
			this.items = load
	},
	methods:{
		async loadTodo(){
			const load = await icollection.find({})
			this.items.push(load)
		},
		async addTodo(){
			const ins = await icollection.insert(this.item)
			this.items.push(ins)
		},
		async removeTodo(data){
			const inx = this.items.findIndex((element) => element._id === data._id )
			let rev = await icollection.remove({_id:data._id})
			this.items.splice(inx,1)
		},
		async updateTodo(data){
			if (data.done ===true){
				data.done=false
			}else{
				data.done=true
			}
			const inx = this.items.findIndex(itms => itms._id === data._id )
			const rev = await icollection.update({_id:data._id},data)
			this.items.splice(inx,1,data)
		}
	}

}
</script>