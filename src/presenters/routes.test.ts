import express, { type Express } from "express";
import request from "supertest";
import { routes } from "../routes";
import { useCases, UseCases } from "../useCases";
import * as cheerio from "cheerio";

describe("GET /character/:id", function () {
  let app: Express;
  let cases: UseCases;

  beforeEach(() => {
    cases = useCases();
    app = express().use(routes(cases));
  });

  it("responds with character info and scores", async () => {
    const id = cases.createCharacter.execute({ name: "Bob" }).value.id;

    const response = await request(app).get(`/character/${id}`);

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      name: "Bob",
      scores: {
        charisma: 8,
        constitution: 14,
        dexterity: 13,
        intelligence: 10,
        strength: 15,
        wisdom: 12,
      },
    });
  });
});

describe("GET /", () => {
  let app: Express;

  beforeEach(() => {
    app = express().use(routes(useCases()));
  });

  it("responds with create character html", async () => {
    const response = await request(app).get("/");

    const page = cheerio.load(response.text);
    expect(page("h1").text()).toEqual("My First Heading");
  });
});

describe("POST /createCharacter", () => {
  let app: Express;

  beforeEach(() => {
    app = express()
      .use(express.urlencoded({ extended: true }))
      .use(routes(useCases()));
  });

  it("creates the character and redirects to their page", async () => {
    const response = await request(app)
      .post("/createCharacter")
      .type("form")
      .send({ name: "Bob" });

    expect(response.status).toEqual(302);
    expect(response.headers.location).toMatch(/^\/character\/[0-9a-f-]{36}$/);
  });
});
