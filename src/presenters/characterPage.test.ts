import express, { type Express } from "express";
import request from "supertest";
import { routes } from "../routes";

let app: Express;

describe("GET /character", function () {
  beforeEach(() => {
    app = express().use(routes());
  });

  it("responds with character info", async () => {
    const response = await request(app)
      .get("/character")
      .set("Accept", "application/json");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ name: "Bob" });
  });
});
