define('app/persistedData', [], function() {
  var data = {
    hp: 3
  }
  return {
    set(_data) {
        data = _data;
    },
    get() {
        return data;
    }
  }
})