import express, { type Express } from "express";
import request from "supertest";
import { routes } from "./routes";
import { UseCases, useCases } from "../useCases";
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

describe("GET /characterSheet/id", () => {
  let cases: UseCases;
  let app: Express;

  beforeEach(() => {
    cases = useCases();

    app = express()
      .use(express.urlencoded({ extended: true }))
      .use(routes(useCases()));
  });

  it("get sheet", async () => {
    const id = cases.createCharacter.execute({
      name: "Bob",
      species: "human",
      class: "paladin",
      level: 1,
      abilityScores: {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
      },
    }).value.id;

    const response = await request(app).get(`/character/${id}`);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      success: true,
      value: {
        sheet: {
          name: "Bob",
          species: "human",
          level: 1,
          class: "paladin",
          abilityScores: {
            strength: {
              score: 0,
              modifier: -5,
              savingThrow: -5,
              proficient: false,
            },
            dexterity: {
              score: 0,
              modifier: -5,
              savingThrow: -5,
              proficient: false,
            },
            constitution: {
              score: 0,
              modifier: -5,
              savingThrow: -5,
              proficient: false,
            },
            intelligence: {
              score: 0,
              modifier: -5,
              savingThrow: -5,
              proficient: false,
            },
            wisdom: {
              score: 0,
              modifier: -5,
              savingThrow: -3,
              proficient: true,
            },
            charisma: {
              score: 0,
              modifier: -5,
              savingThrow: -3,
              proficient: true,
            },
          },
          hitpoints: 5,
          armourClass: 5,
          equipped: null,
          weapons: [],
        },
      },
    });
  });
});
