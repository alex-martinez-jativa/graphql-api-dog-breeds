# GRAPHQL DOG BREEDS API

<p>Public API with information about dog breeds</p>

<a href="https://api-dog-breeds.herokuapp.com">https://graphql-api-dog-breeds.herokuapp.com/</a>

## Endpoint
<p>https://graphql-api-dog-breeds.herokuapp.com/graphql</p>

## Query example
```js
query{
  retrieveDogById(id:"5eaff43af96b5978ca726dd3"){
    id
    breedName
    description
    image
    dogInfo{
      height
      weight
      life
      breedGroup
    }
  }
}
```
## Response example
```json
{
  "data": {
    "retrieveDogById": {
      "id": "5eaff43af96b5978ca726dd3",
      "breedName": "neapolitan mastiff",
      "description": "The Neapolitan Mastiff dog breed was developed in southern Italy as a family and guard dog. Today this massive breed is known as a gentle giant.",
      "image": "https://cdn1-www.dogtime.com/assets/uploads/2011/01/file_22936_neapolitan-mastiff-300x189.jpg",
      "dogInfo": {
        "height": "24 to 31 inches tall at the shoulder",
        "weight": "120 to 200 pounds",
        "life": "8 to 10 years",
        "breedGroup": "working dogs"
      }
    }
  }
}
```
## Schema
```js
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
    }`
```

<p>if you want to try the REST service, go here:</p>
<a href="https://github.com/alex-martinez-jativa/api-dog-breeds">
https://github.com/alex-martinez-jativa/api-dog-breeds
</a>

### Author
<p>Alex Martínez Játiva</p>