describe('Sample Test', () => {
    it('should do something', () => {
        cy.visit('http://localhost/');
        cy.url().should('include', '/login');

        cy.get('#email').type('admin');
        cy.get('#password').type('admin');
        
        cy.get('.btn').click();
        cy.wait(1000);

        cy.url().should('include', '/admin');
    })
})