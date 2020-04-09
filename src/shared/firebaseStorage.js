import firebase from '../config/firebase/firebaseInit';
import { saveAs } from 'file-saver';
const firebaseStorage = firebase.storage();

export const uploadFile = (event, refresh, loading, loadValue) => {
    loading(true);
    const file = event.target.files[0];
    const storeageRef = firebaseStorage.ref(`files/${file.name}`);
    const task = storeageRef.put(file);
    task.on('state_changed', 
        function progress(snapshot) {
            const percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            loadValue(percentage);
        },
  
        function error(err) {
            console.log(err.message);
            loading(false);
        },
  
        function complete() {
            refresh();
            console.log('success!');
            loading(false);
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
        console.log("[Error in function geFileMetadata]: ", err.message);
        return err;
    }
}

export const getMetaFileList = async (filesList) => {
    try {
        const filesMetadataList = await Promise.all(filesList.map(fl => geFileMetadata(fl).then(res => res)));
        return filesMetadataList;
    } catch (err) {
        console.log("[Error in function getMetaFileList]: ", err.message);
        return err;
    }
}

export const deleteFile = async (filePath) => {
    try {
        await firebaseStorage.ref(filePath).delete()
        return `File "${filePath}" deleted successfull!`;
    } catch (err) {
        console.log("[Error in function deleteFile]: ", err.message);
        return err;
    }
}

export const downloadFile = async (filePath) => {
    try {
        const url = await firebaseStorage.ref(filePath).getDownloadURL();
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
            const blob = xhr.response;
            saveAs(blob, `${filePath.split("/")[1]}`);
        };
        xhr.open('GET', url);
        xhr.send();
        return `File "${filePath}" downloaded started.`;
    } catch (err) {
        console.log("[Error in function downloadFile]: ", err.message);
        return err;
    }
}

