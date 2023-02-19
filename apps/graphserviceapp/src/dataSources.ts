import { GraphserviceappRestDataSource } from './services/graphserviceapp'
import { IDataSources } from './types'

require('dotenv').config() // eslint-disable-line @typescript-eslint/no-var-requires

export function getDataSources(): IDataSources {
  return {
    graphserviceappApi: new GraphserviceappRestDataSource(process.env.GRAPHSERVICEAPP_SERVICE_HOST),
  }
}
