const healthcheck = function (req, res) {
    res.send({"service":"api", "status": "OK"});
  }
  
  module.exports = {
    healthcheck
  };