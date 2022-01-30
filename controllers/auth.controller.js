const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      date_naissance: req.body.date_naissance,
      sexe: req.body.sexe,
      subscription: 0
    });
  
    user.save((err, user) => {
        if(err) {
            switch(res.status) {
                case 400: 
                    res.send({message: "Une ou plusieurs données obligatoires sont manquantes, ou Email/password incorrect"});
                    break;
                case 409:
                    res.send({message: "Un compte utilisant cette adresse mail est déjà enregistré, ou Une ou plusieurs données sont erronées"});
                    break;
                default:
                    break;
            }
            
            return;
        }
  
      if (req.body.roles) {
        Role.find(
          {
            name: { $in: req.body.roles }
          },
          (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
  
            user.roles = roles.map(role => role._id);
            user.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
  
              res.send({ message: "L'utilisateur a bien été créé avec succès", user: user });
            });
          }
        );
      } else {
        Role.findOne({ name: "user" }, (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          user.roles = [role._id];
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
  
            res.send({ message: "L'utilisateur a bien été créé avec succès", user: user });
          });
        });
      }
    });
  };

  // LOGIN
  exports.signin = (req, res) => {
    User.findOne({
      email: req.body.email
    })
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          //expiresIn: 86400 // 24 hours
          expiresIn: config.jwtExpiration // 1 hour
        });
  
        var authorities = [];
  
        for (let i = 0; i < user.roles.length; i++) {
          authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        res.status(200).send({
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                sexe: user.sexe,
                roles: authorities,
                date_naissance: user.date_naissance,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                subscription: user.subscription
              },
              accessToken: token,
        });
      });
  };