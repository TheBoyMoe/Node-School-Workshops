function foo() {
	
	var bar;
	quux = 2; // globally scoped
	
	function zip(){
		bar = true;
		return bar;
	}
	return zip;
}
