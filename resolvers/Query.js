const {models: { Dog } } = require('data')
const { NotFoundError } = require('errors')
const { validate } = require('utils')

const Query = {
    retrieveDogs(parent, args, ctx, info) {
        
        return (async() => {
            const results = await Dog.find().lean()
            if(results.length === 0) throw new NotFoundError('there are not results')

            results.forEach(dog => {
                dog.id = dog._id.toString()
                delete dog._id
                delete dog.__v
            })

            return results
        })()
    },
    retrieveDogById(parent, args, ctx, info) {
        const { id } = args
        validate.string(id, 'id')

        return (async() => {
            const result = await Dog.findById(id).lean()
            if(!result) throw new NotFoundError(`there are not dog with id: ${id}`)

            result.id = result._id.toString()
            delete result._id
            delete result.__v

            return result
        })()

    },
    retrieveByBreedGroup(parent, args, ctx, info) {
        let { breedGroup } = args
        validate.string(breedGroup, 'breed group')

        switch(breedGroup){
            case 'companion':
                breedGroup = 'companion dogs'
                break
            case 'herding':
                breedGroup = 'herding dogs'
                break
            case 'hound':
                breedGroup = 'hound dogs'
                break
            case 'hybrid':
                breedGroup = 'hybrid dogs'
                break
            case 'mixed':
                breedGroup = 'mixed breed dogs'
                break
            case 'sporting':
                breedGroup = 'sporting dogs'
                break
            case 'terrier':
                breedGroup = 'terrier dogs'
                break
            case 'working': 
                breedGroup = 'working dogs'
                break
        }

        return (async() => {
            const results = await Dog.find({'dogInfo.breedGroup': breedGroup}).lean()
            if(results.length === 0) throw new NotFoundError(`breed group ${breedGroup} does not exist`)
        debugger
            results.forEach(dog => {
                dog.id = dog._id.toString()
                delete dog._id
                delete dog.__v
            })

            return results
        })()
    },
    retrieveByQuery(parent, args, ctx, info) {
        const { query } = args
        let regex = new RegExp(query, 'i')

        return (async() => {
            const results = await Dog.find({
                $or:[ 
                    {breedName: regex},
                    {description: regex},
                    {'dogInfo.height': regex},
                    {'dogInfo.weight': regex},
                    {'dogInfo.life': regex}
                ]
            }).lean()

            if(results.length === 0) throw new NotFoundError(`there are not results with the query: ${query}`)

            results.forEach(dog => {
                dog.id = dog._id.toString()
                delete dog._id
                delete dog.__v
            })

            return results
        })()
    }
}

module.exports = Query