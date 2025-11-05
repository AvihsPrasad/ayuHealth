import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  userId: string
  userdbId: string
  userName: string
  firstName: string
  lastName: string
  email: string
  phone: string
  license: string
  bio: string
  exp: string
  education: string
  awards: string
  website: string
  linkedIn: string
  facebook: string
  instagram: string
  address: string
  country: string
  state: string
  city: string
  zip: string
  hospitalId: any[]
  active_hospital: { id: string; name: string }
  role: string
  isCollapsed: boolean
}

const initialState: UserState = {
  userId: '',
  userdbId: '',
  userName: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  license: '',
  bio: '',
  exp: '',
  education: '',
  awards: '',
  website: '',
  linkedIn: '',
  facebook: '',
  instagram: '',
  address: '',
  country: '',
  state: '',
  city: '',
  zip: '',
  hospitalId: [],
  active_hospital: { id: '', name: '' },
  role: 'admin',
  isCollapsed: false
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
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload
    },
    setLicense: (state, action: PayloadAction<string>) => {
      state.license = action.payload
    },
    setBio: (state, action: PayloadAction<string>) => {
      state.bio = action.payload
    },
    setExp: (state, action: PayloadAction<string>) => {
      state.exp = action.payload
    },
    setEducation: (state, action: PayloadAction<string>) => {
      state.education = action.payload
    },
    setAwards: (state, action: PayloadAction<string>) => {
      state.awards = action.payload
    },
    setWebsite: (state, action: PayloadAction<string>) => {
      state.website = action.payload
    },
    setLinkedIn: (state, action: PayloadAction<string>) => {
      state.linkedIn = action.payload
    },
    setFacebook: (state, action: PayloadAction<string>) => {
      state.facebook = action.payload
    },
    setInstagram: (state, action: PayloadAction<string>) => {
      state.instagram = action.payload
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload
    },
    setCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload
    },
    setState: (state, action: PayloadAction<string>) => {
      state.state = action.payload
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload
    },
    setZip: (state, action: PayloadAction<string>) => {
      state.zip = action.payload
    },
    setHospitalId: (state, action: PayloadAction<any[]>) => {
      state.hospitalId = action.payload
    },
    setActiveHospital: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.active_hospital = action.payload
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload
    },
    setDbReduxUser: (state, action: PayloadAction<UserState>) => {
      state.userId = action.payload.userId
      state.userdbId = action.payload.userdbId || ''
      state.userName = action.payload.userName
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.email = action.payload.email
      state.phone = action.payload.phone
      state.license = action.payload.license
      state.bio = action.payload.bio
      state.exp = action.payload.exp
      state.education = action.payload.education
      state.awards = action.payload.awards
      state.website = action.payload.website
      state.linkedIn = action.payload.linkedIn
      state.facebook = action.payload.facebook
      state.instagram = action.payload.instagram
      state.address = action.payload.address
      state.country = action.payload.country
      state.state = action.payload.state
      state.city = action.payload.city
      state.zip = action.payload.zip
      state.hospitalId = action.payload.hospitalId
      state.active_hospital = action.payload.active_hospital || { id: '', name: '' }
      state.role = action.payload.role
      state.isCollapsed = action.payload.isCollapsed
    },
    setIsCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isCollapsed = action.payload
    }
  },
})

export const { setUserId, setUserName, setFirstName, setLastName, setEmail, setPhone, setLicense, setBio, setExp, setEducation, setAwards, setWebsite, setLinkedIn, setFacebook, setInstagram, setAddress, setCountry, setState, setCity, setZip, setHospitalId, setActiveHospital, setRole, setDbReduxUser, setIsCollapsed } = userSlice.actions
export default userSlice.reducer
