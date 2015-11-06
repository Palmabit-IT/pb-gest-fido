describe("DocumentFidoTest", function () {
  var obj, fidoStub;

  var responseInvalid = {
    valid: false,
    warning: false
  };

  var responseValid = {
    valid: true,
    warning: false
  };

  var responseWarning = {
    valid: false,
    warning: true
  };

  beforeEach(function () {
    fidoStub = {};
    obj = new PbFido(fidoStub);
  });

  it("create object", function () {
    expect(obj.constructor.name).toBe('PbFido');
  });

  it("has isValid function", function () {
    expect(typeof obj.isValid).toBe('function');
  });

  it("has invalid response", function () {
    expect(typeof obj.responseInvalid).toBe('function');
    expect(obj.responseInvalid()).toEqual(responseInvalid);
  });

  it("has valid response", function () {
    expect(typeof obj.responseValid).toBe('function');
    expect(obj.responseValid()).toEqual(responseValid);
  });

  it("has warning response", function () {
    expect(typeof obj.responseWarning).toBe('function');
    expect(obj.responseWarning()).toEqual(responseWarning);
  });

  it("has valid response if customerFido is undefined", function () {
    var temp = new PbFido();
    expect(temp.isValid()).toEqual(responseValid);
  });

  it("has valid response if amout is 0", function () {
    obj.setFido({amount: 0});
    expect(obj.isValid()).toEqual(responseValid);
  });

  it("has valid response if document is undefined", function () {
    obj.setFido({amount: 10});
    expect(obj.isValid()).toEqual(responseValid);
  });

  describe("DocumentFidoTest, warning reponse", function () {
    var document;

    beforeEach(function () {
      document = {
        total_price: {
          total: 10
        }
      };
    });

    it("has invalid response if fido's not payed is bigger then amount", function () {
      obj.setFido({amount: 10, not_payed: 11});
      expect(obj.isValid(document)).toEqual(responseInvalid);
    });

    it("has invalid response if fido's not payed is equal to amount", function () {
      obj.setFido({amount: 10, not_payed: 10});
      expect(obj.isValid(document)).toEqual(responseInvalid);
    });

    it("has warning response if document's total is bigger then amount", function () {
      document.total_price.total = 12;
      obj.setFido({amount: 10, not_payed: 10});
      expect(obj.isValid(document)).not.toEqual(responseWarning);
      obj.setFido({amount: 11, not_payed: 10});
      expect(obj.isValid(document)).toEqual(responseWarning);
    });

    it("has warning response if open documents is more then max_opens", function () {
      obj.setFido({amount: 10, opens: 9, max_opens: 10});
      expect(obj.isValid(document)).not.toEqual(responseWarning);
      obj.setFido({amount: 10, opens: 10, max_opens: 10});
      expect(obj.isValid(document)).toEqual(responseWarning);
      obj.setFido({amount: 10, opens: 11, max_opens: 10});
      expect(obj.isValid(document)).toEqual(responseWarning);
    });

    it("has warning response if days from last payment is more then max_days", function () {
      obj.setFido({amount: 10, days: 9, max_days: 10});
      expect(obj.isValid(document)).not.toEqual(responseWarning);
      obj.setFido({amount: 10, days: 10, max_days: 10});
      expect(obj.isValid(document)).toEqual(responseWarning);
      obj.setFido({amount: 10, days: 11, max_days: 10});
      expect(obj.isValid(document)).toEqual(responseWarning);
    });

    it("has valid response if fido is ok", function () {
      obj.setFido({amount: 10, not_payed: 9, opens: 9, max_opens: 10, days: 9, max_days: 10});
      expect(obj.isValid(document)).toEqual(responseValid);
    });
  });
});
