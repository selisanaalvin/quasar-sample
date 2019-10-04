
export function insertTodo (context,data) {
	console.log("insert action here: ")
	console.log(data)
	context.commit('INSERT',data)
}



export function deleteTodo (context,data) {
	console.log("delete action here: ")
	console.log(data)
	context.commit('DELETE',data)
}