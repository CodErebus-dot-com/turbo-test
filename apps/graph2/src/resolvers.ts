import { Resolvers } from './generated/schema_types'
import { resolvers as cusResolvers } from './services/graph2/resolvers'

export const resolvers: Resolvers[] = [cusResolvers]
