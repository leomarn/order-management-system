import app from '../main/config/app'
import { awaitingEntries } from '../main/order_management_system'
import { msgOptions } from './msg-options'

export const exec = (msg: string, callback: any): void => {
  if (msg === msgOptions.TEXT_RETURN) {
    callback()
    tryEntries(msg)
  } else {
    console.log(`${msg}`)
    callback()
  } 
}

function tryEntries(msg: string): void {
  app.question(msg, (input: string) => {
    if (input.toLocaleLowerCase() === 'sair') {
      awaitingEntries();
    } else {
      console.log(msgOptions.TEXT_INVALID_ENTRY)
      tryEntries(msgOptions.TEXT_TRY)
    }
  })
}