import { HTTPHeaders, IConfigCommon } from '@gql/utils'
import { GraphserviceappRestDataSource } from './services/graphserviceapp'

export interface IDataSources {
  graphserviceappApi: GraphserviceappRestDataSource
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
