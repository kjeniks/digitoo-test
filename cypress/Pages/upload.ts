const el = {
    uploadInput: 'input#fileInput',
    uploadButton: 'button[type="submit"]'
}

export function addFile(file) {
    cy.get(el.uploadInput).attachFile(file)
    cy.get('table').contains(file, { timeout: 60000 })
    cy.get(el.uploadButton).click()
}