
export function INSERT (state,data) {
	state.todayTodo.push(data)
}


export function DELETE (state,data) {
	const loc = state.todayTodo.indexOf(data) //get the location from array
	console.log(state.todayTodo.splice(loc,1)) //remove from array
}



