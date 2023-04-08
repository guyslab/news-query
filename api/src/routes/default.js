module.exports = {
    errorHandler: (err, req, res, next) => {
        if (err) {
          console.error(err.message)
          if (!err.statusCode) {
            err.statusCode = 500
          } // Set 500 server code error if statuscode not set
          return res.status(err.statusCode).send({
            statusCode: err.statusCode,
            message: err.message
          })
        }
      
        next()
      },
    notFound: function (req, res) {
        res.status(404).json({
          status: 'Path does not exist'
        });
      }
};