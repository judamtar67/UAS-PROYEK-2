describe('feedback', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  beforeEach('Masuk dashboard', () => {
    cy.visit('http://localhost/Hospital-Management-System/')
  })
  it('Test 1 : nama dan feedback benar', () => {
    cy.get('[name="name"]').type('jud')
    cy.get('[name="feedback"]').type('saya sembuh')
    cy.get('[type="submit"]').click()
    cy.on('window:alert',function(AlertText){
      expect(AlertText).eql('thank for your feedback')
    })
  })
  it('Test 2 : nama salah', () => {
    cy.get('[name="feedback"]').type('saya sembuh')
    cy.get('[type="submit"]').click()
    cy.get('[name="name"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
    })
  })
  it('Test 3 : feedback salah', () => {
    cy.get('[name="name"]').type('jud')
    cy.get('[type="submit"]').click()
    cy.get('[name="feedback"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
    })
  })
  it('Test 4 : nama dan feedback salah', () => {
    cy.get('[type="submit"]').click()
    cy.get('[name="name"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
    })
  })
})