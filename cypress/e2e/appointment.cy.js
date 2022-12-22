describe('appointment', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  beforeEach('login sebagai pasien', () => {
    cy.visit('http://localhost/Hospital-Management-System/')

    cy.get('.dropdown-item')
    .eq(3)
    .should('contain','LogIn as Patient')
    .click({force: true})

    cy.get('[name="uname"]').type('jud')
    cy.get('[name="pass"]').type('jud')
    cy.get('[name="submit"]').click()
  })
  it('Test 1 : form benar semua', () => {
    cy.get('[name="date"]').type('2023-01-12')
    cy.get('[name="username"]').clear().type('jud')
    cy.get('.doctor_list').select('jud')
    cy.get('[name="time"]').eq(0).click()
    cy.get('[name="disease"]').eq(0).click()
    cy.get('[name="submit"]').click()
    cy.on('window:alert',function(AlertText){
      expect(AlertText).eql('successfully completed')
    })
  })
  it('Test 2 : form salah tanggal', () => {
    cy.get('[name="username"]').clear().type('jud')
    cy.get('.doctor_list').select('jud')
    cy.get('[name="time"]').eq(0).click()
    cy.get('[name="disease"]').eq(0).click()
    cy.get('[name="submit"]').click()
    cy.get('[name="date"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
    })
  })
  it('Test 3 : form salah username', () => {
    cy.get('[name="date"]').type('2023-01-12')
    cy.get('[name="username"]').clear()
    cy.get('.doctor_list').select('jud')
    cy.get('[name="time"]').eq(0).click()
    cy.get('[name="disease"]').eq(0).click()
    cy.get('[name="submit"]').click()
    cy.get('[name="username"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
    })
  })
  it('Test 4 : form salah waktu janji', () => {
    cy.get('[name="date"]').type('2023-01-12')
    cy.get('[name="username"]').clear().type('jud')
    cy.get('.doctor_list').select('jud')
    cy.get('[name="disease"]').eq(0).click()
    cy.get('[name="submit"]').click()
    cy.get('[name="time"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please select one of these options.')
    })
  })
  it('Test 5 : form salah penyakit', () => {
    cy.get('[name="date"]').type('2023-01-12')
    cy.get('[name="username"]').clear().type('jud')
    cy.get('.doctor_list').select('jud')
    cy.get('[name="time"]').eq(0).click()
    cy.get('[name="submit"]').click()
    cy.get('[name="disease"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please select one of these options.')
    })
  })
  it('Test 6 : form salah semua', () => {
    cy.get('[name="username"]').clear()
    cy.get('.doctor_list').select('jud')
    cy.get('[name="submit"]').click()
    cy.get('[name="username"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
    })
  })
})