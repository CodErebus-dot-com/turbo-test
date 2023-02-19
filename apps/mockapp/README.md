# About The Project

This tool leveraging and OpenAPI 3.0 specification along with using an example in the YAML files in the mock server and an endpoint to browse the available parameters of the spec. This server supports YAML/JSON with OpenAPI v3 schemas, Port binding selection, request parameters and body validation, and allows the response of the header and body based on the schema or example.

## Getting Started

The server requires the following parameters to launch:

- Open API spec path - used for generating endpoints and validating requests/responses before returning to the client.
- mocks file (YAML/JSON) containing a schema that works with Open Api 3.0
- Ports specified via ENV variables
  - `HTTP_PORT` for the aggregate server of all the endpoints

### Built With

- [Node](https://nodejs.org/en/) version 14.15.4
- [TypeScript](https://www.typescriptlang.org/)

### Run

This will gather dependacies build and start the mock server.

1. yarn install
2. yarn build
3. yarn start

### Execution explained

1. Requests from the client will be validated against the open api spec when called to the server.
2. Which Handles the route which can access the schema, the representation of the endpoint.
3. Followed by the Mocking API Route which is where the mocked server exists.
4. The response is returned to the client
5. The terminal will demonstrate the result of hitting the endpoint and whether it is successful.
   The validation should first identify which operation the request was intended for based on the HTTP verb and the URL.
6. If no match is found an error will be returned to the client displaying the matched `operationId` and the potential mocks that could be matched for that operation to help diagnose issues quickly.
7. If no matching `operationId` is found for the given request the server will return an error to the client with that message.

Note: So far the open-api specs have often not specified required properties on responses so, therefore, missing properties are not triggering validation errors unless we modify the open api spec manually to add required fields to responses.

### Server details

When the server is launched it will look for a folder named configs in the root of the project. The contents of the folder should have a spec.YAML and mocks.YAML files representing the open-api spec and corresponding mocks for that spec.

eg.

```
    ├── configs
        ├── mocks.YAML
        └── spec.YAML
```

This structure will result in a RESTful proxy with all the Open API spec operations defined in configs/accounts/spec.YAML being available at:

- `localhost:${PORT}/customer-service/v2.0/customers/{party-id}`

## Deployment

Please amend the helm chart and ovverides and provide your envioremnt variables.

1. Please see the preperations needed be, before continuing, on page https://ltmhedge.atlassian.net/wiki/spaces/VCT/pages/2257388365/Getting+Started+GQL
2. Go to your Jenkins instance. (Consult with systems team to find out the url)
3. Then in jenkins go to New Item -> Multybranch pipeline create a name same as your repository.
4. Your job -> Configure -> Branch Sources -> Add source select github
5. Credentials - select robot account (Consult systems team)
6. Repsitory HTTPS URL add your gql repository url and click save

It will run a scan on your repsitory and pick up any brach that has a Jenkinsfile.

## Accessing already deployed service on GCP

The service is on deployable via Jenkins on GCP the root of the mocks is accessible at:

https://_--_/{mockservice}/{open-api-spec-url} for the REST endpoints
