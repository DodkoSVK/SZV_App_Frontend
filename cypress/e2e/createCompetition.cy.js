describe('Create a new competition', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Nacitanie rounds', () => {
        cy.contains('Color Tokens Demo')

        cy.get('[data-cy="nav-competitions"]')
            .click()
        
        cy.get('[data-cy="create-comp"]')
            .click()
        
        cy.get('[data-cy="comp-league"] > .inline-flex')
            .click()

        cy.get('#radix-«rg»').as('League')
            .type("2. Liga{enter}")            
            
        cy.get('@League')
            .should('have.value', "2. Liga")

        cy.get('#«r7»-form-item').as('Round')
            .clear()
            .type(2)
        
        cy.get('@Round')
            .should('have.value', 2)

        cy.get('#«r8»-form-item').as('DateElement')        
            .click()

        cy.get(':nth-child(1) > :nth-child(6) > .rdp-button_reset')
            .click()

        cy.get('@DateElement')
            .click()
            .invoke('text')
            .invoke('trim')
            .should('eq', '3. 5. 2025')  
    /*    
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
        

        cy.get('[data-cy="group-club"]')
            .click()
            .type("MKVaSŠ Košice{enter}")
            .should('have.value', "2. Liga") */
        
            
        
    })
})