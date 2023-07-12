import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "tusdfh@test.com",
      password: "ps122sword"
    })
    .expect(201);
});

it("returns a 400 with invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "tudfbtest.com",
      password: "ps122sword"
    })
    .expect(400);
});

it("returns a 400 with invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "tuuttes@test.com",
      password: "p"
    })
    .expect(400);
});

it("returns a 400 without email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "mail@mail.com" })
    .expect(400);
  return request(app).post("/api/users/signup").send().expect(400);
});

it("dissallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "mai1l@mail.com", password: "ps122sword" })
    .expect(201);
  return request(app)
    .post("/api/users/signup")
    .send({ email: "mai1l@mail.com", password: "ps122sword" })
    .expect(400);
});

it("check if cookie is set after signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "maasdil@mail.com", password: "ps122sword" })
    .expect(201);
  expect(response.get("Set-Cookie")).toBeDefined();
});
