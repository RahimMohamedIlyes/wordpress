/* global describe, it, cy */

describe('pageScopeTest', function () {
  it('Uses php-e2e-actions to load page with template widget and shortcode', function () {
    cy.visit('/wp-content/plugins/' + Cypress.env('dataPlugin').replace('/plugin-wordpress.php', '') + '/tests/php-e2e-actions/init.php/?php-e2e=1&php-e2e-action=test-templateWidget-create-globalTemplate-with-shortcode')
    cy.get('.global-template-title')
      .should('contain', 'test-templateWidget-create-globalTemplate-with-shortcode-page-title')

    // Clean the DB:
    cy.visit('/wp-content/plugins/' + Cypress.env('dataPlugin').replace('/plugin-wordpress.php', '') + '/tests/php-e2e-actions/init.php/?php-e2e=1&php-e2e-action=clean-e2e-posts-db')
    // Make sure DB clean was success
    cy.window().then((window) => {
      expect('Done').to.equal(window.document.body.textContent)
    })
  })
})
