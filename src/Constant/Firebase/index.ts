import firestore from '@react-native-firebase/firestore';

export const getFirebaseVideoData = () => {
  return new Promise((resolve, reject) => {
    try {
      firestore()
        .collection('media')
        .doc('CeeKbEBB4pPB26gyu36v')
        .collection('video')
        .get()
        .then(
          (documentSnapshot: any) => {
            const listUserData: any = [];
            documentSnapshot.docs.forEach((doc: any) => {
              listUserData.push(doc._data);
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
                (element: any) => element.name == doc._data.name,
              );
              if (isId == -1) {
                var newData = {
                  name: doc._data.name,
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
