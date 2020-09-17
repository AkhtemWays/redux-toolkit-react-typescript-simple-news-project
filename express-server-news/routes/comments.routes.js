const { Router } = require("express");
const router = Router();

const fetch = require("node-fetch");

let parentId = 0;
let id = 100;
let comments = [];

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function generateComments(parentId, storyId) {
  let count = randomInteger(0, 3);

  for (let i = 0; i < count; i++) {
    comments.push({
      id: ++id,
      parentId,
      storyId,
      datetime: new Date(),
      authorId: randomInteger(0, 2),
    });
  }
}

function generateLevelFirst() {
  generateComments(parentId, parentId);

  parentId += 1;
  if (parentId <= 19) {
    generateLevelFirst();
  }
}

function generateChilds() {
  comments.forEach((comment) => {
    let parentId = comment.id;
    generateComments(parentId, comment.parentId);
  });
}

async function setComments() {
  generateLevelFirst();

  let levels = randomInteger(1, 3);

  for (let i = 0; i < levels; i++) {
    generateChilds();
  }

  comments = await Promise.all(
    comments.map(async (el) => {
      try {
        let res = await fetch("http://www.randomtext.me/api/lorem/p-1/5-13");
        let data = await res.json();
        el.comment = data.text_out;
      } catch (err) {
        el.comment = "error load comment";
      }

      return el;
    })
  );

  return comments;
}

(async () => {
  comments = await setComments();
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const storiesComments = comments.filter(
        (comment) => comment.storyId == id
      );
      if (storiesComments) {
        return res.status(200).json(storiesComments);
      }

      return res.status(400).json({ message: "comments not found" });
    } catch (e) {
      res.status(500).json({ message: "smth gone wrong, try again" });
    }
  });
})();

module.exports = router;
