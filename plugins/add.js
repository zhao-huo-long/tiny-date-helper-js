'use strict';

var factory = require('tiny-date-helper-js');

factory.DateHelperCls;
var add = {
  name: 'add',
  implement: {
    add: function add(value) {
      var date = this.toDate();
      date.setDate(date.getDate() + value);
      return factory(date);
    }
  }
};

module.exports = add;
