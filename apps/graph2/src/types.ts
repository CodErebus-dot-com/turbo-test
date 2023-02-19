import { HTTPHeaders, IConfigCommon } from '@gql/utils'
import { Graph2RestDataSource } from './services/graph2'

export interface IDataSources {
  graph2Api: Graph2RestDataSource
}

export interface ICommonContextType {
  dataSources: IDataSources
  headers?: HTTPHeaders
  config: IConfigCommon
  user: User
}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface User {
  partyId: string
}
