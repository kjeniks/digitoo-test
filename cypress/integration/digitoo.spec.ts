import { login } from "@pages/login"
import * as dashboard from "@pages/dashboard"
import * as upload from "@pages/upload"
import { mainUser } from "@constants/users"

let invoiceNumber: string

describe('Duplicity', () => {

  it('Login and test duplicity of an Invoice', () => {
    cy.visit('/login')
    login(mainUser)

    const document = [
      'invoice1.pdf',
      'invoice2.pdf',
    ]
    // Can't be use now, as the AI is blocking the cypress upload -> upload works, but AI doesnt get it and wants to do manual check of the Invoice
    /*
    document.forEach(element => {
        dashboard.uploadInvoice() 
        upload.addFile(element)
    });
    */

    cy.get('[data-testid="annotation-list-table-tab-none"]').click()
    cy.url().should('include', 'list')
    cy.get('.InvoiceListGridWrapper').within(() => {
      cy.get('tr').eq(1).find('td').eq(5).then((invoiceNumberData) => {
        invoiceNumber = invoiceNumberData.text()
      })
    })
    cy.then(() => {
      cy.log('InvoiceNumberIs: ' + invoiceNumber)
      cy.get('[placeholder="Vyhledat..."]').type(invoiceNumber + '{enter}')
      cy.url().should('include', 'search')
      cy.get('tr').should('have.length.above', 2)
    })
  })
})

