module.exports = (err, req, res, _next) => {
  console.error(err);
  res.status(err.status).json({ message: err.message });
};
