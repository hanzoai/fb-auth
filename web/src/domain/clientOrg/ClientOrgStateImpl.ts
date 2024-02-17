import {
  action,
  makeObservable, 
  observable, 
  reaction, 
} from 'mobx'

import { firestore } from '~/service/firebase'

import type { ClientOrg } from '@hanzo/fb-auth-shared/types'
import { COLLECTIONS } from '@hanzo/fb-auth-shared'
import { errorToString } from '@hanzo/fb-auth-shared/util'
import { datetimeToDateWeb } from '~/util'

import type ClientOrgState from './ClientOrgState'

class ClientOrgStateImpl implements ClientOrgState {

  clientOrgName: string = ''
  testMode: boolean = true
  clientOrg: ClientOrg | undefined = undefined
  clientOrgLoading: boolean = false
  clientOrgErrorString: string = ''
  disposers: (() => void)[] = []

  constructor() {
    makeObservable(this, {
      clientOrgName: observable,
      testMode: observable,
      clientOrgLoading: observable,
      clientOrgErrorString: observable,
      setClientOrgName: action,
      setTestMode: action
    })
    this.disposers.push( reaction( 
      () => (this.clientOrgName),
      async (name) => {
        if (name) {
          try {
            this.clientOrgLoading = true
            this.clientOrg = await this._fetchClientOrg(name)  
          }
          catch (e) {
            this.clientOrgErrorString = errorToString(e)
            this.clientOrg = undefined 
          }
          finally {
            this.clientOrgLoading = false
          }
        }
        else {
          this.clientOrg = undefined  
        }
      }
    ))
  }

  public setClientOrgName(n: string): void {
    this.clientOrgName = n
  }

  public setTestMode(b: boolean): void {
    this.testMode = b
  }

  private async _fetchClientOrg(name: string): Promise<ClientOrg> {

    return new Promise<ClientOrg>(async (resolve, reject) => {
      try {
        const doc = await firestore
          .collection(COLLECTIONS.CLIENT_ORGS)
          .doc(name)
          .get()

        const result = doc.data() as ClientOrg
        if (result.created) {
          result.created = datetimeToDateWeb(result.created!)
        }
        if (result.updated) {
          result.updated = datetimeToDateWeb(result.updated!)
        }
        resolve(result)
      }
      catch (e) {
        reject(errorToString(e))
      }
    })
  }

  public disposer(): void {
    this.disposers.forEach((d) => {d()})
  }
}

export default ClientOrgStateImpl