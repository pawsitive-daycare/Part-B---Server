const { userModel } = require("./models/user")

await userModel.deleteMany();
console.log("User data deleted");

const users = [
    {
        email: 'sam@email.com',
        firstName: 'sam',
        lastName: 'tos',
        phoneNumber: '0448536959',
        password: '112233',
        isAdmin: false
      },
    {
        email: 'peter@email.com',
        firstName: 'Peter',
        lastName: 'two',
        phoneNumber: '0448536951',
        password: '12345',
        isAdmin: false
      },
    {
        email: 'joel@email.com',
        firstName: 'joel',
        lastName: 'Force',
        phoneNumber: '0448536952',
        password: '1234',
        isAdmin: false
      },
    {
        email: 'henry@email.com',
        firstName: 'henry',
        lastName: 'forth',
        phoneNumber: '0448536959',
        password: '1234567',
        isAdmin: false
      }
];

await userModel.insertMany(users);
console.log("User data created");

