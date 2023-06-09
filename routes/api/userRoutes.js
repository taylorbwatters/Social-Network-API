const router = require('express').Router();
const { User, Thought } = require('../../models');

router.get('/', (req, res) => {
    User.find().populate('thoughts')
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error', err });
        });
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ msg: 'Error', err });
        });
});

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email
    })
     .then(newUser => {
         res.json(newUser);
     })
     .catch(err => {
         console.log(err);
         res.status(500).json({ msg: 'Error', err });
     });
});

router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        email: req.body.email
    })
     .then(updatedUser => {
         res.json(updatedUser);
     })
     .catch(err => {
         console.log(err);
         res.status(500).json({ msg: 'Error', err });
     });
});

router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(deleteUser => {
          Thought.deleteMany({ username: deleteUser.username })
            .catch(err => {
                console.log(err);
                res.status(500).json({ msg: 'Error', err });
            });
          res.json({ msg: "Success" });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({ msg: 'Error', err });
      });
});

router.post('/:id/friends/:fId', (req, res) => {
    User.findByIdAndUpdate(req.params.id, { $push: { friends: req.params.fId }})
      .then(newFriend => {
        res.json(newFriend);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({ msg:'Error', err });
      });
});

router.delete('/:id/friends/:fId', (req, res) => {
    User.findByIdAndUpdate(req.params.id, { $pull: { friends: req.params.fId }})
     .then(deletedFriend => {
        res.json(deletedFriend);
     })
     .catch(err => {
         console.log(err);
         res.status(500).json({ msg: 'Error', err });
     });
});

module.exports = router;