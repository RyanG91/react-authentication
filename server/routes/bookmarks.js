const express = require('express');
const Bookmark = require('../models/bookmark');
const router = express.Router();

// GET /bookmarks (R)
router.get('/', (req, res) => {
  Bookmark.find().then(
    bookmarks => res.json(bookmarks)
  ).catch(
    error => res.status(500).json({ error: error.message })
  )
})

// POST /bookmarks (C)
router.post('/', (req, res) => {
  // const bookmark = new Bookmark({ title: req.body.title, url: req.body.url })
  // bookmark.save()
  Bookmark.create(req.body).then(
    bookmark => res.send(bookmark)
  ).catch(
    error => res.status(500).json({ error: error.message })
  )
})

// DELETE /bookmarks/:id (D)
router.delete('/:id', (req, res) => {
  Bookmark.findByIdAndRemove(req.params.id).then(
    () => res.send(204)
  ).catch(
    error => res.status(500).json({ error: error.message })
  )
})



module.exports = router
