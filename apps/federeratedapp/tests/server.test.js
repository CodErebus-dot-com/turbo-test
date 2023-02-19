const { ServerConfigBuilder, GatewayBuilder } = require('@gql/utils');
const { getContext } = require('../src/context');
const graphqlDepthLimit = require('graphql-depth-limit');
const penv = require('./helpers/envConfig').setProcessEnv();

describe('Server config tests', () => {
  const OLD_ENV = penv;

  beforeEach(() => {
    process.env = { ...OLD_ENV };
  });

  it('should create new express app', async () => {
    jest.setTimeout(30000);

    const gateway = await new GatewayBuilder(process.env).getGateway().catch(e => {
      expect(e instanceof Error).toEqual(true);
    });

    const serverConfig = new ServerConfigBuilder(process.env)
      .setAppoloConfig({
        context: getContext(),
        validationRules: [graphqlDepthLimit(process.env.GQL_MAX_QUERY_DEPTH || '10')],
        gateway,
        subscriptions: false,
      })
      .getCommonConfig();

    expect(typeof serverConfig.apollo).toEqual('object');
  });
});
