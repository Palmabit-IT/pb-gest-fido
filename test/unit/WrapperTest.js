describe("WrapperTest", function () {
  var DocumentFido, $rootScope, $q;

  beforeEach(function () {
    module('pbGestFido');
  });

  beforeEach(inject(function ($injector) {
    DocumentFido = $injector.get('DocumentFido');
  }));

  beforeEach(inject(function(_$rootScope_, _$q_) {
    $rootScope = _$rootScope_;
    $q = _$q_;
    var deferred = $q.defer();
    spyOn(DocumentFido, 'isValid').and.returnValue(deferred.promise);
  }));
});
