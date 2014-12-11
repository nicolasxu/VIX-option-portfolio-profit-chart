angular.module('optionChart')
	.directive('clickEdit',[function(){
		return {
			restrict: 'A',
			link: function postLink(scope, iElement, iAttrs) {
				console.info('clickEdit is running');

				iElement.on('click', function($event){
					console.info('clicked');

				});
				console.log(iElement);
			}
		};
	}]);
