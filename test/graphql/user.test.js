// test.js
const { spec } = require('pactum');
const { eachLike, like } = require('pactum-matchers');

it('Listagem de usuarios', async () => {
    await spec()
        .post('http://lojaebac.ebaconline.art.br/graphql')
        .withGraphQLQuery(`
    {
query {
  Users {
    id
    email
    profile {
      firstName
    }
  }
}
  `)
        .expectStatus(200)
        .expectJsonMatch({
            data: {
                Users: eachLike({
                    id: like('679f50eb0cf0a913258b286c'),
                    email: like('admin@admin.com'),
                    profile: {
                        firstName: like('admin')
                    }
                })
            }
        })

});
