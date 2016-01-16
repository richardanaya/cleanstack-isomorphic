var Immutable = require('immutable');

var state = null;

export default {
  set: function(st){
    state = st;
  },
  get: function(){
    return state;
  },
  toString: function(){
    return JSON.stringify(state.cursor().deref().toJSON());
  }
};
