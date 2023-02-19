import { rule, shield } from 'graphql-shield'

const isAuthenticated = rule()((parent, args, { user }) => {
  return user !== null
})

export const permissions = shield(
  {
    Query: {
      // graph2: isAuthenticated,
    },
  },
  { allowExternalErrors: true },
)
