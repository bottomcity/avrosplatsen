describe("key sourcing tool e2e registration page", () => {

    let csrf;


    beforeEach('parse token from HTML', function () {


        cy.request('https://test.keysourcingtool.com/')
            .its('body')
            .then((body) => {

                // using Cypress.$ to parse the string body

                const $html = Cypress.$(body)
                const csrf = $html.find('input[name="authenticity_token"]').val()

                cy.request('POST', 'https://test.keysourcingtool.com/users/sign_in', {
                    'utf8' : "✓",
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
    })

            it('should check log in page', function () {
                cy.visit('https://test.keysourcingtool.com/')
                cy.get("input[placeholder=\"user@domain.com\"]")
                    .type('udilis38@gmail.com');
                cy.get("input[id=\"user_password\"]")
                    .type('Asdqwe123!')

                cy.get('label[class="checkbox"]')
                    .click()
                    .wait(100)
                    .click();

                cy.contains('Lösenord')
                cy.get('a[class="navbar-brand"]')
                    .should('contain', 'KeySourcingTool')
                cy.get("footer")
                    .find(".box")
                    .should('contain.text', 'support', 'kontakt')
                cy.get('a[href="mailto:support@keysourcingtool.com?subject=Support%20av%20KeySourcingTool"]')
                    .should('contain', 'support@keysourcingtool.com')
                cy.get("a[href=\"mailto:sales@keysourcingtool.com?subject=F%C3%B6rs%C3%A4ljningsfr%C3%A5gor%20av%20KeySourcingTool\"]")
                    .should("contain", 'sales@keysourcingtool.com')
                cy.get('address')
                    .should('contain.text', 'KeySourcingTool, Kungsgatan 44, 4 tr, 111 35 Stockholm, Sweden')
                cy.get('div[class="version"]')
                    .should("contain", 'Version')
                    .wait(500)
            });

            it('should open registration page', function () {

                cy.get('a:contains("Skapa")')
                    .click({force: true, multiple: true})
                cy.url()
                    .should('include', 'sign_up')
                    .wait(500)
            });


            it('should fill the registration form', () => {


                cy.get('a[class="navbar-brand"]')
                    .should('contain', 'KeySourcingTool')
                cy.get("footer")
                    .find(".box")
                    .should('contain.text', 'support', 'kontakt')
                cy.get('a[href="mailto:support@keysourcingtool.com?subject=Support%20av%20KeySourcingTool"]')
                    .should('contain', 'support@keysourcingtool.com')
                cy.get("a[href=\"mailto:sales@keysourcingtool.com?subject=F%C3%B6rs%C3%A4ljningsfr%C3%A5gor%20av%20KeySourcingTool\"]")
                    .should("contain", 'sales@keysourcingtool.com')
                cy.get('address')
                    .should('contain.text', 'KeySourcingTool, Kungsgatan 44, 4 tr, 111 35 Stockholm, Sweden')
                cy.get('div[class="version"]')
                    .should("contain", 'Version')


                cy.get('input[id="user_firstname"]')
                    .type('Alex')
                    .should("contain.value", "Alex")
                cy.get('input[id="user_lastname"]')
                    .type('Testqa')
                    .should("contain.value", "Testqa")
                cy.get('input[id="user_email"]')
                    .type('udilis38+12@gmail.com')
                    .should("contain.value", 'udilis38+12@gmail.com')
                cy.get('input[id="user_password"]')
                    .type('asdqwe')
                    .should('not.contain.text')
                cy.get("input[id=\"user_password_confirmation\"]")
                    .type('asdqwe')
                    .should('not.contain.text')
                cy.get("input[id=\"user_terms_of_service\"]")
                    .click()

                cy.contains('Spara')
                    .click()
                    .wait(2000)

                cy.url()
                    .should("include", 'users')
            })
        })
