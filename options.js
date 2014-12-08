

// position:

function Option(options) {
	this.assetClass = options.assetClass; // 'option', 'stock'
	this.longShort = options.longShort; // 'short'
	this.callPut = options.callPut; // 'call'
	this.strikePrice = options.strikePrice;  // 13.5
	this.premium = options.premium; // 1.5, purchase or sell price
	this.expire = options.expire; // 'dec'
	this.comission = options.comission;
	this.multiplier = options.multiplier;

}

var longCall = {
		assetClass: 'option',
		longShort: 'long',
		callPut : 'call',
		strikePrice : 13.5,
		premium : 1.5,
		expire: 'dec',
		comission: 1.4,
		multiplier: 100

};

var longPut = {
		assetClass: 'option',
		longShort: 'long',
		callPut : 'put',
		strikePrice : 13.5,
		premium : 1.5,
		expire: 'dec',
		comission: 1.4,
		multiplier: 100

};

var shortCall = {
		assetClass: 'option',
		longShort: 'short',
		callPut : 'call',
		strikePrice : 13.5,
		premium : 1.5,
		expire: 'dec',
		comission: 1.4,
		multiplier: 100

};

var shortPut = {
		assetClass: 'option',
		longShort: 'short',
		callPut : 'put',
		strikePrice : 14.75,
		premium : 1.5,
		expire: 'dec',
		comission: 1.4,
		multiplier: 100

};

Option.prototype.breakEvenPrice = function () {

};

Option.prototype.profit = function(price) {

	var pl = -this.comission;

	if(this.callPut === 'call' && this.longShort === 'long') {

		if(price>= this.strikePrice) {

			pl = pl - this.premium*this.multiplier + (price - this.strikePrice)*this.multiplier;

		} else {

			pl = pl - this.premium*this.multiplier;
		}
	}

	if(this.callPut === 'put' && this.longShort === 'long') {

		if(price <=this.strikePrice) {

			pl = pl - this.premium*this.multiplier + (this.strikePrice - price)*this.multiplier;

		} else {

			pl = (pl - this.premium*this.multiplier);
		}
	}

	if(this.callPut === 'put' && this.longShort === 'short') {

		pl = pl + this.premium*this.multiplier;

		if(price <= this.strikePrice ) {

			pl = pl - (this.strikePrice - price)*this.multiplier;

		} else {

			// do nothing
		}

	}

	if(this.callPut === 'call' && this.longShort === 'short') {

		pl = pl + this.premium*this.multiplier;

		if(price >= this.strikePrice) {

			pl = pl - (price - this.strikePrice)*this.multiplier;

		} else {

			// do nothing
		}
	}

	return pl;
};


function Future(options) {
	this.assetClass = options.assetClass;
	this.longShort = options.longShort;
	this.dealPrice = options.dealPrice;
	this.comission = options.comission;
	this.multiplier = options.multiplier;
	this.expire = options.expire;
}

Future.prototype.profit = function (price) {

	var pl = -this.comission;

	if(this.longShort === 'long') {

		
		pl = pl + (price - this.dealPrice)*this.multiplier;
		

	} else {
		// short
		pl = pl + (this.dealPrice - price)*this.multiplier;
	}

	return pl;

};

var longFuture = {
	assetClass: 'future',
	longShort: 'long',
	dealPrice: 14.75,
	comission: 1.9,
	multiplier: 1000,
	expire: 'dec'
};

var shortFuture = {
	assetClass: 'future',
	longShort: 'short',
	dealPrice: 14.75,
	comission: 1.9,
	multiplier: 1000,
	expire: 'dec'
};



var o1 = new Option(shortPut);

// console.log(o1.profit(14));

var f1 = new Future(shortFuture);
console.log(f1.profit(15));


function Portfolio (option) {

	// position is an array
	if(option) {

		this.positions = option.positions;
	} else {
		this.positions = [];
	}

}

Portfolio.prototype.profit = function (price) {
	
	var profit = 0;
	
	for(var i = 0; i< this.positions.length; i++) {

		profit = profit + this.positions[i].instrument.profit(price) * this.positions[i].number;
	}

	return profit;
};

Portfolio.prototype.add = function (position) {
	this.positions.push(position);
};

Portfolio.prototype.remove = function (index) {

	this.positions.splice(index, 1);
	
};

Portfolio.prototype.maxShiftPrice = function () {
	var maxPrice = 0;
	var thisShiftPrice = 0;
	for(var i = 0; i < this.positions.length; i++) {
		thisShiftPrice = this.positions[i].instrument.strikePrice || this.positions[i].instrument.dealPrice;
		maxPrice = Math.max(maxPrice, thisShiftPrice);
	}

	return maxPrice;
};

var p1 = new Portfolio({positions: [{instrument: o1, number: 10}, {instrument: f1, number: 1}]});

// console.info('p1.profit(33): ', p1.profit(10));


/**
 * Calculate data array in the form of [{x:33, y:44},{x:33, y:44}, ... ]
 * for d3. 
 * @param  {Object} p 		Portfolio object
 * @return {Array}   		Result array
 */
function calcData(p) {
	// p is portifolio 
	
	var start = 10;
	var result = [];
	var end = p.maxShiftPrice();
	end = end + (end - start) * 2;

	// Smallest price change
	var point = 0.01;

	for( var i = start; i <= end; i = i + point ) {
		result.push({x: i, y: p.profit(i)});
	}

	return result;
}

var dataArray = calcData(p1);

	console.log(dataArray);
