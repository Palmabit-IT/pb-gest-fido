/*! pb-gest-fido 0.1.1 - Copyright 2015 Palmabit <hello@palmabit.com> (http://www.palmabit.com) */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var PbFido = (function () {
  function PbFido(customerFido) {
    _classCallCheck(this, PbFido);

    this.fido = customerFido;
  }

  _createClass(PbFido, [{
    key: 'getFido',
    value: function getFido() {
      return this.fido;
    }
  }, {
    key: 'setFido',
    value: function setFido(customerFido) {
      this.fido = customerFido;
      return this;
    }
  }, {
    key: 'responseInvalid',
    value: function responseInvalid() {
      return {
        valid: false,
        warning: false
      };
    }
  }, {
    key: 'responseValid',
    value: function responseValid() {
      return {
        valid: true,
        warning: false
      };
    }
  }, {
    key: 'responseWarning',
    value: function responseWarning() {
      return {
        valid: false,
        warning: true
      };
    }
  }, {
    key: 'isValid',
    value: function isValid(document) {
      if (!this.fido || this.fido.amount === 0) {
        return this.responseValid();
      } else if (!document || !document.total_price || !document.total_price.total) {
        return this.responseValid();
      } else if (this.fido.not_payed >= this.fido.amount) {
        return this.responseInvalid();
      } else if (document.total_price.total > this.fido.amount) {
        return this.responseWarning();
      } else if (this.fido.opens >= this.fido.max_opens) {
        return this.responseWarning();
      } else if (this.fido.days >= this.fido.max_days) {
        return this.responseWarning();
      }

      return this.responseValid();
    }
  }]);

  return PbFido;
})();

angular.module('pbGestFido', []).factory('DocumentFido', ['$q', function ($q) {

  function isValid(document, customerFido) {
    var deferred = $q.defer(),
        fido = new PbFido(customerFido),
        response = fido.isValid(document);

    if (!response || response.valid === false) {
      deferred.reject();
    } else if (response.warning === true) {
      deferred.resolve({ warning: true });
    } else {
      deferred.resolve({ warning: false });
    }

    return deferred.promise;
  }

  return {
    isValid: isValid
  };
}]);
//# sourceMappingURL=pb-gest-fido.js.map
