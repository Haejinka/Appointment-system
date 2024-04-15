import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getStorage, ref as storageRef, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAmm0FVV618ftggSwqMLyL8A1xCewXJoaA",
  authDomain: "petplace-fc2ea.firebaseapp.com",
  projectId: "petplace-fc2ea",
  storageBucket: "petplace-fc2ea.appspot.com",
  messagingSenderId: "286818333615",
  appId: "1:286818333615:web:e6bdbfcad3b920ad86b55a",
  measurementId: "G-93QMXWMB0K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);

const Testpage = () => {
  const [petImageUri, setPetImageUri] = useState(null);

  useEffect(() => {
    const petRef = ref(db, 'pets/pet10ID/petPics'); // Change to the correct path for the pet's image URL
    get(petRef).then((snapshot) => {
      if (snapshot.exists()) {
        const imageUrl = snapshot.val();
        getDownloadURL(storageRef(storage, imageUrl)).then((url) => {
          setPetImageUri(url);
        }).catch((error) => {
          console.error("Error getting download URL:", error);
        });
      } else {
        console.log("No image found for pet10ID");
      }
    }).catch((error) => {
      console.error("Error getting image URI:", error);
    });
  }, [db, storage]);

  return (
    <div>
      <h1>Test Page</h1>
      {petImageUri && (
        <img src={petImageUri} alt="Pet Image" style={{ maxWidth: '100%' }} />
      )}
    </div>
  );
}

export default Testpage;
