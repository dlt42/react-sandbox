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
import authReducer from './authReducer'

export const rootReducer = combineReducers({
  recordStore: recordReducer,
  schemaStore: schemaReducer,
  authStore: authReducer
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
