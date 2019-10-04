<template>
	<div class="flex flex-center q-pa-md">
		<div class="row q-pa-md">
			<q-input class="col-md-3 col-xs-4 q-pa-xs"  v-model="item.barcode" label="Barcode"/>
			<q-input class="col-md-4 col-xs-8 q-pa-xs"  v-model="item.itemname" label="Itemname"/>
			<q-input class="col-md-2 col-xs-6 q-pa-xs"   v-model.number="item.qty" mask="#" fill-mask="0"
        reverse-fill-mask input-class="text-center" label="Qty"/>
			<q-input class="col-md-2 col-xs-6 q-pa-xs"  v-model="item.uom" label="UOM"/>
			<q-btn dense @click="addTodo">Send<q-icon name="send"/></q-btn>
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
	name: 'Todo',
 	data(){
	 	return{
	 		webdb:{
	 			db:null,
	 			onError:null,
	 			onSuccess:null
	 		},
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

			   this.webdb.db = openDatabase('aims.db','1.0','aims database',2*1024*1024);
			  
			   this.webdb.db.transaction((tx)=>{
			  	tx.executeSql("CREATE TABLE IF NOT EXISTS pcstat(line INTEGER PRIMARY KEY,barcode,itemname,qty,uom)",[],this.webdb.onSuccess,this.webdb.onError)
			  });

			  this.webdb.onError = (tx,err)=>{
			  	this.$q.notify("There has been an error: "+ err.message)
			  	console.log(err)
			  };

			  this.webdb.onSuccess = (tx,err)=>{
			  	console.log('Success!')
			  }
			  this.loadTodo()
	},

	methods:{
		loadTodo(){
			let temp = []
			this.webdb.db.transaction(function(txn) {
				txn.executeSql('select * from pcstat', [], function(tx, res) {
					for(let i = 0; i < res.rows.length; i++) {
						let row = res.rows.item(i)
						temp.push({
							barcode: row['barcode'],
							itemname: row['itemname'],
							qty: row['qty'],
							uom: row['uom'],
							line: row['line']
						})
					}
				})
			})
			this.item=[]
			this.items=temp
		},
		addTodo(){
			// var id = 0
			// db.transaction(function(txn) {
			// 	txn.executeSql('insert into pcstat(barcode, itemname, qty, uom) values(?,?,?,?)', [this.item.barcode, this.item.itemname, this.item.qty, this.item.uom], function(tx, res) {
			// 		id = res.insertId
			// 	})
			// })
			// this.items.push({
			// 	barcode: this.item.barcode,
			// 	itemname: this.item.itemname,
			// 	qty: this.item.qty,
			// 	uom: this.item.uom,
			// 	line: id
			// })
			 this.webdb.db.transaction((tx)=>{
			 	var id =0 ; //place where the id will add
			 	tx.executeSql("insert into pcstat(barcode,itemname,qty,uom) values(?,?,?,?)",[this.item.barcode,this.item.itemname,this.item.qty,this.item.uom],function(tx,res){
			 			id = res.insertId //it was placed here
			 	},this.webdb.onError);

			 	this.items.push({
			 		barcode:this.item.barcode,
				 	itemname:this.item.itemname,
				 	qty:this.item.qty,
				 	uom:this.item.uom,
				 	line:id
			 	})//push the new added data from array
			 	console.log(this.items)
			 })
		},
		removeTodo(data){
			this.webdb.db.transaction((tx)=>{
			 	tx.executeSql("delete from pcstat where line=?",[data.line],this.webdb.onSuccess,this.webdb.onError);
			 	
			 	const loc = this.items.indexOf(data) //get the location from array
			 	console.log(this.items.splice(loc,1)) //remove from array
			 })
		}
	}

}
</script>