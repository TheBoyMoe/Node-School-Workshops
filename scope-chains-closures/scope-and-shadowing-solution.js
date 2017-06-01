function foo() {
	
	var bar;
	quux = 2; // globally scoped
	
	function zip(){
		var quux = 4; // different quux
	}
}