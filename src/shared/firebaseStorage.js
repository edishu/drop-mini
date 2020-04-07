import firebase from '../config/firebase/firebaseInit';

const firebaseStorage = firebase.storage();

export const uploadFile = event => {
    const file = event.target.files[0];
    const storeageRef = firebaseStorage.ref(`files/${file.name}`);
    const task = storeageRef.put(file);
    task.on('state_changed', 
        function progress(snapshot) {
            const percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            console.log(percentage);
        },
  
        function error(err) {
            console.log(err.message);
        },
  
        function complete() {
            console.log('success!');
        }
    );
}

export const getFilesList = async (directory) => {  
    const filesRef = firebaseStorage.ref(directory);
    try {
        const filesObj = await filesRef.listAll();
        const files = filesObj.items;
        return files;
    } catch (err) {
        console.log("[Error in function getFilesList]: ", err.message);
        return err;
    }
}

export const geFileMetadata = async (file) => {
    try {
        const fileMeta = await file.getMetadata();
        return fileMeta;
    } catch (err) {
        console.log("[Error in function getFilesList]: ", err.message);
        return err;
    }
}