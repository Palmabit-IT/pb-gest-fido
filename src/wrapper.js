angular.module('pbGestFido', [])

  .factory('DocumentFido', ['$q', function ($q) {

    function isValid(document, customerFido) {
      var deferred = $q.defer(),
        fido = new DocumentFido(customerFido),
        response = fido.isValid(document);

      if (!response || response.valid === false) {
        deferred.reject();
      } else if (response.warning === true) {
        deferred.resolve({warning: true});
      } else {
        deferred.resolve({warning: false});
      }

      return deferred.promise;
    }

    return {
      isValid: isValid
    }
  }]);
