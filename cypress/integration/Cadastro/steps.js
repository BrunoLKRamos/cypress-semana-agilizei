/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

When(/^informar os meus dados$/, () => {
    cy.get('input[placeholder="First Name"]').type(chance.first());
    cy.get('input[ng-model^="Last"]').type(chance.last());
    cy.get('input[ng-model^="Email"]').type(chance.email());
    cy.get('input[ng-model^="Phone"]').type(chance.phone({formatted: false}));

    cy.get('input[value="FeMale"]').check();
    cy.get('input[type="checkbox"]').check('Cricket');
    cy.get('input[type="checkbox"]').check('Hockey');

    cy.get('select#Skills').select('Javascript');
    cy.get('select#countries').select('Argentina');
    cy.get('select#country').select('Australia', {force:true}); 
    cy.get('select#yearbox').select('1990');
    cy.get('select[ng-model="monthbox"]').select('May');
    cy.get('select#daybox').select('20');
    cy.get('input#firstpassword').type('Agilizei@2020');
    cy.get('input#secondpassword').type('Agilizei@2020');

    cy.get('input#imagesrc').attachFile('Darth.jpg');
});

When(/^salvar$/, () => {
    cy.get('button#submitbtn').click();
});

Then(/^devo ser cadastrado com sucesso$/, () => {
    cy.wait('@postNewTable').then((resNewTable) => {
        expect(resNewTable.status).to.eq(200);
    });

    cy.wait('@postUserTable').then((resUserTable) => {
        expect(resUserTable.status).to.eq(200);
    });

    cy.wait('@getNewTable').then((resNewTable) => {
        expect(resNewTable.status).to.eq(200);
    });

    cy.url().should('contain', 'WebTable');
});
