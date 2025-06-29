/// <reference types="cypress"/>
import { NEW_USER, UPDATED_USER } from '../support/constants';
import { validateUserSchema } from '../support/utils';

describe('Desafio técnico PB 2.2', () => {
    let baseUrl = ''
    Cypress.config('baseUrl', Cypress.config('urlAtiv22'))

  it('GET - Deve retornar todos os usuários com schema válido', () => {
    cy.request('GET', baseUrl+'/users').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array').and.have.length(10);
      response.body.forEach((user) => validateUserSchema(user));
    });
  });

  it('POST - Deve criar um novo usuário com resposta válida', () => {
    cy.request('POST', baseUrl+'/users', NEW_USER).then((response) => {
    expect(response.status).to.eq(201);
    expect(response.body).to.have.property('id').and.to.be.a('number');

    expect(response.body.name).to.eq(NEW_USER.name);
    expect(response.body.username).to.eq(NEW_USER.username);
    expect(response.body.email).to.eq(NEW_USER.email);
    expect(response.body.phone).to.eq(NEW_USER.phone);
    expect(response.body.website).to.eq(NEW_USER.website);

    expect(response.body.address.street).to.eq(NEW_USER.address.street);
    expect(response.body.company.name).to.eq(NEW_USER.company.name);
    });
  });

  it('PUT - Deve atualizar um usuário existente com dados válidos', () => {
    cy.request('PUT', `${baseUrl+'/users'}/1`, UPDATED_USER).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.equal(UPDATED_USER);
    });
  });

  it('DELETE - Deve excluir um usuário com sucesso', () => {
    cy.request('DELETE', `${baseUrl+'/users'}/1`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.empty;
    });
  });
});
