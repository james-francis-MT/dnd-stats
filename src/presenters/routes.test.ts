import express, { type Express } from "express";
import request from "supertest";
import { routes } from "./routes";
import { useCases } from "../useCases";
import * as cheerio from "cheerio";

describe("GET /", () => {
  let app: Express;

  beforeEach(() => {
    app = express()
      .use(express.urlencoded({ extended: true }))
      .use(routes(useCases()));
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
