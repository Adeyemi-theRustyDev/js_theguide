/** 
 * This node program reads from std input, computes the frequency of each letter
 * in that text, and displays a histogram of the most frequently used
 * characters.
 *
 * In a unix-type environament you can invoke the program like this:
 *   node char_freq.js < c_citratus.txt
 **/ 

class DefaultMap extends Map{
	constructor(defaultValue) {
		defaultValue;
		super();
		this.defaultValue  = defaultValue;
	}


	get(key) {
		if(this.has(key)) {
			return super.get(key);
		}
		else {
			return this.defaultValue;
		}
	}
}


class Histogram {
	letterCounts;
	totalLetters;
	constructor() {
		this.letterCounts = new DefaultMap(0);
		this.totalLetters = 0;
	}

	add(text) {
		text = text.replace(/\s/g, "").toUpperCase();

		for(let character of text) {
			let count = this.letterCounts.get(character);
			this.letterCounts.set(character, count+1);
			this.totalLetters++;
		}
	}

	toString() {
		let enteries = [...this.letterCounts];

		enteries.sort((a, b) => {
			if(a[1] == b[1]) { return a[0]  < b[0] ? -1 : 1; }
			else { return b[1] - a[1]; }
		});

		for(let entry of enteries) {
			entry[1] = (entry[1] / this.totalLetters) * 100
		}
		enteries = enteries.filter(entry => entry[1] >= 1);

		let lines = enteries.map( ([l, n]) => `${l}: ${"#".repeat(Math.round(n))} ${n.toFixed(2)}%`);

		return lines.join("\n");

	}

}

async function histogramFromStdin() {
 	process.stdin.setEncoding("utf-8"); // Read Unicode strings, not bytes
	let histogram = new Histogram();
 	for await (let chunk of process.stdin) {
 		histogram.add(chunk);
 	}
 	return histogram;
}
	
histogramFromStdin().then(histogram => { console.log(histogram.toString()); });




