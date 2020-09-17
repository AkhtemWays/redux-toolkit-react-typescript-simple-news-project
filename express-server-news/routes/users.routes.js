const router = require("express").Router();
const { users } = require("./user.routes");

const myOwnUsers = [
  { id: 0, firstName: "Bob", lastName: "Johnson" },
  { id: 1, firstName: "Coca", lastName: "Cola" },
  { id: 2, firstName: "Artem", lastName: "Filipenko" },
];

router.get("/", async (req, res) => {
  try {
    res.json(myOwnUsers);
  } catch (e) {
    res.status(500).send("smh went wrong");
  }
});

module.exports = router;
