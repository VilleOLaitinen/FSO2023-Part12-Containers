/* eslint-disable no-undef */
db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'the_database',
    },
  ],
})

db.createCollection('people')

db.people.insert({ name: 'Ville Laitinen', number: 44-112323 })
db.people.insert({ name: 'Random Ukko', number: 12-233233 })
