angular.module('optionChart', [])
	.controller('inputCtrl', ['$scope',function($scope){

		$scope.assetClass = 'option';

		$scope.premium = 1.25;

		$scope.strikePrice = 13.5;

		$scope.comission = 1.9;

		$scope.dealPrice = 14.9;

		$scope.assetClassSelects = ['option', 'future'];

		$scope.longShortSelects = ['long', 'short'];

		$scope.longShort = 'long';

		$scope.callPutSelects = ['call', 'put'];

		$scope.callPut = 'call';

		$scope.expireSelects = 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,sep,Oct,Nov,Dec'.split(',');

		$scope.expire = 'Dec';

		$scope.multiplier = 100;

		$scope.contractNumber = 10;

		$scope.$watch('assetClass', function(newVal, oldVal){

			if(newVal === 'future') {

				$scope.contractNumber = 1;

				$scope.multiplier = 1000;
			}

			if(newVal === 'option') {

				$scope.contractNumber = 10;

				$scope.multiplier = 100;

			}
		});

		$scope.data = {};
		$scope.data.portfolio = new Portfolio();

		$scope.addPortfolio = function () {

			var asset = {};
			if($scope.assetClass === 'option') {

				var tempOp = {};
				// build option
				tempOp.assetClass = $scope.assetClass;
				tempOp.longShort = $scope.longShort;
				tempOp.callPut = $scope.callPut;
				tempOp.strikePrice = $scope.strikePrice;
				tempOp.premium = $scope.premium;
				tempOp.expire = $scope.expire;
				tempOp.comission = $scope.comission;
				tempOp.multiplier = $scope.multiplier;

				asset = new Option(tempOp);
				
			}

			if($scope.assetClass === 'future') {

				// build future
				var tempFr = {};
				tempFr.assetClass = $scope.assetClass;
				tempFr.longShort = $scope.longShort;
				tempFr.dealPrice = $scope.dealPrice;
				tempFr.comission = $scope.comission;
				tempFr.multiplier = $scope.multiplier;
				tempFr.expire = $scope.expire;

				asset = new Future(tempFr);

			}

			$scope.data.portfolio.add({instrument: asset, number: $scope.contractNumber });

		};

		$scope.removePosition = function (index) {

			$scope.data.portfolio.remove(index);
		};

		function generateData () {

			var start = 10;
			var result = [];
			var end = $scope.data.portfolio.maxShiftPrice();
			end = end + (end - start) * 2;

			// Smallest price change
			var point = 0.01;

			for( var i = start; i <= end; i = i + point ) {
				result.push({x: i, y: $scope.data.portfolio.profit(i)});
			}

			return result;
		}

		function plot (dataArray) {


			var outerWidth = 960;
			var outerHeight = 500;

			// outerWidth - margin = innerWidth
			// innerWidth - padding = width
			// width the actual drawing width 
			var margin = {top: 20, right: 10, bottom: 20, left: 10};
			var padding = {top: 60, right: 60, bottom: 60, left: 60};


			var innerWidth = outerWidth - margin.left - margin.right,
			    innerHeight = outerHeight - margin.top - margin.bottom;

			var width = innerWidth - padding.left - padding.right;
			var height = innerHeight - padding.top - padding.bottom;

			var xScale = d3.scale.linear()
							.domain([8, d3.max(dataArray, function(data){
								return data.x;
							}) + 5])
							.range([0 , width]);

			var yScale = d3.scale.linear()
							.domain([d3.min(dataArray, function(data){ return data.y;  }) -300, 
							        d3.max(dataArray, function(data){ return data.y;}) + 300])
							.range([height ,0 ]);


			var xAxis = d3.svg.axis()
							.orient('bottom')
							.scale(xScale);

			var yAxis = d3.svg.axis()
							.orient('left')
							.scale(yScale);


			var canvas = d3.select('body').append('svg')
						.attr('width', outerWidth)
						.attr('height', outerHeight)
					.append('g') // canvas is a 'g' tag
						.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
					.append("g") // canvas drawing area
			    		.attr("transform", "translate(" + padding.left + "," + padding.top + ")");

			    canvas.append("g")
				    .attr("class", "x axis")
				    .attr("transform", "translate(0," + yScale(0) + ")")
				    .call(xAxis);

				canvas.append("g")
				    .attr("class", "y axis")
				    // .attr("transform", "translate(" + width + ",0)")
				    .call(yAxis);

			canvas.selectAll('rect')
				.data(dataArray)
				.enter()
			  .append('rect')
			    .attr('x', function(d){ return xScale(d.x);})
			    .attr('y', function(d){ return yScale(d.y);})
			    .attr('width', function(d){ return 1;})
			    .attr('height', function(d){ return 1;})
			    .attr('fill', 'red')
			    .attr('stroke', 'gray')
			
			canvas.selectAll('text')
			.data(function(){ 
				var tempArr = [];
				var tempData = dataArray[0];
				for(var i = 0; i< dataArray.length; i++) {
					console.log(dataArray[i].y.toFixed(2));
					if(Math.abs(dataArray[i].y) <= Math.abs(tempData.y) ) {
						tempData = dataArray[i];
					}
				}
				tempArr.push(tempData);

				console.info('tempData is: ', tempData);

				return tempArr;

				
			})
			.enter()
		  .append('text')
			  	.text(function(d){ return d.x; })
			  	// .attr('dx')
			  	// .attr('dy')
			  	.style('font-size', '20px');


		}

		$scope.plot = function () {

			var svgElem = document.getElementsByTagName('svg')[0];
			var bodyElem = document.getElementsByTagName('body')[0];
			if(svgElem) {
				bodyElem.removeChild(svgElem);

			}

			var dataArray = generateData();

			plot(dataArray);
		};



	}]);