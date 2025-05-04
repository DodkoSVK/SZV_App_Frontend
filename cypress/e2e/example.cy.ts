describe('Domovská stránka', () => {
    it('načíta sa bez chyby', () => {
      cy.visit('/')
      cy.contains('Color Tokens Demo')
    })
  })
  