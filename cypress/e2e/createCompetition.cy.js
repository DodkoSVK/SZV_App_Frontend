describe('Create a new competition', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Nacitanie HomePage', () => {
        cy.contains('Color Tokens Demo')

        cy.get('[data-cy="nav-competitions"]')
            .click()
        
        cy.get('[data-cy="create-comp"]')
            .click()
        
        cy.get('[data-cy="comp-league"] > .inline-flex')
            .click()

        cy.get('#radix-«rg»')
            .type("2. Liga{enter}")
            .should('have.value', "2. Liga")

        cy.get('[data-cy="comp-round"]')
            .clear()
            .type(2)
                    
        cy.get('[data-cy="comp-date"]').as('DateElement')
            .click()
        
        cy.get(':nth-child(1) > :nth-child(6) > .rdp-button_reset')
            .click()
            
        cy.get('@DateElement')
            .click()

        cy.get('[data-cy="group-name"]').as('GroupName')
            .click()
            .type("Východ")
        
        cy.get('@GroupName')
            .should('have.value',"Východ")

        cy.get('[data-cy="group-club"]')
            .click()
            .type("MKVaSŠ Koš")
            .should('have.value', "MKVaSŠ Košice")

        
    })
})