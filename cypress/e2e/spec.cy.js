describe('Test the email format', () => {
  it('Test the email format', () => {
      cy.visit('http://127.0.0.1:5500/index.html')
      cy.get('input[type="email"]').type('rach.mug@thejitu.com')
})

it('Test new members provide ther cohort number', () => {
  cy.visit('http://127.0.0.1:5500/index.html')
  cy.get('input[type="number"]').type('12')
})

})