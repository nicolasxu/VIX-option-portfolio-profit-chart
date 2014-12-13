
var canvas = d3.select('body').append('svg')
	.attr('width', 500)
	.attr('height', 500)
	.append('g')
		.attr('transform', 'translate(50, 50)');



var tree = d3.layout.tree()
	.size([400, 400]);



	d3.json('./myTreeData.json', function(err, json){

		var nodes = tree.nodes(json);
		console.info('nodes', nodes);
		var links = tree.links(nodes);

		console.info('links', links);


		var node = canvas.selectAll('.node')
			.data(nodes)
			.enter()
			.append('g')
				.attr('class', 'node')
				.attr('transform', function(d){
					return 'translate(' + d.y + ', ' + d.x + ')' ; 
				});

		node.append('circle')
			.attr('r', 8)
			.attr('fill','steelblue' );

		node.append('text')
			.text(function(d){
				return d.name;
			})
			.attr('transform', function(d){
				return 'translate(8,-5)';
			});

		var diagonal = d3.svg.diagonal()
			.projection(function(d){
				return [d.y, d.x];
			});

		canvas.selectAll('.link')
			.data(links)
			.enter()
			.append('path')
			.attr('class', 'link')
			.attr('fill', 'none')
			.attr('stroke', '#adadad')
			.attr('d', diagonal);

	});

