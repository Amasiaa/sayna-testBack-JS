const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.put(
    "/api/user/cart/:user_id",
    [authJwt.verifyToken],
    controller.addCart
  );
//****** DELETE USER **************/
  app.delete(
    "/api/user/:user_id",
    [authJwt.verifyToken],
    controller.deleteUser
  );
 //******GET ALL SONGS */   
  app.get(
    "/api/songs",
    [authJwt.verifyToken],
    controller.findAllSongs
  );
/************ GET SONG BY ID ************* */
app.get(
  "/api/songs/:id",
  [authJwt.verifyToken],
  controller.findSongById
);

/*************** GET ALL BILLS */
app.get(
  "/api/bills",
  [authJwt.verifyToken],
  controller.getBills
);
};
