// export const validateUserSchema = (user) => {
//   expect(user).to.have.all.keys(
//     'id', 'name', 'username', 'email', 'address', 'phone', 'website', 'company'
//   );

//   expect(user.id).to.be.a('number');
//   expect(user.name).to.be.a('string');
//   expect(user.username).to.be.a('string');
//   expect(user.email).to.be.a('string');
//   expect(user.phone).to.be.a('string');
//   expect(user.website).to.be.a('string');

//   expect(user.address).to.have.all.keys('street', 'suite', 'city', 'zipcode', 'geo');
//   expect(user.address.geo).to.have.all.keys('lat', 'lng');
//   expect(user.address.geo.lat).to.be.a('string');
//   expect(user.address.geo.lng).to.be.a('string');

//   expect(user.company).to.have.all.keys('name', 'catchPhrase', 'bs');
//   expect(user.company.name).to.be.a('string');
// };

export const validateUserSchema = (user) => {
  // Verifica se todos os campos principais existem
  expect(user).to.have.all.keys('id','name','username','email','address','phone','website','company');

  // Verificações de tipos no nível raiz
  expect(user.id, 'id').to.be.a('number');
  expect(user.name, 'name').to.be.a('string').and.not.be.empty;
  expect(user.username, 'username').to.be.a('string').and.not.be.empty;
  expect(user.email, 'email').to.be.a('string').and.include('@');
  expect(user.phone, 'phone').to.be.a('string');
  expect(user.website, 'website').to.be.a('string');

  // Validações de address
  expect(user.address).to.have.all.keys('street', 'suite', 'city', 'zipcode', 'geo');
  expect(user.address.street, 'address.street').to.be.a('string');
  expect(user.address.suite, 'address.suite').to.be.a('string');
  expect(user.address.city, 'address.city').to.be.a('string');
  expect(user.address.zipcode, 'address.zipcode').to.be.a('string');

  // Validações de geo
  expect(user.address.geo).to.have.all.keys('lat', 'lng');
  expect(user.address.geo.lat, 'geo.lat').to.be.a('string').and.match(/^[-+]?\d*\.?\d+$/);
  expect(user.address.geo.lng, 'geo.lng').to.be.a('string').and.match(/^[-+]?\d*\.?\d+$/);

  // Validações de company
  expect(user.company).to.have.all.keys('name', 'catchPhrase', 'bs');
  expect(user.company.name, 'company.name').to.be.a('string').and.not.be.empty;
  expect(user.company.catchPhrase, 'company.catchPhrase').to.be.a('string');
  expect(user.company.bs, 'company.bs').to.be.a('string').and.not.be.empty;
};
