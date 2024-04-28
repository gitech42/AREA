const { Users } = require("../src/models/User.models");
const { app } = require("../src/index.js");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;

const username = "test";
const email = "yanntcheumani@yahoo.fr";
const wrong_email = "testdu@gmail.com";
const password = "test";
const wrong_password = "r";
chai.use(chaiHttp);
chai.should();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

var Cookies;

describe("Authentication", function () {
  let client = undefined;
  let token = "";

  before(function (done) {
    sleep(500);
    done();
  });

  after(function (done) {
    Users.deleteOne({ username: username })
      .then(function (response) {
        sleep(500);
      })
      .catch(function (error) {
        console.log(error); // Failure
      });
    done();
  });

  afterEach(function (done) {
    done();
  });
  beforeEach(function (done) {
    done();
  });

  it("POST good register", (done) => {
    Users.findOne({ username: username }, function (err, reponse) {
      if (err) return err;
      Users.deleteOne({ username: username })
        .then(function () {
          sleep(500);
        })
        .catch(function (error) {
          console.log(error); // Failure
        });
    });
    chai
      .request(app)
      .post("/api/auth/register")
      .send({ username: username, email: email, password: password })
      .end((err, reponse) => {
        expect(reponse).to.have.status(200);
        expect(reponse.body.message).to.equals("you're register");
        done();
      });
  });

  it("POST bad register", (done) => {
    chai
      .request(app)
      .post("/api/auth/register")
      .send({ email: email, password: password })
      .end((err, response) => {
        expect(response).to.have.status(400);
      });

    chai
      .request(app)
      .post("/api/auth/register")
      .send({ username: username, password: password })
      .end((err, response) => {
        expect(response).to.have.status(400);
      });

    chai
      .request(app)
      .post("/api/auth/register")
      .send({ password: password })
      .end((err, response) => {
        expect(response).to.have.status(400);
        done();
      });
  });

  it("POST good login", (done) => {
    chai
      .request(app)
      .post("/api/auth/login")
      .send({ email: email, password: password })
      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response.body.message).to.equals("you're login");
        // Cookies = response.headers['set-cookie'].pop().split(';')[0];
        done();
      });
  });

  it("POST bad login", (done) => {
    chai
      .request(app)
      .post("/api/auth/login")
      .send({ email: email, password: wrong_password })
      .end((err, response) => {
        expect(response).to.have.status(400);
        done();
      });
  });

  it("POST good request for forget password", (done) => {
    chai
      .request(app)
      .post("/api/auth/forget-password")
      .send({ email: email })
      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response.body.message).to.equals(
          "a mail as send to this email " + email
        );
      });
    sleep(1000);
    chai
      .request(app)
      .post("/api/auth/login")
      .send({ email: email, password: password })
      .end((err, response) => {
        if (err) expect(2).to.equal(1);
        expect(response).to.have.status(200);
        done();
      });
  });

  it("POST bad request for forget password", (done) => {
    chai
      .request(app)
      .post("/api/auth/forget-password")
      .send({ email: wrong_email })
      .end((err, response) => {
        expect(response).to.have.status(500);
        done();
      });
  });
});
