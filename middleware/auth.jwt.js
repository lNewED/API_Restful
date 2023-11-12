const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

const { TokenExpiredError } = jwt;
const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token was expired" });
  }
  return res.status(401).send({ message: "Unauthorized! " });
};

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!!!!!!!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  //SELECT * FROM users WHERE id = req.userId
  User.findByPk(req.userId).then((user) => {
    //SELECT * FROM roles, users, users_roles WHERE user.id = users_roles.userId
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({ message: "Require Admin Role!" });
    });
    return;
  });
};

isModerator = (req, res, next) => {
  //SELECT * FROM users WHERE id = req.userId
  User.findByPk(req.userId).then((user) => {
    //SELECT * FROM roles, users, users_roles WHERE user.id = users_roles.userId
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
      res.status(403).send({ message: "Require Moderator Role!" });
    });
    return;
  });
};

isModeratorOrAdmin = (req, res, next) => {
  //SELECT * FROM users WHERE id = req.userId
  User.findByPk(req.userId).then((user) => {
    //SELECT * FROM roles, users, users_roles WHERE user.id = users_roles.userId and roles.id = users_roles.rolesId
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
      res.status(403).send({ message: "Require Moderator or Admin Role!" });
    });
    return;
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin,
};

module.exports = authJwt;
