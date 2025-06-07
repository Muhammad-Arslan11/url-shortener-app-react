import React, {createContext, useContext, useEffect} from 'react';
import useFetch from './hooks/useFetch';
import { getUserSession } from '../db/apiAuth';

const Context = createContext();

function UrlContext({children}) {
   const {data: user, loading, fn: fetchUser} = useFetch(getUserSession);

   const isAuthenticated = user?.role === "authenticated";

   useEffect(()=>{
    fetchUser();
   }, [])

  return <Context.Provider value={{user, fetchUser, loading, isAuthenticated}}>
    {children}
  </Context.Provider>
  }

export const useUrlState = ()=>{
    return useContext(Context);
}

export default UrlContext