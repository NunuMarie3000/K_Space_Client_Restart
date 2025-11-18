import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import userDataReducer from './userDataSlice'

// Persist configuration for auth (we want to persist auth across reloads)
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token', 'isAuthenticated'], // Only persist these fields
}

// Persist configuration for userData (optional - you might want to persist this too)
const userDataPersistConfig = {
  key: 'userData',
  storage,
  whitelist: ['userLayout', 'userId'], // Persist layout and userId
}

// Create persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer)
const persistedUserDataReducer = persistReducer(userDataPersistConfig, userDataReducer)

// Combine reducers
const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  userData: persistedUserDataReducer,
})

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export const persistor = persistStore(store)

