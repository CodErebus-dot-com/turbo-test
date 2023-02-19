require("dotenv").config();

const OpenApiMocker = require("open-api-mocker");
const YAML = require("js-yaml");
const fs = require("fs");
const path = require("path");

const specYaml = path.resolve(__dirname, "./configs/spec.yaml");
const schema = YAML.load(fs.readFileSync(specYaml));
export async function MockServer() {
  let options = {
    port: process.env.HTTP_PORT,
    schema: schema,
  };
  const mocker = new OpenApiMocker(options);
  await mocker.validate();
  await mocker.mock();
  console.log(
    "-----> Example of endpoint ------>",
    `http://localhost:${process.env.HTTP_PORT}/balanace-service/v2.0/customers/ba63c64b-254e-45fc-ac16-fc0d9118f30c`
  );
}
