const el = {
    loginInput: '[data-testid="auth-login-form-email"]',
    passInput: '[data-testid="auth-login-form-password"]',
    submitButton: '[data-testid="auth-login-form-submit"]'
}

export function login(user) {
    cy.url().should('include', 'login')
    cy.get(el.loginInput).type(user.mail)
    cy.get(el.passInput).type(user.password)
    cy.get(el.submitButton).click()
}