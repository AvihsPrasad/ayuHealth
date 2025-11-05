import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRole, setDbReduxUser } from '@/redux/userSlice'
// import { getUserByEmail } from '@/db/queries'
import { RootState } from '@/redux/store'

export function useFetchUserRole(categoriesDb?: any) {
  const { user, isLoaded } = useUser()
  const dispatch = useDispatch()

  const hospitalId = useSelector((state: RootState) => state.user.hospitalId)
  // console.log(hospitalId)

  useEffect(() => {
    if (isLoaded && user && categoriesDb && categoriesDb.length > 0) {
      const userData = categoriesDb[0];
      dispatch(setDbReduxUser({
        userId: user.id,
        userdbId: userData.id || '',
        userName: user.username || '',
        firstName: userData.first_name || '',
        lastName: userData.last_name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        license: userData.licence || '',
        bio: '',
        exp: '',
        education: '',
        awards: '',
        website: '',
        linkedIn: '',
        facebook: '',
        instagram: '',
        address: userData.address || '',
        country: userData.country || '',
        state: userData.state || '',
        city: userData.city || '',
        zip: userData.zip || '',
        hospitalId: '',
        role: 'admin',
        isCollapsed: false
      }));
    } else if (isLoaded && user) {
      const fetchUser = async () => {
        try {
          const dbUser = {user_id: user.id, name: user?.username + '', hospital_id: hospitalId, role: 'admin'}
          if (dbUser) {
            dispatch(setDbReduxUser({
              userId: dbUser.user_id,
              userdbId: '',
              userName: dbUser.name,
              firstName: dbUser.name.split(' ')[0],
              lastName: dbUser.name.split(' ').slice(1).join(' ') || '',
              email: user.primaryEmailAddress?.emailAddress || '',
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
              hospitalId: dbUser.hospital_id || [],
              role: dbUser.role,
              isCollapsed: false,
            }))
          } else {
            // If no user in DB, set default role
            dispatch(setRole('admin'))
          }
        } catch (error) {
          console.error('Error fetching user role:', error)
          // On error, set default role
          dispatch(setRole('admin'))
        }
      }
      fetchUser()
    }
  }, [user, isLoaded, dispatch, categoriesDb])
}
