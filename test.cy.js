//test if the email is in this format:  fname.lname@thejitu.com using cypress

describe('Test the email format', () => {
    it('Test the email format', () => {
        cy.visit('http://127.0.0.1:5500/index.html')
        cy.get('a[href="/email"]').click()
        cy.get('input[type="email"]').type('rach.mug@thejitu.com')

        expect('input[type="email"]').to.have.value('
})
})