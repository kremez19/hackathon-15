'use strict';

/**
 * @ngdoc function
 * @name placesApp.controller:DiscountsCtrl
 * @description
 * # DiscountsCtrl
 * Controller of the placesApp
 */
angular.module('placesApp')
  .controller('DiscountsCtrl', function ($scope, Discount, $stateParams, filterFilter) {
    $scope.discountId = $stateParams.discountId;
    
    $scope.discounts = Discount.query();
    
    $scope.hoverItem = function(e){
       // here will be code that highlight item on map
    };

    $scope.markers = [];
    $scope.discounts = Discount.query(function(data) {
      _.map(data, makeMarker);
    });

    function makeMarker(discount) {
      for (var i = 0, length = discount.addresses.length; i < length; i++) {
        $scope.markers.push({
          id: discount.addresses[i].id,
          latitude: discount.addresses[i].latitude,
          longitude: discount.addresses[i].longitude
        });
      }
    }

    $scope.$watch('searchText', function(){
      $scope.filteredDiscounts = filterFilter($scope.discounts, $scope.searchText);
      $scope.markers = [];
      _.map($scope.filteredDiscounts, makeMarker);
    });


    //$scope.filteredDiscounts = filterFilter($scope.discounts, $scope.searchText);

    $scope.hover = function(e) {
      //debugger;
    };

});
