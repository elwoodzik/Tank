import mongoose from 'mongoose';

// zbior wszystkich modeli. Odwolanie po kluczu z collectionNames.name
export const models = {};

// kolekcje ktore zostana użyte przy tworzeniu modelu i adres domeny do niej przypisany
const collectionNames = [
    {
        name: 'tanks',
        key: 'tanks'
    }
]
// obiekt modelu
const model = {
    userId: String,
    createTime: { type: Date, default: Date.now },
    resources: {
        gold: { type: Number, default: 100 },
        diamonds: { type: Number, default: 0 },
    },
    statistic: {
        kills: { type: Number, default: 0 },
        deaths: { type: Number, default: 0 },
    }
}

const createModel = (model, collectionNames) => {
    for (let i = 0; i < collectionNames.length; i++) {

        const voicerSchema = new mongoose.Schema(model, {
            collection: collectionNames[i].name
        });

        voicerSchema.methods.findUser = function (id, cb) {
            this.model(collectionNames[i].name).findOne({ 'userId': id }, (err, exist) => {
                if (!err) {
                    return cb(exist);
                }
                return cb(false);
            })
        }


        // voicerSchema.methods.findAll = function (cb) {
        //     this.model(collectionNames[i].name).find({}, (err, exist) => {
        //         if (!err) {
        //             return cb(exist);
        //         }
        //         return cb(false);
        //     })
        // }

        // voicerSchema.methods.count = function (cb) {
        //     this.model(collectionNames[i].name).aggregate({
        //         "$project": {
        //             "_id": "$_id",
        //             "url": "$url",
        //             "allVotes": { $size: '$users' }
        //         }
        //     }, (err, count) => {
        //         if (!err) {
        //             return cb(count);
        //         }
        //         return cb(false);
        //     })
        // }

        models[collectionNames[i].name] = mongoose.model(collectionNames[i].name, voicerSchema);
    }

    return models;
}

export const findCollectionByKey = (key) => {
    const arr = collectionNames.filter(collection => collection.key === key).map(collection => collection.name);
    return arr[0];
}

createModel(model, collectionNames);


