const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
var Mailchimp = require('mailchimp-api-v3');
const { response } = require("express");
var mailchimp = new Mailchimp('cab21ea4b86ece14b93976ea2d02175f-us21');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.get("/",function(req,res){

    res.sendFile(__dirname + "/signup.html");
    

})




app.post("/", function(req, res){
    const fname = req.body.firstname;
    const lname = req.body.lastname;
    const email = req.body.email;
    console.log(fname,lname,email)

    mailchimp.post(`/lists/56f2387c7a/members`, {
        email_address: email,
        status: 'subscribed',
        merge_fields:{
             FNAME: fname,
             LNAME: lname,
            }
      })
    
    .then(response => {
        res.sendFile(__dirname + "/success.html");
      })
      .catch(error => {
        res.sendFile(__dirname + "/failure.html");
      });

    });

    app.post("/failure", function(req,res){
        res.redirect("/")
    })

app.listen(3000);





