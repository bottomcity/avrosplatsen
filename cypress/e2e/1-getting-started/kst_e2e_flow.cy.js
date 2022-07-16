describe("key sourcing tool e2e log in flow", () => {

    it('parse token from HTML', function () {


        cy.request('https://test.keysourcingtool.com/')
            .its('body')
            .then((body) => {

                // using Cypress.$ to parse the string body

                const $html = Cypress.$(body)
                const csrf = $html.find('input[name="authenticity_token"]').val()

                cy.request('POST', 'https://test.keysourcingtool.com/users/', {
                    'utf8': "✓",
                    'authenticity_token': csrf,
                    'user[firstname]': '',
                    'user[lastname]': '',
                    'user[email]': '',
                    'user[password]': '',
                    'user[password_confirmation]': '',
                    'user[terms_of_service]': '',
                    'user[locale]': '',
                    'commit': "Spara"
                })
                    .its('body')
            })


        it('should check log in page', function () {
            cy.visit('https://test.keysourcingtool.com/')
            cy.setCookie('expire', 'hour')
            cy.get("input[placeholder=\"user@domain.com\"]")
                .type('udilis38@gmail.com');
            cy.get("input[id=\"user_password\"]")
                .type('Asdqwe123!')
            cy.get('label[class="checkbox"]')
                .click()
            cy.get('input[value="Logga in"]')
                .click({force: true})
        })
    })
})