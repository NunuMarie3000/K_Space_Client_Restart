import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userLayout: null,
  userId: null,
  profile: null,
  aboutMe: null,
  blogs: null,
  loading: false,
}

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserLayout: (state, action) => {
      state.userLayout = action.payload
    },
    updateUserLayout: (state, action) => {
      if (state.userLayout) {
        state.userLayout = { ...state.userLayout, ...action.payload }
      }
    },
    setUserId: (state, action) => {
      state.userId = action.payload
    },
    setProfile: (state, action) => {
      state.profile = action.payload
    },
    setAboutMe: (state, action) => {
      state.aboutMe = action.payload
    },
    setBlogs: (state, action) => {
      state.blogs = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    clearUserData: (state) => {
      state.userLayout = null
      state.userId = null
      state.profile = null
      state.aboutMe = null
      state.blogs = null
      state.loading = false
    },
  },
})

export const {
  setUserLayout,
  updateUserLayout,
  setUserId,
  setProfile,
  setAboutMe,
  setBlogs,
  setLoading,
  clearUserData,
} = userDataSlice.actions
export default userDataSlice.reducer

