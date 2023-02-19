import { Graph2RestDataSource } from './services/graph2'
import { IDataSources } from './types'

require('dotenv').config() // eslint-disable-line @typescript-eslint/no-var-requires

export function getDataSources(): IDataSources {
  return {
    graph2Api: new Graph2RestDataSource(process.env.GRAPH2_SERVICE_HOST),
  }
}
