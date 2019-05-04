import { combineReducers } from 'redux'

import recordReducer, {
  isRequestingRecord,
  getRecord,
  isRecordDifferent,
  isRequestingRecordList,
  getRecordList,
  isRecordListDifferent
} from './recordReducer'
import schemaReducer, {
  isRequestingSchema,
  isSchemaDifferent,
  isRequestingSchemaList
} from './schemaReducer'

export const rootReducer = combineReducers({
  recordStore: recordReducer,
  schemaStore: schemaReducer
})

export {
  isRequestingRecord,
  getRecord,
  isRecordDifferent,
  isRequestingRecordList,
  getRecordList,
  isRecordListDifferent,
  isRequestingSchema,
  isSchemaDifferent,
  isRequestingSchemaList
}
