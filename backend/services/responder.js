/**
 * Exports
 */
exports.collection = collection;
exports.error = error;

/*
 *
 */
function collection(res, data) {
  res
    .status(200)
    .json(data);
}

/*
 *
 */
function error(res, err) {
  res
    .status(400)
    .send({
      error: {
        raw: err
      }
    });
}
