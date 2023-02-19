import { Resolvers } from './generated/schema_types'
import { resolvers as cusResolvers } from './services/graphserviceapp/resolvers'

export const resolvers: Resolvers[] = [cusResolvers]
