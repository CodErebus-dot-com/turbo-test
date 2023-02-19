import jest from "jest";
const OpenApiMocker = require("open-api-mocker");
const path = require("path");

describe("Server config tests", () => {
  const port = 9000;

  const specYaml = path.resolve(__dirname, "./configs/spec.yaml");
  it("creates new open api mocker", async () => {
    let options = {
      port: port,
      schema: specYaml,
    };
    const mocker = new OpenApiMocker(options);
    await mocker.validate();
    await mocker.mock();

    expect(typeof mocker).toEqual("object");
     expect(
      mocker.api.paths[0].responses[200].content["application/json"].schema
        .properties
    ).toBeTruthy();
  });
});