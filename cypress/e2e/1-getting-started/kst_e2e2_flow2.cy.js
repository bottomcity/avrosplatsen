describe('supplier flow', () => {
    it('parse token from HTML', function () {


        cy.request('https://test.keysourcingtool.com/')
            .its('body')
            .then((body) => {

                // using Cypress.$ to parse the string body

                const $html = Cypress.$(body)
                const csrf = $html.find('input[name="authenticity_token"]').val()

                cy.request('POST', 'https://test.keysourcingtool.com/users/sign_in', {
                    'utf8': "✓",
                    'authenticity_token': csrf,
                    'user[email]': 'udilis38@gmail.com',
                    'user[password]': 'Asdqwe123!',
                    'user[remember_me]': "0",
                    'commit': "Logga+in"
                })
                    .its('body')
            })
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