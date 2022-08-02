describe('supplier flow', () => {

    let cookie

    beforeEach('parse token from HTML', function () {

        cy.request('https://test.keysourcingtool.com/users/sign_in')
            .its('body')
            .then((body) => {

                // using Cypress.$ to parse the string body

                const $html = Cypress.$(body)
                const csrf = $html.find('input[name="authenticity_token"]').val()

                cy.request('POST', 'https://test.keysourcingtool.com/users/sign_in', {
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


    it('checking page', function () {

        //open start page

        cy.visit('https://test.keysourcingtool.com/')

        //validating page layouts

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

        cy.get("input[class=\" string email required \"]")
            .type('udilis38@gmail.com');
        cy.get("input[class=\" password optional \"]")
            .type('qwerty')
        cy.get('label[class="checkbox"]')
            .click()
        cy.get('input[value="Logga in"]')
            .click()

    })

    it('validating page main layouts', function () {
        cy.get('a[class="navbar-brand"]')
            .should('contain', 'KeySourcingTool')
        cy.get("footer")
            .find(".box")
            .should('contain', 'support@keysourcingtool.com')
        cy.get("footer")
            .find(".col-md-4")
            .should("contain", 'sales@keysourcingtool.com')
            .parent()
            .find('address')
            .should('contain.text', 'KeySourcingTool, Kungsgatan 44, 4 tr, 111 35 Stockholm, Sweden')
        cy.get('div[class="version"]')
            .should("contain", 'Version')
    });


    it('checking dashboard contains', function () {

        //validating Requests received section

        cy.get('#tender_invite_part')
            .find('li')
            .should(($lis) => {
                expect($lis).to.have.length(5)
                expect($lis.eq(0)).to.contain('COPY: Testförfrågan publik')
                expect($lis.eq(1)).to.contain('COPY: Test')
                expect($lis.eq(2)).to.contain('COPY: Ekonom')
                expect($lis.eq(3)).to.contain('Ekonom')
                expect($lis.eq(4)).to.contain('TEST')
            })

        //validating Tenders received section

        cy.get('#tender_part')
            .find('li')
            .should(($lis) => {
                expect($lis).to.have.length(5)
                expect($lis.eq(0)).to.contain('2022')
                expect($lis.eq(1)).to.contain('2022')
                expect($lis.eq(2)).to.contain('2022')
                expect($lis.eq(3)).to.contain('2022')
                expect($lis.eq(4)).to.contain('2022')
            })

        //validating Agreements to attest section

        cy.get('#agreements_to_attest')
            .find('li')
            .should(($lis) => {
                expect($lis).to.have.length(2)
                expect($lis.eq(0)).to.contain('test')
                expect($lis.eq(1)).to.contain('test')
            })

    });

        it('validating page header', function () {
            cy.get('ul[class="nav navbar-nav"]')
                .parent()
                .should(($lis) => {
                    expect($lis).to.have.length(6)
                    expect($lis.eq(0)).to.contain('tender_invites')
                    expect($lis.eq(1)).to.contain('tenders')
                    expect($lis.eq(2)).to.contain('main_contracts')
                    expect($lis.eq(3)).to.contain('document')
                    expect($lis.eq(4)).to.contain('statistics')
                    expect($lis.eq(5)).to.contain('evaluation_reports')
                })
                .find('tender_invites')
                .parent()
                .should(($lis) => {
                    expect($lis).to.have.length(4)
                    expect($lis.eq(0)).to.contain('2022')
                    expect($lis.eq(1)).to.contain('2022')
                    expect($lis.eq(2)).to.contain('2022')
                    expect($lis.eq(3)).to.contain('2022')
                })
        })
})


