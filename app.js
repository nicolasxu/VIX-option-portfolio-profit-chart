angular.module('optionChart', [])
	.controller('inputCtrl', ['$scope',function($scope){

		$scope.assetClass = 'option';

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

				console.log('asset', asset);

				
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
			console.info('$scope.data.portfolio', $scope.data.portfolio);

		};




	}]);