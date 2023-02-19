import * as schemaTypes from '../../generated/schema_types'
import * as types from '../../types'
import * as api from './generated'
import * as mappers from './mappers'
import { GraphQLScalarType } from 'graphql';
import { buildAuthenticationError } from '@gql/utils'
import { convertIntToGenderEnum } from './enums'

export const GraphQLDateTimeScalar = new GraphQLScalarType({
  name: 'GraphQLDateTimeScalar',
  serialize: (value) => {
    return value;
  },
});

export async function findGraphserviceapp(
  ctx: types.ICommonContextType,
): Promise<mappers.IGraphserviceappDetailMapper> {
  const partyId = ctx.user.partyId ?? buildAuthenticationError('partyId missing!')
  const apiRequest = new api.GetGraphserviceappDetails_Request({
    pathParams: { 'party-id': partyId },
    headers: ctx.headers,
  })
  const apiResponse = await ctx.dataSources.graphserviceappApi.getGraphserviceappDetails(apiRequest)
  return apiResponse.Data
}

export const resolvers: schemaTypes.Resolvers = {
  Query: {
    timeAtGraphserviceapp: () => new Date(),
    graphserviceappDetail: async (parent, args, ctx) => {
      return findGraphserviceapp(ctx)
    },
  },
  GraphQLDateTime:GraphQLDateTimeScalar,
  GraphserviceappDetail: {
    partyId: parent => parent.Customer.CustomerId,
    nameDetails: parent => {
      return {
        firstName: parent?.Customer?.FirstName,
        middleName: parent?.Customer?.MiddleName,
        lastName: parent?.Customer?.LastName,
      }
    },
    dateOfBirth: parent => parent?.Customer?.DateOfBirth,
    gender: parent => convertIntToGenderEnum(parent?.Customer?.Gender),
  },
}
