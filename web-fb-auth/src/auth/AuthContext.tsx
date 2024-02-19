'use client'
import React, {
  useContext, 
  useEffect, 
  useRef, 
  type PropsWithChildren
 } from 'react'
 
 import type AuthService from './AuthService'
 import AuthServiceImpl from './AuthServiceImpl'
 
 const AuthServiceContext = React.createContext<AuthService | undefined>(undefined) 
 
 export const useAuthService = (): AuthService =>  {
     useContext(AuthServiceContext) as AuthService
 }
 
 export const AuthServiceProvider: React.FC<PropsWithChildren> = ({ children }) => {
   
   const serviceRef = useRef<AuthServiceImpl | undefined>(undefined)
 
   useEffect(() => {

      if (!serviceRef.current) {
        serviceRef.current = new AuthServiceImpl()
      }
     // Anything in here is fired on component mount.
     return () => {
         // Anything in here is fired on component unmount.
         serviceRef.current?.disposer()
     }
   }, [])
   
   return (
     <AuthServiceContext.Provider value={serviceRef.current}>
       {children}
     </AuthServiceContext.Provider>
   )
 }
 