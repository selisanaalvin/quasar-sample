<template>
	<div class="flex flex-center q-pa-md">
		<div class="row q-pa-md">
			<q-input class="col-md-3 col-xs-4 q-pa-xs"  v-model="item.barcode" label="Barcode"/>
			<q-input class="col-md-4 col-xs-8 q-pa-xs"  v-model="item.itemname" label="Itemname"/>
			<q-input class="col-md-2 col-xs-6 q-pa-xs"   v-model.number="item.qty" mask="#" fill-mask="0"
        reverse-fill-mask input-class="text-center" label="Qty"/>
			<q-input class="col-md-2 col-xs-6 q-pa-xs"  v-model="item.uom" label="UOM"/>
			<q-btn dense @click="addTodo()">Send<q-icon name="send"/></q-btn>
		</div>
	
	
	<div class=" row q-pa-md">
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">Barcode</th>
          <th class="text-right">Description</th>
          <th class="text-right">Qty</th>
          <th class="text-right">UOM</th>
          <th class="text-right">Option</th>	
        </tr>
      </thead>
      <tbody>
        <tr v-for="(t,i) in items" :key="i">
          <td class="text-left">{{t.barcode}}</td>
          <td class="text-right">{{t.itemname}}</td>
          <td class="text-right">{{t.qty}}</td>
          <td class="text-right">{{t.uom}}</td>
          <td class="text-right" @click="removeTodo(t)"><q-btn round><q-icon name="delete" /></q-btn></td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>

</div>
</template>
<script>
export default {
  name: 'VuexTodo',
  data(){
  	return {
  		items:[],
	 	item:{
	 			barcode:'',
	 			itemname:'',
	 			qty:'',
	 			uom:'',
	 			line:0
	 		},
  	}
  },
  mounted(){
  	this.items = this.$store.getters['todo/someGetter']
  },
  methods:{
  	addTodo(){
  		const temp = this.item
  		this.$store.dispatch('todo/insertTodo',temp)
  	},
  	removeTodo(data){
		this.$store.dispatch('todo/deleteTodo',data)
  	},
  }
}
</script>
