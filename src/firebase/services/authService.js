import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../config';

// User roles
export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  SUPPORT: 'support',
  VIEWER: 'viewer'
};

// Permissions
export const PERMISSIONS = {
  // User Management
  VIEW_USERS: 'view_users',
  CREATE_USERS: 'create_users',
  EDIT_USERS: 'edit_users',
  DELETE_USERS: 'delete_users',
  
  // Products
  VIEW_PRODUCTS: 'view_products',
  CREATE_PRODUCTS: 'create_products',
  EDIT_PRODUCTS: 'edit_products',
  DELETE_PRODUCTS: 'delete_products',
  
  // Orders
  VIEW_ORDERS: 'view_orders',
  EDIT_ORDERS: 'edit_orders',
  DELETE_ORDERS: 'delete_orders',
  
  // Inventory
  VIEW_INVENTORY: 'view_inventory',
  EDIT_INVENTORY: 'edit_inventory',
  
  // Settings
  VIEW_SETTINGS: 'view_settings',
  EDIT_SETTINGS: 'edit_settings'
};

// Role permissions mapping
export const ROLE_PERMISSIONS = {
  [USER_ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
  [USER_ROLES.ADMIN]: [
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.CREATE_USERS,
    PERMISSIONS.EDIT_USERS,
    PERMISSIONS.VIEW_PRODUCTS,
    PERMISSIONS.CREATE_PRODUCTS,
    PERMISSIONS.EDIT_PRODUCTS,
    PERMISSIONS.DELETE_PRODUCTS,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.EDIT_ORDERS,
    PERMISSIONS.VIEW_INVENTORY,
    PERMISSIONS.EDIT_INVENTORY,
    PERMISSIONS.VIEW_SETTINGS
  ],
  [USER_ROLES.MANAGER]: [
    PERMISSIONS.VIEW_PRODUCTS,
    PERMISSIONS.CREATE_PRODUCTS,
    PERMISSIONS.EDIT_PRODUCTS,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.EDIT_ORDERS,
    PERMISSIONS.VIEW_INVENTORY,
    PERMISSIONS.EDIT_INVENTORY
  ],
  [USER_ROLES.SUPPORT]: [
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.EDIT_ORDERS,
    PERMISSIONS.VIEW_USERS
  ],
  [USER_ROLES.VIEWER]: [
    PERMISSIONS.VIEW_PRODUCTS,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.VIEW_INVENTORY
  ]
};

// Login function
export const loginUser = async (email, password) => {
  try {
    console.log('Attempting login for:', email);
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('Firebase auth successful, fetching user data from Firestore...');
    console.log('User UID:', user.uid);
    
    // Get user role from Firestore
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    console.log('User document exists:', userDoc.exists());
    
    if (!userDoc.exists()) {
      console.log('No user document found in Firestore for UID:', user.uid);
      throw new Error('User account not properly configured. Please contact administrator.');
    }
    
    const userData = userDoc.data();
    console.log('User data from Firestore:', userData);
    
    // Check if user is active
    if (userData.isActive === false) {
      throw new Error('This account has been deactivated');
    }
    
    console.log('Login successful for user:', userData.displayName);
    
    return {
      user: {
        uid: user.uid,
        email: user.email,
        displayName: userData.displayName || user.displayName,
        role: userData.role,
        permissions: ROLE_PERMISSIONS[userData.role] || [],
        isActive: userData.isActive
      }
    };
  } catch (error) {
    console.error('Login error:', error);
    
    // Handle specific Firestore errors
    if (error.message.includes('network') || error.message.includes('timeout')) {
      throw new Error('Network error. Please check your connection and try again.');
    }
    
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// Create new user (for super admin)
export const createUser = async (userData) => {
  try {
    const { email, password, displayName, role } = userData;
    
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    console.log('User created in Auth, UID:', user.uid);
    
    // Update profile
    await updateProfile(user, { displayName });
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email,
      displayName,
      role: role || USER_ROLES.VIEWER,
      createdAt: new Date().toISOString(),
      createdBy: auth.currentUser.uid,
      isActive: true
    });
    
    console.log('User document created in Firestore');
    
    return { success: true, userId: user.uid };
  } catch (error) {
    console.error('Create user error:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// Auto-create user document if missing
export const ensureUserDocument = async (user) => {
  try {
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      console.log('Auto-creating user document for:', user.uid);
      await setDoc(userDocRef, {
        email: user.email,
        displayName: user.displayName || 'Admin User',
        role: USER_ROLES.ADMIN, // Default role
        createdAt: new Date().toISOString(),
        isActive: true
      });
      console.log('User document auto-created');
    }
  } catch (error) {
    console.error('Error ensuring user document:', error);
  }
};

// Logout function
export const logoutUser = async () => {
  try {
    await signOut(auth);
    // Clear session storage
    sessionStorage.removeItem('currentUser');
    return { success: true };
  } catch (error) {
    throw new Error('Logout failed');
  }
};

// Reset password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// Get current user with role
export const getCurrentUser = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.log('No current user in auth');
      return null;
    }
    
    console.log('Current user UID:', user.uid);
    
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      console.log('No user document found for current user');
      
      // Auto-create document if missing
      await ensureUserDocument(user);
      const newUserDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!newUserDoc.exists()) {
        return null;
      }
      
      const userData = newUserDoc.data();
      return {
        uid: user.uid,
        email: user.email,
        displayName: userData.displayName,
        role: userData.role,
        permissions: ROLE_PERMISSIONS[userData.role] || [],
        isActive: userData.isActive
      };
    }
    
    const userData = userDoc.data();
    console.log('Current user data:', userData);
    
    return {
      uid: user.uid,
      email: user.email,
      displayName: userData.displayName,
      role: userData.role,
      permissions: ROLE_PERMISSIONS[userData.role] || [],
      isActive: userData.isActive
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Auth state observer
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    try {
      if (user) {
        console.log('Auth state changed - user logged in:', user.uid);
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.isActive !== false) {
            callback({
              uid: user.uid,
              email: user.email,
              displayName: userData.displayName,
              role: userData.role,
              permissions: ROLE_PERMISSIONS[userData.role] || [],
              isActive: userData.isActive
            });
            return;
          }
        } else {
          // Auto-create user document if missing
          await ensureUserDocument(user);
          const newUserDoc = await getDoc(doc(db, 'users', user.uid));
          if (newUserDoc.exists()) {
            const userData = newUserDoc.data();
            callback({
              uid: user.uid,
              email: user.email,
              displayName: userData.displayName,
              role: userData.role,
              permissions: ROLE_PERMISSIONS[userData.role] || [],
              isActive: userData.isActive
            });
            return;
          }
        }
      }
      console.log('Auth state changed - no user');
      callback(null);
    } catch (error) {
      console.error('Auth state change error:', error);
      callback(null);
    }
  });
};

// Check permission
export const hasPermission = (user, permission) => {
  if (!user || !user.permissions) return false;
  return user.permissions.includes(permission);
};

// Get all users (for user management)
export const getAllUsers = async () => {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const users = [];
    
    usersSnapshot.forEach(doc => {
      users.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return users;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

// Update user role
export const updateUserRole = async (userId, newRole) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      role: newRole,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    throw new Error('Failed to update user role');
  }
};

// Error message helper
const getAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/user-disabled':
      return 'This account has been disabled';
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/email-already-in-use':
      return 'Email already in use';
    case 'auth/weak-password':
      return 'Password is too weak';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection and try again';
    case 'auth/too-many-requests':
      return 'Too many login attempts. Please try again later';
    default:
      return 'An error occurred. Please try again';
  }
};