'use strict';

describe('Controller: DiscountCtrl', function () {

  // load the controller's module
  beforeEach(module('placesApp'));

  var DiscountCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DiscountCtrl = $controller('DiscountCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
