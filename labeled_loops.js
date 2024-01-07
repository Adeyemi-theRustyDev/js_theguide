let options = [12, 34, null, 40, 680, 40, null, 'syl', 9, 'm', 094];

outer: for(let i = 0; i < options.length; i++) {
	inner: for(let option of options) {
		if(option === null) continue inner;
		console.log(option);
	}
	console.log('\n Outer loop ran');
}


