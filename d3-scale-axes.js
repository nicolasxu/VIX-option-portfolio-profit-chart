
// // dataArray


// var margin = {top: 20, right: 10, bottom: 20, left: 10};
// var padding = {top: 60, right: 60, bottom: 60, left: 60};
// var outerWidth = 960;
// var outerHeight = 500;

// var innerWidth = outerWidth - margin.left - margin.right,
//     innerHeight = outerHeight - margin.top - margin.bottom;

// var width = innerWidth - padding.left - padding.right;
// var height = innerHeight - padding.top - padding.bottom;

// var xScale = d3.scale.linear()
// 				.domain([8, d3.max(dataArray, function(data){
// 					return data.x;
// 				}) + 5])
// 				.range([0 , width]);

// var yScale = d3.scale.linear()
// 				.domain([d3.min(dataArray, function(data){ return data.y;  }) -300, 
// 				        d3.max(dataArray, function(data){ return data.y;}) + 300])
// 				.range([height ,0 ]);


// var xAxis = d3.svg.axis()
// 				.orient('bottom')
// 				.scale(xScale);

// var yAxis = d3.svg.axis()
// 				.orient('left')
// 				.scale(yScale);


// var canvas = d3.select('body').append('svg')
// 			.attr('width', outerWidth)
// 			.attr('height', outerHeight)
// 		.append('g') // svg is a 'g' tag
// 			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
// 		.append("g") // inner drawing area
//     		.attr("transform", "translate(" + padding.left + "," + padding.top + ")");

// var defs = canvas.append('defs');

//     canvas.append("g")
// 	    .attr("class", "x axis")
// 	    .attr("transform", "translate(0," + yScale(0) + ")")
// 	    .call(xAxis);

// 	canvas.append("g")
// 	    .attr("class", "y axis")
// 	    // .attr("transform", "translate(" + width + ",0)")
// 	    .call(yAxis);

// canvas.selectAll('rect')
// 	.data(dataArray)
// 	.enter()
//   .append('rect')
//     .attr('x', function(d){ return xScale(d.x);})
//     .attr('y', function(d){ return yScale(d.y);})
//     .attr('width', function(d){ return 1;})
//     .attr('height', function(d){ return 1;})
//     .attr('fill', 'red')
//     .attr('stroke', 'gray');

// // var vis = d3.select('body').append('svg:svg')
// // 	.attr('width', width + margin.left + margin.right)
// // 	.attr('height', height + margin.top + margin.bottom)
// // 	.append('g')
// // 	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
	

// // vis.append('g')
// // 	.call(xAxis);

// // vis.append('g')
// // 	.call(yAxis);

