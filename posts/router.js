const express = require('express');
const Posts = require('../data/db');
const router = express.Router();

router.get('/', (req, res) => {
  Posts.find(req.query)
    .then( post => {
      res.status(200).json(post)
    })
    .catch( err => {
      console.log( err );
      res.status(500).json({
        message: "Error retrieving posts ..."
      })
    })
});

router.get('/:id', (req, res) => {
  Posts.findById(req.params.id)
    .then( post => {
      if ( post ) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'The specified post was not found' })
      }
    })
    .catch( err => {
      console.log( err );
      res.status(500).json({
        message: 'Error retrieving the post.'
      });
    });
});

router.post('/', (req, res) => {
  Posts.insert(req.body)
    .then( post => {
      res.status(201).json(post)
    })
    .catch( err => {
      console.log( err );
      res.status(500).json({
        message: 'Error adding the post'
      });
    });
});

router.delete('/:id', (req, res) => {
  Posts
    .remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The post has been removed' });
      } else {
        res.status(404).json({ message: 'The post could not be found.' })
      }
    })
    .catch( err => {
      console.log( err );
      res.status(500).json({ 
        message: 'Error removing the post.' 
      });
    });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  Posts
    .update(req.params.id, changes)
    .then( post => {
      if ( post ) {
        res.status(200).json( post )
      } else {
        res.status(404).json({ message: 'The post could not be found.' })
      }
    })
    .catch( err => {
      console.log( err );
      res.status(500).json({
        message: 'Error updating the post.'
      });
    });
});

router.post('/:id/comments', (req, res) => {
  Posts.insertComment(req.body)
    .then( post => {
      res.status(201).json(post)
    })
    .catch( err => {
      console.log( err );
      res.status(500).json({
        message: 'Error inserting a comment.'
      });
    });
});

router.get('/:id/comments', (req, res) => {
  Posts.findCommentById(req.params.id)
    .then( comments => {
      if ( comments ) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ message: `Unable to find comments associated with ID ${req.params.id}` })
      }
    })
    .catch( err => {
      console.log( err );
      res.status(500).json({
        message: 'Error retrieving comments for this post.'
      });
    });
});

module.exports = router;