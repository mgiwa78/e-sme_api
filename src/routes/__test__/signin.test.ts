import request from "supertest";
import { app } from "../../app";

it("fials if email dosenot exist", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "tusdfh@test.com",
      password: "ps122sword"
    })
    .expect(400);
});

it("fails with incorrect password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "mai1l@mail.com", password: "ps122sword" })
    .expect(201);
  await request(app)
    .post("/api/users/signin")
    .send({ email: "mai1l@mail.com", password: "pssdsd122sword" })
    .expect(400);
});

it("responed with cookie when cred is valid", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "mai1l@mail.com", password: "password" })
    .expect(201);
  const response = await request(app)
    .post("/api/users/signin")
    .send({ email: "mai1l@mail.com", password: "password" })
    .expect(200);
  expect(response.get("Set-Cookie")).toBeDefined();
});
