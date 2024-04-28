const { Users } = require("../src/models/User.models");
const { app } = require("../src/index.js");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;

const username = "test";
const email = "yanntcheumani@yahoo.fr";
const password = "test";
chai.use(chaiHttp);
chai.should();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

var Cookies;

describe("Service", function () {
  let client = undefined;
  let token;

  before(function (done) {
    sleep(500);
    chai
      .request(app)
      .post("/api/auth/register")
      .send({ username: username, email: email, password: password })
      .end((err, reponse) => {
        expect(reponse).to.have.status(200);
        done();
      });
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

  it("GET get service with unknown user", (done) => {
    chai
      .request(app)
      .post("/api/auth/login")
      .send({ email: email, password: password })
      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response.body.message).to.equals("you're login");
        token = response.body.access_token;

        chai
          .request(app)
          .get("/api/service/")
          .end((err, response) => {
            expect(response).to.have.status(401);
            done();
          });
      });
  });

  it("GET get service with wrong token", (done) => {
    chai
      .request(app)
      .post("/api/auth/login")
      .send({ email: email, password: password })
      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response.body.message).to.equals("you're login");
        token = response.body.access_token;

        chai
          .request(app)
          .get("/api/service/")
          .set("Authorization", "Bearer dfjdkjfd")
          .end((err, response) => {
            expect(response).to.have.status(401);
            done();
          });
      });
  });

  it("GET services", (done) => {
    chai
      .request(app)
      .post("/api/auth/login")
      .send({ email: email, password: password })
      .end((err, response) => {
        expect(response).to.have.status(200);
        expect(response.body.message).to.equals("you're login");
        Cookies = response.headers["set-cookie"].pop().split(";")[0];
        chai
          .request(app)
          .get("/api/service/")
          .set("Authorization", "Bearer " + Cookies.split("=")[1])
          .end((err, response) => {
            expect(response).to.have.status(200);
            // console.log(response.body.services);
            done();
          });
      });
  });
});
