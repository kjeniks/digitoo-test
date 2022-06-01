const el = {
    uploadButton: 'a[href="/o484/q1008/import"]',
    table : 'thead.MuiTableHead-root'
}

export function uploadInvoice() {
    cy.get(el.uploadButton).click()
}

export function checkUploadedFile() {
    cy.get(el.table).should('be.visible')
}