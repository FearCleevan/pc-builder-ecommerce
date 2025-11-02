import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

export const setupSuperAdmin = async () => {
  const superAdminEmail = import.meta.env.VITE_SUPER_ADMIN_EMAIL || 'superadmin@yourstore.com';
  const superAdminPassword = 'TempPassword123!'; // Change this after first login
  
  try {
    // Check if super admin already exists in Firestore
    const usersSnapshot = await getDocs(collection(db, 'users'));
    let superAdminExists = false;
    
    usersSnapshot.forEach(doc => {
      if (doc.data().role === 'super_admin') {
        superAdminExists = true;
      }
    });
    
    if (superAdminExists) {
      console.log('Super admin already exists in Firestore');
      return;
    }
    
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, superAdminEmail, superAdminPassword);
    const user = userCredential.user;
    
    // Update profile
    await updateProfile(user, {
      displayName: 'Super Admin'
    });
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: superAdminEmail,
      displayName: 'Super Admin',
      role: 'super_admin',
      createdAt: new Date().toISOString(),
      isActive: true
    });
    
    console.log('=== SUPER ADMIN CREATED SUCCESSFULLY ===');
    console.log('Email:', superAdminEmail);
    console.log('Temporary Password:', superAdminPassword);
    console.log('UID:', user.uid);
    console.log('Please change the password after first login!');
    console.log('========================================');
    
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('Super admin already exists in Authentication');
      
      // Try to find the existing user and create Firestore document
      const usersSnapshot = await getDocs(collection(db, 'users'));
      let userDocExists = false;
      
      usersSnapshot.forEach(doc => {
        if (doc.data().email === superAdminEmail) {
          userDocExists = true;
        }
      });
      
      if (!userDocExists) {
        console.log('Creating Firestore document for existing super admin...');
        // You'll need to get the existing user's UID and create the document
        console.log('Please manually create the Firestore document for the existing super admin user.');
      }
    } else {
      console.error('Error creating super admin:', error);
    }
  }
};

// Manual setup function for existing users
export const manualCreateUserDocument = async (uid, userData) => {
  try {
    await setDoc(doc(db, 'users', uid), {
      email: userData.email,
      displayName: userData.displayName,
      role: userData.role || 'admin',
      createdAt: new Date().toISOString(),
      isActive: true
    });
    console.log('User document created manually for UID:', uid);
    return { success: true };
  } catch (error) {
    console.error('Error creating user document manually:', error);
    throw error;
  }
};