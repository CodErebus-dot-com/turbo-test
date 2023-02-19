exports.setProcessEnv = function () {
  let penv = new Map();
  penv['HTTP_PORT'] = 14003;
  penv['APOLLO_PLAYGROUND'] = 1;
  penv['APOLLO_INTROSPECTION'] = 1;
  penv['APOLLO_MOCKS'] = 0;
  penv['APOLLO_MOCK_ENTIRE_SCHEMA'] = 0;
  penv['APOLLO_DEBUG'] = 0;
  penv['LOG_LEVEL'] = 'debug';
  penv['ERROR_STACK_TRACE_ON'] = 1;
  penv['SERVICE_INFO'] = '{"name":"federation", "version":"2.23.0"}';
  penv['IS_MANAGED_GATEWAY'] = 0;
  penv['GQL_SERVICE_URL_ACCOUNTS'] = 'http://localhost:14001/graphql';
  penv['SERVICE_HEALTH_PATH'] = '.well-known/apollo/server-health';
  return penv;
};
