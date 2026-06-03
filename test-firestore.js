import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBqMh4kbjaKDXOGwT2vHZycNBTdQKg4bVQ",
  authDomain: "universe-billboard.firebaseapp.com",
  projectId: "universe-billboard",
  storageBucket: "universe-billboard.firebasestorage.app",
  messagingSenderId: "838515174677",
  appId: "1:838515174677:web:b749bf5c3bd74b235ecd1c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  console.log('Testing Firestore Read...');
  try {
    const snap = await getDocs(collection(db, 'bookings'));
    console.log(`Initial read: Found ${snap.size} bookings.`);
    
    if (snap.size >= 10) {
      console.log('✅ Firestore writes (seeded) were successful.');
    } else {
      console.log('❌ Firestore writes may not have worked. Only found ' + snap.size);
    }

    console.log('\nTesting Real-time Sync...');
    let listenerFired = false;
    const unsubscribe = onSnapshot(collection(db, 'bookings'), (snapshot) => {
      listenerFired = true;
      console.log(`✅ Real-time listener active. Current snapshot size: ${snapshot.size}`);
    });

    // Wait a bit
    await new Promise(r => setTimeout(r, 2000));
    unsubscribe();
    
    if (listenerFired) {
      console.log('✅ Real-time sync works (listener initialized successfully).');
    } else {
      console.log('❌ Real-time sync failed (listener did not fire).');
    }
  } catch (error) {
    console.error('Error during test:', error);
  }
  
  process.exit(0);
}

test();
