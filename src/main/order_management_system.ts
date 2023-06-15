import { msgOptions } from '../utils'
import app from './config/app'
import { executeOptions } from './routes/order'

const optionsMessage: string = `
OPÇÕES:
1 - CREATE ORDER or ADD ORDER ITEM or REMOVE ORDER ITEM or CHECKOUT ORDER
2 - LIST ORDERS
3 - LIST PRODUCTS

Digite a entrada (ou "sair" para encerrar): `

export const awaitingEntries = (): void => {
  app.question(optionsMessage, (input: string) => {
    if (input.toLowerCase() === 'sair') {
      app.close()
    } else {
      const option = parseInt(input)

      if (isNaN(option)) {
        console.log(msgOptions.TEXT_INVALID_ENTRY)
        awaitingEntries()
      } else {
        executeOptions(option)
        awaitingEntries()
      }
    }
  })
}

export const startApplication = ((): void => {
  awaitingEntries()
})()


