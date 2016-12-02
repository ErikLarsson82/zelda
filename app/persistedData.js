define('app/persistedData', [], function() {
  var data = {
    hp: 3,
    checkpoint: "0"
  }
  return {
    set(key, value) {
        data[key] = value;
    },
    get() {
        return data;
    }
  }
})