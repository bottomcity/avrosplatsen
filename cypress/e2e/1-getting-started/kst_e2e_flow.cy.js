describe("key sourcing tool e2e registration page", () => {
    it('should check log in page', function () {
        cy.visit('https://test.keysourcingtool.com/')
        cy.setCookie('expire','hour')
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