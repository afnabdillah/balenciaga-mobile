function errorHandler(err, req, res, next) {
  if (err.name === "NotFound" || err.name === "BSONError") {
    res.status(404).json({
      message: "User not found",
    });
  } else {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error, Please Try Again Later",
    });
  }
}

module.exports = errorHandler;
