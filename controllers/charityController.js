const { Router } = require("express");
const Charity = require("../models/charity");
const router = Router();
const donationController = require("./donationController");
const targetController = require("./targetController");
const targetService = require("../services/targetService");
const userService = require("../services/userService");
const cloudinary = require("cloudinary").v2;
const cloudinaryConfig = require("../config/cloudinaryConfig");
const multipart = require("connect-multiparty");
const Category = require("../models/category");

router.use("/donation", donationController);
router.use("/target", targetController);

const multipartMiddleware = multipart();

cloudinary.config(cloudinaryConfig);

router.get("/", function (req, res) {
  Charity.find({ deletedAt: null }, function (err, charities) {
    if (err) {
      res.render("charities/charities.hbs", { message: err });
    } else {
      Category.find({ deletedAt: null }, function (err, categories) {
        if (err) {
          res.render("charities/charities.hbs", { categories });
        } else {
          res.render("charities/charities.hbs", {
            categories: categories,
            charities,
          });
        }
      }).lean();
    }
  }).lean();
});

router.get("/new", function (req, res) {
  Category.find({ deletedAt: null }, function (err, categories) {
    if (err) {
      res.render("charities/newCharity.hbs", { categories });
    } else {
        Charity.find({}, (err, charities) => {
            if(err) {
                throw err;
            }
            else {
                res.render("charities/newCharity.hbs", {
                    categories: categories,
                    charities,
                  });
            }
        }).lean();
    }
  }).lean();
});

router.get("/:id/edit", function (req, res) {
  Charity.findById(req.params.id, function (err, charity) {
    if (err) {
      res.render("charities/charityDetails.hbs", {
        message: err,
        charity: charity,
      });
    } else {
      Category.find({ deletedAt: null }, function (err, categories) {
        if (err) {
          res.render("charities/editCharity.hbs", { categories });
        } else {
          res.render("charities/editCharity.hbs", {
            categories: categories,
            charity,
          });
        }
      }).lean();
    }
  }).lean();
});

router.get("/:id", async function (req, res) {
  try {
    var targets = await targetService.getAllByCharityId(req.params.id);
    Charity.findById(req.params.id, function (err, charity) {
      if (err) {
        res.render("charities/charities.hbs", { message: err });
      } else {
        Category.find({ deletedAt: null }, function (err, categories) {
            if (err) {
              res.render("products/products.hbs", { products: products });
            } else {
              res.render("charities/charityDetails.hbs", {
                categories: categories,
                charity: charity,
                targets,
              });
            }
          }).lean();
      }
    }).lean();
  } catch (message) {
    console.log(message);
  }
});

router.post("/", multipartMiddleware, async function (req, res) {
  //#TODO ADD TARGETS
  try {
    var title = req.body.charity.title;
    var description = req.body.charity.description;
    var author = await userService.getUserById(req.user._id);
    var email = req.body.charity.email;
    var phoneNumber = req.body.charity.phoneNumber;
    var iban = req.body.charity.iban;
    var address = req.body.charity.address;
    var city = req.body.charity.city;
    var createdBy = req.user.username;
    var updatedBy = req.user.username;
    var createdAt = Date.now();
    var updatedAt = Date.now();

    var image = req.files.imageUrl.path;

    var newCharity = {
      title: title,
      description: description,
      author: author,
      email: email,
      phoneNumber: phoneNumber,
      iban: iban,
      address: address,
      city: city,
      createdBy: createdBy,
      updatedBy: updatedBy,
      createdAt: createdAt,
      updatedAt: updatedAt,
      imageUrl: "",
    };

    await cloudinary.uploader
      .upload(image, { resource_type: "image", width: 360, height: 230 })
      .then(function (file) {
        newCharity.imageUrl = file.url;
      })
      .catch(function (err) {
        console.log(err);
      });

    Charity.create(newCharity, function (err, charity) {
      if (err) {
        console.log(err);
        res.render("charities/charities.hbs", { message: err });
      } else {
        charity.save();
        res.redirect("/charities/" + charity._id);
      }
    });
  } catch (message) {
    console.log(message);
  }
});

router.post("/:id", function (req, res) {
  Charity.findByIdAndUpdate(
    req.params.id,
    req.body.charity,
    function (err, charity) {
      if (err) {
        res.redirect("/charities/" + charity._id, { message: err });
      } else {
        charity.updatedAt = Date.now();
        charity.updatedBy = req.user.username;
        charity.save();
        res.redirect("/charities/" + charity._id);
      }
    }
  );
});

router.post("/:id/delete", function (req, res) {
  Charity.findById(req.params.id, function (err, charity) {
    if (err) {
      res.redirect("/charities", { message: err });
    } else {
      charity.deletedAt = Date.now();
      charity.deletedBy = req.user.username;
      charity.save();
      res.redirect("/charities");
    }
  });
});

module.exports = router;
