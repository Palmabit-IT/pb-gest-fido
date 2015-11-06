# Pb Gest Fido

##Installation

```
bower install pb-gest-fido --save
```

##Usage

Include module ```pbGestFido``` and ```DocumentFido``` service. Validate *document* by using **isValid** function

```javascript
angular.module('myApp', ['pbGestFido'])

  .controller('myController', ['DocumentFido', function (DocumentFido) {
    var document = {
      total_price: {
        total: 0
      }
    };

    var fido = {
      amount: 0,
      not_payed: 0,
      opens: 0,
      max_opens: 0,
      days: 0,
      max_days: 0
    };

    DocumentFido.isValid(document, fido)
      .then(function (response) {
        // Fido valid (fido.not_payed < fido.amount)
        // respose = {warning: false} (document can be created)
        // respose = {warning: true} (document can be created but it must be cashed immediately)
      }, function (err) {
        // Fido not valid (fido.not_payed >= fido.amount)
      });
  }]);
```

## Develop

Run `grunt` command before pushing

## Test

Go to `test` directory

```
karma start
```

## Author

Palmabit.com
