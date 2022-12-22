describe('Register', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  beforeEach('Register as Patient', () => {
    cy.visit('http://localhost/Hospital-Management-System/')

    cy.get('.dropdown-item')
    .eq(1)
    .should('contain','SignUp as Patient')
    .click({force: true})
  })
  it('Test 1 : form benar semua', () =>{
    cy.get('[name="name"]').type('jud')
    cy.get('[name="dob"]').type('2022-12-17')
    cy.get('[name="mail"]').type('jud@patient.com')
    cy.get('[name="uname"]').type('jud')
    cy.get('[name="pass"]').type('jud')
    cy.get('[name="repass"]').type('jud')
    cy.get('[name="submit"]').click()
    cy.url().should('include', '/index.html')
  })
  it('Test 2 : form salah username', () =>{
    cy.get('[name="name"]').type('jud')
    cy.get('[name="dob"]').type('2022-12-17')
    cy.get('[name="mail"]').type('jud@patient.com')
    cy.get('[name="pass"]').type('jud')
    cy.get('[name="repass"]').type('jud')
    cy.get('[name="submit"]').click()
    cy.get('[name="uname"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
    })
    cy.url().should('include', '/signup%20as%20patient.html')
  })
  it('Test 3 : form salah password', () =>{
    cy.get('[name="name"]').type('jud')
    cy.get('[name="dob"]').type('2022-12-17')
    cy.get('[name="mail"]').type('jud@patient.com')
    cy.get('[name="uname"]').type('jud')
    cy.get('[name="pass"]').type('jud')
    cy.get('[name="repass"]').type('duj')
    cy.get('[name="submit"]').click()
    cy.on('window:alert',function(AlertText){
      expect(AlertText).eql('Password Does Not Match,Please Try Again')
    })
    cy.url().should('include', '/signup%20as%20patient.html')
  })
})