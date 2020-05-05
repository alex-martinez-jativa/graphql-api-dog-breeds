const typeDefs = `
    type Query {
        retrieveDogs: [Dog]!
        retrieveDogById(id: ID!) : Dog!
        retrieveByBreedGroup(breedGroup: String!) : [Dog!]!
        retrieveByQuery(query: String!) : [Dog!]! 
    }

    type Dog {
        id: ID!
        breedName: String!
        image: String!
        description: String!
        dogInfo: DogInfo
    }

    type DogInfo {
        height: String
        weight: String
        life: String
        breedGroup: String
    }
`

module.exports = typeDefs