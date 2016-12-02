define('app/persistedData', [], function() {
  var data = {
    hp: 3,
    checkpoint: "0",
    key_red: false,
    key_blue: false,
    key_green: false
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