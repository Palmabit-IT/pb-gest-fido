'use strict';

class PbFido {
  constructor (customerFido) {
    this.fido = customerFido;
  }

  getFido() {
    return this.fido;
  }

  setFido(customerFido) {
    this.fido = customerFido;
    return this;
  }

  responseInvalid() {
    return {
      valid: false,
      warning: false
    }
  }

  responseValid() {
    return {
      valid: true,
      warning: false
    }
  }

  responseWarning() {
    return {
      valid: false,
      warning: true
    }
  }

  isValid(document) {
    if (!this.fido || this.fido.amount === 0) {
      return this.responseValid();
    } else if (this.fido.not_payed >= this.fido.amount) {
      return this.responseInvalid();
    } else if (document.total_price.total + this.fido.not_payed > this.fido.amount) {
      return this.responseWarning();
    } else if (this.fido.open >= this.fido.max_open) {
      return this.responseWarning();
    } else if (this.fido.days >= this.fido.max_days) {
      return this.responseWarning();
    } else if (!document || !document.total_price || !document.total_price.total) {
      return this.responseValid();
    }

    return this.responseValid();
  }
}
