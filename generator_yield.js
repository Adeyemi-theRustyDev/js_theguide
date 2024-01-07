let my_nums = [12, 34, 76, 29, 50];

function* spitNums(array_of_nums) {
	for(let num of array_of_nums) {
		yield num;
	}
}


