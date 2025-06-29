/// <reference types="cypress"/>

describe('Desafio técnico PB 2.1', () => {
    let baseUrl = ''
  beforeEach(() => {
    //cy.intercept('GET', '**/log.optimizely.com/**', { statusCode: 204 });
    Cypress.config('baseUrl', Cypress.config('urlAtiv21'))
    cy.visit(baseUrl+'/challenging_dom');
  });

  context('Cenário 1 - Clicar nos 3 botões principais', () => {
    it('Deve clicar no botão com class="button"', () => {
      cy.get('a[class="button"]').should('be.visible').click();
    });

    it('Deve clicar no botão com class="button alert"', () => {
      cy.get('a[class="button alert"]').should('be.visible').click();
    });

    it('Deve clicar no botão com class="button success"', () => {
      cy.get('a[class="button success"]').should('be.visible').click();
    });
  });

  context('Cenário 2 - Clicar em todos os botões Edit e Delete da grid', () => {
    it('Deve clicar em todos os links de Edit', () => {
      // Encontra todas as linhas e clica no "edit" de cada uma
      cy.get('table tbody tr').each(($row) => {
        cy.wrap($row).within(() => {
          cy.contains('a', 'edit').should('have.attr', 'href', '#edit').and('be.visible').click();
        });
      });
    });

    it('Deve clicar em todos os links de Delete', () => {
      // Encontra todas as linhas e clica no "delete" de cada uma
      cy.get('table tbody tr').each(($row) => {
        cy.wrap($row).within(() => {
          cy.contains('a', 'delete').should('have.attr', 'href', '#delete').and('be.visible').click();
        });
      });
    });

    it('Deve clicar em Edit e Delete para cada linha da tabela', () => {
        cy.get('table tbody tr').each(($row) => {
            cy.wrap($row).within(() => {
            // Clica primeiro em Edit
            cy.contains('a', 'edit').should('be.visible').click();
            cy.url().should('include', '#edit');
            // Depois clica em Delete
            cy.contains('a', 'delete').should('be.visible').click();
            cy.url().should('include', '#delete');
            });
        });
    });
  });
});