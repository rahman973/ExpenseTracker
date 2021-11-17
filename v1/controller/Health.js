exports.checkHealth = async (req, res) => {
  return res.status(200).send({ message: "Application is running" });
};
