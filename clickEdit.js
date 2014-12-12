angular.module('optionChart')
	.directive('clickEdit',[function(){
		return {
			restrict: 'A',
			link: function postLink(scope, iElement, iAttrs) {
				
				console.info('clickEdit is running');

				scope.tempValue = '';
				var templates = {
					text: '<input type="text" ng-model="tempValue">',
					select:'<select ng-model="tempValue" ng-options="name for name in iAttrs.selectData"></select>'
				};

				var insertBoxHtml = '<div class="insert-box">' +
										'<h1>This is a box</h1>' +
									'</div>';

				iElement.on('click', function($event){
					$event.stopPropagation();
					console.info('clicked');

					if($('.insert-box').length === 0) {
						iElement.append(insertBoxHtml);
					} else 
					{
						$('.insert-box').remove();
					}
					
					$('body').click(function(){
						$('.insert-box').remove();
					});

				});

			}
		};
	}]);
