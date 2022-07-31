describe('supplier flow', () => {
    let cookie

    it('saving cookie', function () {

        cy.session(cookie,

            () => {
                cy.request('/users/sign_in')
                    .its('body')
                    .then((body) => {

                        // using Cypress.$ to parse the string body

                        const $html = Cypress.$(body)
                        const csrf = $html.find('input[name="authenticity_token"]').val()

                        cy.request('POST', '/users/sign_in', {
                            'utf8': "✓",
                            'authenticity_token': csrf,
                            'user[email]': 'udilis38@gmail.com',
                            'user[password]': 'qwerty',
                            'user[remember_me]': "0",
                            'commit': "Logga+in"
                        })
                    })
                    .its('body')
                cy.getCookie('_cat_session')
                    .should('exist')
                    .then((c) => {

                        // save cookie until need it

                        cookie = c
                    })
            })


        it('fill the form', function () {
            cy.visit('/')

            cy.get("input[class=\" string email required \"]")
                .type('udilis38@gmail.com');
            cy.get("input[class=\" password optional \"]")
                .type('qwerty')
            cy.get('label[class="checkbox"]')
                .click()

        })

        it('click log in', function () {

            // send correct request
            cy.get('input[value="Logga in"]')
                .click()
                .then(() => {
                    cy.request({
                        url: '/users/sign_in',
                        headers: {
                            'Cookie': cookie.value,
                        },
                    })
                })
        })
    })

})

