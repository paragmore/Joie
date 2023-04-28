import firestore from '@react-native-firebase/firestore';

export const getFirebaseVideoData = () => {
  return new Promise((resolve, reject) => {
    try {
      firestore()
        .collection('media')
        .doc('CeeKbEBB4pPB26gyu36v')
        .collection('video')
        .orderBy('id', 'asc')
        .get()
        .then(
          (documentSnapshot: any) => {
            const listUserData: any = [];
            documentSnapshot.docs.forEach((doc: any) => {
              let isId = listUserData.findIndex(
                (element: any) => element.name == doc._data.name.toLowerCase(),
              );
              if (isId == -1) {
                var newData = {
                  name: doc._data.name.toLowerCase(),
                  data: [doc._data],
                };
                listUserData.push(newData);
              } else {
                listUserData[isId].data.push(doc._data);
              }
            });
            resolve(listUserData);
          },
          error => {
            reject(error);
          },
        );
    } catch (error) {
      reject(error);
    }
  });
};
export const getFirebaseAudioData = () => {
  return new Promise((resolve, reject) => {
    try {
      firestore()
        .collection('media')
        .doc('sqe3cGW30ZEl972GriUu')
        .collection('audio')
        .get()
        .then(
          (response: any) => {
            const listUserData: any = [];
            response.docs.forEach((doc: any) => {
              let isId = listUserData.findIndex(
                (element: any) => element.name == doc._data.name.toLowerCase(),
              );
              if (isId == -1) {
                var newData = {
                  name: doc._data.name.toLowerCase(),
                  image_url: doc._data.image_url,
                  data: [doc._data],
                };
                listUserData.push(newData);
              } else {
                listUserData[isId].data.push(doc._data);
              }
            });
            resolve(listUserData);
          },
          error => {
            reject(error);
          },
        );
    } catch (error) {
      reject(error);
    }
  });
};

export const setFirebaseUserData = ({id, userData}: any) => {
  return new Promise((resolve, reject) => {
    return firestore()
      .collection('Users')
      .doc(id)
      .set(userData)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.log('responseerror>>>', error);
        reject(error);
      });
  });
};
export const getFirebaseUserData = ({id}: any) => {
  console.log('id', id);
  return new Promise((resolve, reject) => {
    return firestore()
      .collection('Users')
      .doc(id)
      .get()
      .then((documentSnapshot: any) => {
        resolve(documentSnapshot);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const updateFirebaseUserData = ({id, subscriptions}: any) => {
  return new Promise((resolve, reject) => {
    return firestore()
      .collection('Users')
      .doc(id)
      .update({subscriptions: subscriptions})
      .then((documentSnapshot: any) => {
        resolve(documentSnapshot?.docs);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const DeleteFirebaseUserData = ({id}: any) => {
  return new Promise((resolve, reject) => {
    return firestore()
      .collection('Users')
      .doc(id)
      .delete()
      .then((documentSnapshot: any) => {
        resolve(documentSnapshot);
      })
      .catch(error => {
        reject(error);
      });
  });
};
