
import { models, findCollectionByKey } from '../srcServer/models/model';

const router = (req, res, next) => {
    const loginUser = req.body.user;
    const collection = findCollectionByKey('tanks');

    if (collection) {
        const tankCollection = new models[collection]();

        tankCollection.findUser(loginUser.id, (existUser) => {
            if (existUser) {
                existUser._id = null;
                existUser.__v = null;

                return res.json(existUser);
            } else {
                saveNew(loginUser, collection).then(() => {
                    return res.json(existUser);
                })
            }
        })
    } else {
        return res.json({ "status": 'error' });
    }
}

const saveNew = (user, collection) => {
    const tankCollection = new models[collection]({
        userId: user.id
    })

    return tankCollection.save().then((user) => {
        console.log(`succes insert new`);
    });
}

// const updateVote = (exist, type, ip) => {

//     const user = {
//         ip: ip,
//         key: type
//     }

//     exist.users = [
//         ...exist.users,
//         user
//     ];

//     return exist.save().then((vote) => {
//         console.log(`succes update ${vote}`);
//     });
// }

export default router;




















// const saveAdd = (collectionName, url, type, site) => {
//     return new Promise((resolve, reject) => {
//         const votes = site[url][type] ? site[url][type] + 1 : 1;

//         mdb.collection(collectionName).update({ _id: site._id }, { $set: { [url]: { ...site[url], [type]: votes } } })
//     })
// }

// const saveNew = (collectionName, data) => {
//     return new Promise((resolve, reject) => {
//         mdb.collection(collectionName).insertOne(data, (err, result) => {
//             assert.equal(err, null);
//             console.log("Insert success!");
//             resolve();
//         });
//     })
// }

// const getUrl = (collectionName, url) => {

//     return new Promise((resolve, reject) => {
//         mdb.collection(collectionName).findOne({ [url]: { '$exists': 1 } }, (err, site) => {
//             assert.equal(err, null);
//             resolve(site);
//         })
//     })
// }
// const getCollections = () => {
//     let collectionsName = {};

//     return new Promise((resolve, reject) => {
//         mdb.listCollections().each((err, col) => {
//             if (!col) {
//                 resolve(collectionsName);
//                 return false;
//             }
//             collectionsName[col.name] = col.name;
//         })
//     })
// }

// if (letter[0]) {
//     mdb.collection(letter[0]).findOne({ [letter]: 1 })
//         .then((doc, a) => {
//             if (!doc) {
//                 res.send(false);
//             } else {
//                 res.send(doc);
//             }
//         })
// }