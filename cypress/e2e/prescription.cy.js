describe('Prescription', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  beforeEach('login as Doctor', () => {
    cy.visit('http://localhost/Hospital-Management-System/')

    cy.get('.dropdown-item')
    .eq(2)
    .should('contain','LogIn as Doctor')
    .click({force: true})

    cy.get('[name="uname"]').type('jud')
    cy.get('[name="pass"]').type('jud')
    cy.get('[name="submit"]').click()
  })
  it('Test 1 : form benar semua', () => {
    cy.get('[name="username"]').type('jud')
    cy.get('[name="prescription"]').selectFile('assets/images/lab.jpg')
    cy.get('[name="upload"]').click()
    cy.on('window:alert',function(AlertText){
      expect(AlertText).eql('Prescription uploaded successfully')
    })
  })
  it('Test 2 : form salah username', () => {
    cy.get('[name="prescription"]').selectFile('assets/images/lab.jpg')
    cy.get('[name="upload"]').click()
    cy.get('[name="username"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
    })
  })
  it('Test 3 : form salah prescription', () => {
    cy.get('[name="username"]').type('jud')
    cy.get('[name="upload"]').click()
    cy.get('[name="prescription"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please select a file.')
    })
  })
  it('Test 4 : form salah semua', () => {
    cy.get('[name="upload"]').click()
    cy.get('[name="username"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
    })
  })
})