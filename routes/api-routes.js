let db = require("../models");
const nodemailer = require("nodemailer");



module.exports = function(app) {

    app.get("/api/Customers", function(req, res) {
        db.Customer.findAll({})
            .then(function(dbCustomer) {
                res.json(dbCustomer);
            });
    });
    app.get("/api/Tattoos", function(req, res) {
        db.Tattoo.findAll({})
            .then(function(dbTattoo) {
                res.json(dbTattoo);
            });
    });

    app.post("/api/Customers", function(req, res) {
        db.Customer.create(req.body)
            .then(function(dbCustomer) {
                res.json(dbCustomer);
            });
    });
    app.post("/api/Tattoos", function(req, res) {
        db.Tattoo.create(req.body)
            .then(function(dbTattoo) {
                res.json(dbTattoo);
            });
    });

    app.get("/api/Customers/:id", function(req, res) {
        db.Customer.findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(function(dbCustomer) {
                res.json(dbCustomer);
            });
    });
    app.get("/api/Tattoos/:id", function(req, res) {
        db.Tattoo.findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(function(dbTattoo) {
                res.json(dbTattoo);
            });
    });

    app.put("/api/Customers", function(req, res) {
        db.Customer.update(req.body, {
                where: {
                    id: req.body.id
                }
            })
            .then(function(dbCustomer) {
                res.json(dbCustomer);
            });
    });
    app.put("/api/Tattoos", function(req, res) {
        db.Tattoo.update(req.body, {
                where: {
                    id: req.body.id
                }
            })
            .then(function(dbTattoo) {
                res.json(dbTattoo);
            });
    });

    app.delete("/api/Customers/:id", function(req, res) {
        db.Customer.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(function(dbCustomer) {
                res.json(dbCustomer);
            });
    });
    app.delete("/api/Tattoos/:id", function(req, res) {
        db.Tattoo.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(function(dbTattoo) {
                res.json(dbTattoo);
            });
    });

    app.delete("/api/Customers/:id", function(req, res) {
        db.Post.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(function(dbPost) {
                res.json(dbPost);
            });
    });
    app.delete("/api/Tattoos/:id", function(req, res) {
        db.Post.destroy({
                where: {
                    id: req.params.id
                }
            })
            .then(function(dbPost) {
                res.json(dbPost);
            });
    });

    app.put('/logout',function(req,res){
        req.logout();
        res.end();
    })

    //nodemailer
    app.post("/api/newTat", function(req, res) {
        var newTat = req.body;
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'plannertattoo@gmail.com',
                pass: process.env.SECRET_KEY
            }
        });

        const mailOptions = {
            from: 'plannertattoo@gmail.com', // sender address
            to: 'willcwhite@gmail.com', // list of receivers
            subject: 'NEW TATTOO REQUEST', // Subject line
            html: `<h1>A Customer has requested a new tattoo!</h1>
            <h2>Phrase:<h2> ${newTat.phrase}
            <h3>Font:</h3> ${newTat.font}
            <h3>Location:</h3> ${newTat.location}
            <h3>Color(s):</h3> ${newTat.color}
            <h3>Size:<h3> ${newTat.size}
            <h3>Additional Specifications:</h3> ${newTat.specs}
            <h4>Reply to this user at</h4> willcwhite@gmail.com` // plain text body
        };

        transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
                return console.log(err);
            } else {
                console.log(info)
            }
        })
    })

}