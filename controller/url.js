const shortid = require("shortid");
const URL = require("../models/url");

async function generateUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ err: "url is required" });
  const shortId = shortid();
  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitedHistory: [],
    createdBy: req.user._id,
  });
  return res.render("home", { id: shortId });
}

module.exports = {
  generateUrl,
};
