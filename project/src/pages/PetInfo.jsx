import React, { useState, useEffect } from 'react';
import Navbar_1 from '../components/Navbar_1'; // Assuming you have this component
import { getDatabase, ref, get, update } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import PetInfoViewModal from '../components/PetInfoViewModal'; 
import PetInfoEditModal from '../components/PetInfoEditModal';

const firebaseConfig = {
  apiKey: "AIzaSyAmm0FVV618ftggSwqMLyL8A1xCewXJoaA",
  authDomain: "petplace-fc2ea.firebaseapp.com",
  projectId: "petplace-fc2ea",
  storageBucket: "petplace-fc2ea.appspot.com",
  messagingSenderId: "286818333615",
  appId: "1:286818333615:web:e6bdbfcad3b920ad86b55a",
  measurementId: "G-93QMXWMB0K"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

const PetInfo = () => {
  const [owners, setOwners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [petsPerPage] = useState(5);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const ownersRef = ref(db, 'clients');
      const petsRef = ref(db, 'pets');
      const ownersSnapshot = await get(ownersRef);
      const petsSnapshot = await get(petsRef);

      let ownersData = {};
      ownersSnapshot.forEach((childSnapshot) => {
        const clientId = childSnapshot.key;
        const clientData = childSnapshot.val();
        ownersData[clientId] = { ...clientData, pets: [] };
      });

      petsSnapshot.forEach((childSnapshot) => {
        const petId = childSnapshot.key;
        const petData = childSnapshot.val();
        if (ownersData[petData.ownerID]) {
          ownersData[petData.ownerID].pets.push({
            id: petId,
            ...petData,
          });
        }
      });

      setOwners(Object.values(ownersData)); // Convert to array for easy mapping
    };

    fetchData();
  }, []);

  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;

  const currentOwners = owners.slice(indexOfFirstPet, indexOfLastPet);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleViewPet = (pet) => {
    setSelectedPet(pet);
    setIsViewModalOpen(true);
  };

  const handleEditPet = (pet) => {
    setSelectedPet(pet);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
  };
  
    const savePetInfo = (editedPet) => {
      const petRef = ref(db, `pets/${editedPet.id}`);
    
      const updatedPetData = {
        name: editedPet.name,
        breed: editedPet.breed,
        age: editedPet.age,
        birthdate: editedPet.birthdate,
        gender: editedPet.gender,
        weight: editedPet.weight
      };
    
      update(petRef, updatedPetData)
        .then(() => {
          console.log('Pet information updated successfully!');
          // Update local state to reflect the changes in the UI immediately
          setOwners((prevOwners) => {
            return prevOwners.map((owner) => {
              if (owner.id === editedPet.clientId) {
                return {
                  ...owner,
                  pets: owner.pets.map((pet) => {
                    if (pet.id === editedPet.id) {
                      return editedPet; // Update with the edited pet info
                    }
                    return pet;
                  }),
                };
              }
              return owner;
            });
          });
          closeModal();
          setModifiedPets((prevModified) => [...prevModified, editedPet.id]); // Update modifiedPets
        })
        .catch((error) => {
          console.error('Error updating pet information:', error);
        });
    };
    
      
  
    return (
      <div className="flex flex-col md:flex-row h-screen">
        <Navbar_1 />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold">Pet Information</h2>
            <p className="text-gray-600">You are viewing Pet Information</p>
          </div>
          <div className="flex flex-col space-y-4">
            {currentOwners.map(owner => (
              <div key={owner.id} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-2">{owner.name}</h2>
                {owner.pets.map(pet => (
                  <div key={pet.id} className="flex items-center justify-between border-b border-gray-300 py-2">
                    <div>
                      <h3 className="text-lg font-semibold">{pet.name}</h3>
                      <p className="text-gray-600">Age: {pet.age}</p>
                    </div>
                    <div className="space-x-2">
                      <button onClick={() => handleViewPet(pet)} className="px-4 py-2 rounded-md bg-blue-500 text-white">View</button>
                      <button onClick={() => handleEditPet(pet)} className="px-4 py-2 rounded-md bg-green-500 text-white">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center">
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 rounded-md bg-blue-500 text-white">Previous</button>
            <span className="text-gray-600">Page {currentPage} of {Math.ceil(owners.length / petsPerPage)}</span>
            <button onClick={() => paginate(currentPage + 1)} disabled={currentOwners.length < petsPerPage} className="px-4 py-2 rounded-md bg-blue-500 text-white">Next</button>
          </div>
        </div>
        {/* Render the view modal if it is open */}
        {isViewModalOpen && <PetInfoViewModal pet={selectedPet} closeModal={closeModal} />}
        {/* Render the edit modal if it is open */}
        {isEditModalOpen && <PetInfoEditModal pet={selectedPet} closeModal={closeModal} savePetInfo={savePetInfo} />}
      </div>
    );
  };
  
  export default PetInfo;