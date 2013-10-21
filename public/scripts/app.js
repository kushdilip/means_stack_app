'use strict';

var myApp = angular.module('myApp', []);

myApp.config(['$routeProvider',function ($routeProvider){
	$routeProvider
		.when('/surveys', {
			templateUrl: 'views/SurveyList.html',
			controller: 'SurveyListcontroller'
		})
		.when('/survey/:id',{
			templateUrl: 'views/Survey.html',
			controller: 'SurveyController'
		})
		.when('/quiz',{
			templateUrl: 'views/quiz.html',
			controller: 'quizController'
		})
		.otherwise({
			redirectTo: '/surveys'
		});
}]);

myApp.factory('socket', function($rootScope) {
	var socket = io.connect();
	return {
		on: function(eventName, callback) {
			socket.on(eventName, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					callback.apply(socket, args);
				});
			});
		},
		emit: function(eventName, data, callback) {
			socket.emit(eventName, data, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					if(callback) {
						callback.apply(socket, args);
					}
				});
			});
		}
	};
});

// myApp.controller('quizController', ['$scope', function ($scope) {
	   
// }]);

myApp.controller('quizController', ['$scope', 'socket', function ($scope, socket) {
	   
	    var $scope.quizes = [];
	    socket.on('quiz', function(data){
		  	$scope.quizes.push(data);
		});

}]);


myApp.controller('SurveyListcontroller', ['$scope', function ($scope) {
	    $scope.surveys = surveys;

	    $scope.delete = function(index){
	      $scope.surveys.splice(index,1);
	    }
}]);

myApp.controller('SurveyController',['$scope','$routeParams','$location', function($scope, $routeParams, $location){
	var surveyId = +$routeParams.id ;
	
	$scope.categories = [
		{id:1, name:"eMail Based"},
		{id:2, name:"Online"},
		{id:3, name:"SMS Based"}
	];

	var survey = _.find(surveys, { 'id': surveyId });
	$scope.survey = angular.copy(survey);

	$scope.save = function(){
		$scope.survey = angular.copy($scope.survey, survey);
		$location.path('/surveys');
	}

	$scope.cancel = function(){
		$location.path('/surveys');
	}
}])
