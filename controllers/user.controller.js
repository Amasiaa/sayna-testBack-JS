const db = require("../models");
//const Cart = require("../models/cart.model");
const Cart = db.cart;
const User = db.user;
const Role = db.role;
const Song = db.song;
const Bill = db.bill;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

// ************ ADD CARD *****************
exports.addCart = (req, res) => {
  const user_id = req.params.user_id;
  const cart = new Cart({
    cartNumber: req.body.cartNumber,
    month: req.body.month,
    year: req.body.year,
    default: req.body.default
  });

  cart.save((err, cart) => {
    if (err) {
      switch (res.status) {
        case 401:
          res.send({ message: "Votre token n'est pas correct" });
          break;
        case 402:
          res.send({ message: "Information bancaire incorrectes" });
          break;
        case 403:
          res.send({ message: "Vos droits d'accès ne permettent pas d'accéder à la ressource" });
          break;
        case 409:
          res.send({ message: "La carte existe déjà, ou Une ou plusieurs données sont erronées" });
          break;
        default:
          break;
      }

      return;
    } else {
      console.log("Carte ajoutée avec succès!!!");
      console.log(`USER_ID=${user_id}`);

      Cart.findOne({ cartNumber: cart.cartNumber }, (err, card) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        User.updateOne(
          { user_id: req.params.user_id },
          {
            $set: {
              carts: [card._id]
            }
          }
        ).then(result => {
          res.send({ message: "Vos données ont été mises à jour" });
        });
      });

    }
  });

};

//************* DELETE USER *********
exports.deleteUser = (req, res) => {
  const usr_id = req.params.user_id;

  User.findByIdAndRemove(usr_id)
    .then(data => {
      if (!data) {
        res.status(401).send({
          message: "Votre token n'est pas correct"
        });

        res.status(404).send({
          message: `Cannot delete User with id=${usr_id}. Maybe User was not found!`
        });
      } else {
        res.send({
          message: "Votre compte a été supprimée avec succès"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

//********************GET ALL SONGS ****************/
exports.findAllSongs = (req, res) => {
  Song.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(401).send({
        message: "Votre token n'est pas correct"
      });

      res.status(403).send({
        message: "Votre abonnement ne permet pas d'accéder à la ressource"
      });

      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving songs."
      });
    });
};

/********* GET SONG BY ID *************** */
exports.findSongById = (req, res) => {
  const song_id = req.params.id;

  Song.findById(song_id)
    .then(data => {
      if(!data) {
        res.status(403).send({
          message: "Votre abonnement ne permet pas d'accéder à la ressource"
        });

        res.status(404).send({ message: "Not found Song with id " + song_id });

        res.status(409).send({
          message: "L'audio n'est pas accessibles"
        });
      } else res.send(data);
    })
    .catch(err => {
      res.status(500)
        .send({ message: "Error retrieving Song with id=" + song_id });
    });
};

/************ BILL ******************** */
exports.getBills = (req, res) => {
  Bill.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(401).send({
        message: "Votre token n'est pas correct"
      });

      res.status(403).send({
        message: "Vos droits d'accès ne permettent pas d'accéder à la ressource"
      });

      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving bills."
      });
    });
};