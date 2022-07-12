describe('supplier flow', () =>{
    beforeEach(() => {

        // seed a user in the DB that we can control from our tests
        // assuming it generates a random password for us
        cy.request('POST', '/users/sign_in', { username: 'udilis38@gmail.com' })
            .its('body')
            .as('currentUser')
    })
    it('should open edit users info page', function () {
        cy.visit('https://test.keysourcingtool.com/')
        cy.get("input[placeholder=\"user@domain.com\"]")
            .type('udilis38@gmail.com');
        cy.get("input[id=\"user_password\"]")
            .type('Asdqwe123!')
        cy.get('label[class="checkbox"]')
            .click()
        cy.get('input[value="Logga in"]')
            .click({force: true})
        cy.getCookie('_cat_session').should('exist')
    });
})