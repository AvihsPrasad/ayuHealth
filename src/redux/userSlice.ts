import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  userId: string
  userName: string
  hospitalId: string
  role: string
  isCollapsed: boolean
}

const initialState: UserState = {
  userId: '',
  userName: '',
  hospitalId: '',
  role: '',
  isCollapsed: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload
    },
    setHospitalId: (state, action: PayloadAction<string>) => {
      state.hospitalId = action.payload
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload
    },
    setUser: (state, action: PayloadAction<UserState>) => {
      state.userId = action.payload.userId
      state.userName = action.payload.userName
      state.hospitalId = action.payload.hospitalId
      state.role = action.payload.role
      state.isCollapsed = action.payload.isCollapsed
    },
    setIsCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isCollapsed = action.payload
    },
  },
})

export const { setUserId, setUserName, setHospitalId, setRole, setUser, setIsCollapsed } = userSlice.actions
export default userSlice.reducer
