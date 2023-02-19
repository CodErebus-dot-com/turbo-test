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

export async function findGraph2(
  ctx: types.ICommonContextType,
): Promise<mappers.IGraph2DetailMapper> {
  const partyId = ctx.user.partyId ?? buildAuthenticationError('partyId missing!')
  const apiRequest = new api.GetGraph2Details_Request({
    pathParams: { 'party-id': partyId },
    headers: ctx.headers,
  })
  const apiResponse = await ctx.dataSources.graph2Api.getGraph2Details(apiRequest)
  return apiResponse.Data
}

export const resolvers: schemaTypes.Resolvers = {
  Query: {
    timeAtGraph2: () => new Date(),
    graph2Detail: async (parent, args, ctx) => {
      return findGraph2(ctx)
    },
  },
  GraphQLDateTime:GraphQLDateTimeScalar,
  Graph2Detail: {
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
