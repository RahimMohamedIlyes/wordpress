/** Don't delete this file */
Cypress.Commands.add('createHeader', () => {
  cy.visit(Cypress.env('newHeader'))
  cy.window().then((win) => {
    cy.route('POST', win.vcvAdminAjaxUrl).as('loadContentRequest')
  })
  cy.wait('@loadContentRequest')
})

Cypress.Commands.add('createFooter', () => {
  cy.visit(Cypress.env('newFooter'))
  cy.window().then((win) => {
    cy.route('POST', win.vcvAdminAjaxUrl).as('loadContentRequest')
  })
  cy.wait('@loadContentRequest')
})
