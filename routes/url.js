const express = require("express");
const { generateUrl } = require("../controller/url");

const router = express.Router();

router.post("/", generateUrl);

module.exports = router;
