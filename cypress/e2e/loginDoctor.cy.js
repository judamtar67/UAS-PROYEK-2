describe('Login', () => {
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
  })
  it('Test 1 : username dan password benar', () =>{
    cy.get('[name="uname"]').type('jud')
    cy.get('[name="pass"]').type('jud')
    cy.get('[name="submit"]').click()
    cy.wait(2000)
    cy.url().should('include', '/admin%20dashboard.php')
  })
  it('Test 2 : username salah', () =>{
    cy.get('[name="uname"]').type('duj')
    cy.get('[name="pass"]').type('jud')
    cy.get('[name="submit"]').click()
    cy.wait(2000)
    cy.on('window:alert',function(AlertText){
      expect(AlertText).eql('Invalid Username or Password')
    })
    cy.url().should('include', '/login%20as%20doctor.html')
  })
  it('Test 3 : password salah', () =>{
    cy.get('[name="uname"]').type('jud')
    cy.get('[name="pass"]').type('duj')
    cy.get('[name="submit"]').click()
    cy.wait(2000)
    cy.on('window:alert',function(AlertText){
      expect(AlertText).eql('Invalid Username or Password')
    })
    cy.url().should('include', '/login%20as%20doctor.html')
  })
  it('Test 4 : username dan password salah', () =>{
    cy.get('[name="uname"]').type('duj')
    cy.get('[name="pass"]').type('duj')
    cy.get('[name="submit"]').click()
    cy.on('window:alert',function(AlertText){
      expect(AlertText).eql('Invalid Username or Password')
    })
    cy.url().should('include', '/login%20as%20doctor.html')
  })
})