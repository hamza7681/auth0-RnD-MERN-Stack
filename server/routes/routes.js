const jwtCheck = require("../middleware/auth.middleware");
const router = require("express").Router();
const axios = require("axios");

router.get("/", (req, res) => {
  return res.status(200).json({ msg: "Message from Public Route" });
});

router.get("/protected", jwtCheck, async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const response = await axios.get(
      "https://dev-pn2f5fdj1qc5k1jf.us.auth0.com/userinfo",
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json(error.response);
  }
});

module.exports = router;
