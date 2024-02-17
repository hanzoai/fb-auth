import React, {
 useContext, 
 useEffect, 
 useRef, 
 type PropsWithChildren
} from 'react'

import type ClientOrgState from './ClientOrgState'
import ClientOrgStateImpl from './ClientOrgStateImpl'

const ClientOrgStateContext = React.createContext<ClientOrgState | undefined>(undefined) 

export const useClientOrgState = (): ClientOrgState =>  {
  return useContext(ClientOrgStateContext) as ClientOrgState
}

export const ClientOrgStateProvider: React.FC<PropsWithChildren> = ({ children }) => {
  
  const serviceRef = useRef<ClientOrgStateImpl>(new ClientOrgStateImpl())

  useEffect(() => {
    // Anything in here is fired on component mount.
    return () => {
        // Anything in here is fired on component unmount.
        serviceRef.current.disposer()
    }
  }, [])
  
  return (
    <ClientOrgStateContext.Provider value={serviceRef.current}>
      {children}
    </ClientOrgStateContext.Provider>
  )
}
