import express, { type Express } from "express";
import request from "supertest";
import { routes } from "../routes";
import { useCases } from "../useCases";
import * as cheerio from "cheerio";

let app: Express;

describe("GET /character", function () {
  beforeEach(() => {
    app = express().use(routes(useCases()));
  });

  it("responds with character info and scores", async () => {
    const response = await request(app).get("/character");
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
  beforeEach(() => {
    app = express().use(routes(useCases()));
  });

  it("responds with create character html", async () => {
    const response = await request(app).get("/");

    const page = cheerio.load(response.text);
    expect(page("h1").text()).toEqual("My First Heading");
  });
});
