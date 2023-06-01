import request from "supertest";
import app from "../src/index.js";

//
describe("POST /api/v1/user/login", function () {
  it("Log in to the system", function (done) {
    request(app)
      .post("/api/v1/user/login")
      .send({ email: "hieu.lv@zinza.com.vn", password: "123123" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done())
      .then((response) => {
        assert(response.body.data !== undefined);
      })
      .catch((err) => {
        assert(err === undefined);
      });
  });
});
