angular.module('optionChart')
	.directive('clickEdit',['$compile', function($compile){
		return {
			restrict: 'A',
			link: function postLink(scope, iElement, iAttrs) {
				
				scope.tempValue = '';

				var templates = {
					text: '<div class="insert-box">' + '<input type="text" ng-model="----" class="form-control">' + '</div>',
					select:'<div class="insert-box">' + '<select ng-model="----" class="form-control" ng-options="name for name in ****"></select>' + '</div>'
				};

				var insertBoxHtml = '<div class="insert-box">' +
										'<h1>This is a box</h1>' +
									'</div>';

				iElement.on('click', function($event){

					function attachBox () {

						var targetTpl = templates[iAttrs.clickEdit].replace(/\*\*\*\*/g, iAttrs.selectData);
						targetTpl = targetTpl.replace(/----/g, iAttrs.modelName);
						// console.log(targetTpl);
						var linkFn = $compile(targetTpl);
						var elem = linkFn(scope);
						iElement.append(elem[0]);
					}

					function attachBodyHandler () {
							
						// console.log('attaching body handler');

						$('body').on('click.clickEdit', function ($bodyEvent) {

							if(iElement[0].contains($bodyEvent.target)) {

								// click happens within the iElement
								// do nothing
							} else { 

								// click happens outside iElement
								// remove all insert-box
								$('.insert-box').remove();
								removeBodyHandler();

							}

						});
					}

					function removeBodyHandler () {
						// console.log('removing body handler');

						$('body').off('click.clickEdit');
					}

					if($('.insert-box').length === 0) {

						attachBox();
						attachBodyHandler();
						$event.stopPropagation();
						// attach body event listener 
						   // in the body event listern, release it self when done. 
					}

				});
			}
		};
	}]);
