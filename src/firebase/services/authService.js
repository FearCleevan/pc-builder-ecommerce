import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc,
  collection, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { auth, db } from '../config';

// User roles and permissions
export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  SUPPORT: 'support',
  VIEWER: 'viewer'
};

export const PERMISSIONS = {
  VIEW_USERS: 'view_users',
  CREATE_USERS: 'create_users',
  EDIT_USERS: 'edit_users',
  DELETE_USERS: 'delete_users',
  VIEW_PRODUCTS: 'view_products',
  CREATE_PRODUCTS: 'create_products',
  EDIT_PRODUCTS: 'edit_products',
  DELETE_PRODUCTS: 'delete_products',
  VIEW_ORDERS: 'view_orders',
  EDIT_ORDERS: 'edit_orders',
  DELETE_ORDERS: 'delete_orders',
  VIEW_INVENTORY: 'view_inventory',
  EDIT_INVENTORY: 'edit_inventory',
  VIEW_SETTINGS: 'view_settings',
  EDIT_SETTINGS: 'edit_settings'
};

export const ROLE_PERMISSIONS = {
  [USER_ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
  [USER_ROLES.ADMIN]: [
    PERMISSIONS.VIEW_USERS, PERMISSIONS.CREATE_USERS, PERMISSIONS.EDIT_USERS, PERMISSIONS.DELETE_USERS,
    PERMISSIONS.VIEW_PRODUCTS, PERMISSIONS.CREATE_PRODUCTS, PERMISSIONS.EDIT_PRODUCTS, PERMISSIONS.DELETE_PRODUCTS,
    PERMISSIONS.VIEW_ORDERS, PERMISSIONS.EDIT_ORDERS, PERMISSIONS.DELETE_ORDERS,
    PERMISSIONS.VIEW_INVENTORY, PERMISSIONS.EDIT_INVENTORY,
    PERMISSIONS.VIEW_SETTINGS, PERMISSIONS.EDIT_SETTINGS
  ],
  [USER_ROLES.MANAGER]: [
    PERMISSIONS.VIEW_PRODUCTS, PERMISSIONS.CREATE_PRODUCTS, PERMISSIONS.EDIT_PRODUCTS, PERMISSIONS.DELETE_PRODUCTS,
    PERMISSIONS.VIEW_ORDERS, PERMISSIONS.EDIT_ORDERS,
    PERMISSIONS.VIEW_INVENTORY, PERMISSIONS.EDIT_INVENTORY
  ],
  [USER_ROLES.SUPPORT]: [
    PERMISSIONS.VIEW_ORDERS, PERMISSIONS.EDIT_ORDERS, PERMISSIONS.VIEW_USERS
  ],
  [USER_ROLES.VIEWER]: [
    PERMISSIONS.VIEW_PRODUCTS, PERMISSIONS.VIEW_ORDERS, PERMISSIONS.VIEW_INVENTORY
  ]
};

// Session management
let originalUserCredentials = null;

// Store original user credentials before creating new user
export const storeOriginalUser = (user) => {
  if (user) {
    originalUserCredentials = {
      uid: user.uid,
      email: user.email,
    };
  }
};

// Create new user with session management
export const createUser = async (userData, currentUser) => {
  let newUser = null;
  
  try {
    const { email, password, displayName, role } = userData;
    
    // Store current user info before creating new user
    storeOriginalUser(currentUser);
    
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    newUser = userCredential.user;
    
    // Update profile
    await updateProfile(newUser, { displayName });
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', newUser.uid), {
      email,
      displayName,
      role: role || USER_ROLES.VIEWER,
      createdAt: new Date().toISOString(),
      createdBy: currentUser.uid,
      isActive: true
    });
    
    return { 
      success: true, 
      userId: newUser.uid,
      requiresRefresh: true,
      message: 'User created successfully! Please refresh the page to continue as admin.'
    };
  } catch (error) {
    // Attempt to restore original session if possible
    if (originalUserCredentials) {
      console.warn('Failed to create user, original session may be lost');
    }
    
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// Delete user (Firestore only - keeps user in Auth but removes access)
export const deleteUser = async (userId) => {
  try {
    // Note: This only deletes the Firestore document
    // The user remains in Firebase Auth but loses access to the app
    await deleteDoc(doc(db, 'users', userId));
    
    return { success: true };
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};

// Update user role
export const updateUserRole = async (userId, newRole) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      role: newRole,
      updatedAt: new Date().toISOString(),
      updatedBy: auth.currentUser?.uid
    });
    return { success: true };
  } catch (error) {
    throw new Error('Failed to update user role');
  }
};

// Manual session restoration (for admin to sign back in)
export const restoreAdminSession = async (email, password) => {
  try {
    await signOut(auth);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    throw new Error('Failed to restore admin session: ' + getAuthErrorMessage(error.code));
  }
};

// Login function
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      throw new Error('User account not properly configured. Please contact administrator.');
    }
    
    const userData = userDoc.data();
    
    if (userData.isActive === false) {
      throw new Error('This account has been deactivated');
    }
    
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
    if (error.message.includes('network') || error.message.includes('timeout')) {
      throw new Error('Network error. Please check your connection and try again.');
    }
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// Logout function
export const logoutUser = async () => {
  try {
    await signOut(auth);
    sessionStorage.removeItem('currentUser');
    return { success: true };
  } catch (error) {
    throw new Error('Logout failed');
  }
};

// Get current user with role
export const getCurrentUser = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      return null;
    }
    
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
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

// Check permission
export const hasPermission = (user, permission) => {
  if (!user || !user.permissions) return false;
  return user.permissions.includes(permission);
};

// Auto-create user document if missing
export const ensureUserDocument = async (user) => {
  try {
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        email: user.email,
        displayName: user.displayName || 'Admin User',
        role: USER_ROLES.ADMIN,
        createdAt: new Date().toISOString(),
        isActive: true
      });
    }
  } catch (error) {
    console.error('Error ensuring user document:', error);
  }
};

// Auth state observer - FIXED VERSION
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    try {
      if (user) {
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
      callback(null);
    } catch (error) {
      console.error('Auth state change error:', error);
      callback(null);
    }
  });
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

// Get user by ID
export const getUserById = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) {
      return null;
    }
    
    return {
      id: userDoc.id,
      ...userDoc.data()
    };
  } catch (error) {
    console.error('Error getting user by ID:', error);
    throw new Error('Failed to fetch user');
  }
};

// Check if user has specific role
export const hasRole = (user, role) => {
  return user && user.role === role;
};

// Check if user has any of the specified roles
export const hasAnyRole = (user, roles) => {
  return user && roles.includes(user.role);
};

// Check multiple permissions
export const hasAllPermissions = (user, permissions) => {
  if (!user || !user.permissions) return false;
  return permissions.every(permission => user.permissions.includes(permission));
};

// Check any permission
export const hasAnyPermission = (user, permissions) => {
  if (!user || !user.permissions) return false;
  return permissions.some(permission => user.permissions.includes(permission));
};

// Get users by role
export const getUsersByRole = async (role) => {
  try {
    const q = query(collection(db, 'users'), where('role', '==', role));
    const querySnapshot = await getDocs(q);
    const users = [];
    
    querySnapshot.forEach(doc => {
      users.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return users;
  } catch (error) {
    throw new Error('Failed to fetch users by role');
  }
};

// Update user profile
export const updateUserProfile = async (userId, profileData) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      ...profileData,
      updatedAt: new Date().toISOString(),
      updatedBy: auth.currentUser?.uid
    });
    return { success: true };
  } catch (error) {
    throw new Error('Failed to update user profile');
  }
};

// Deactivate user (soft delete)
export const deactivateUser = async (userId) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      isActive: false,
      deactivatedAt: new Date().toISOString(),
      deactivatedBy: auth.currentUser?.uid
    });
    return { success: true };
  } catch (error) {
    throw new Error('Failed to deactivate user');
  }
};

// Reactivate user
export const reactivateUser = async (userId) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      isActive: true,
      reactivatedAt: new Date().toISOString(),
      reactivatedBy: auth.currentUser?.uid
    });
    return { success: true };
  } catch (error) {
    throw new Error('Failed to reactivate user');
  }
};

// Utility function to check if super admin exists
export const checkSuperAdminExists = async () => {
  try {
    const superAdmins = await getUsersByRole(USER_ROLES.SUPER_ADMIN);
    return superAdmins.length > 0;
  } catch (error) {
    console.error('Error checking super admin existence:', error);
    return false;
  }
};

// Get user permissions by role
export const getPermissionsByRole = (role) => {
  return ROLE_PERMISSIONS[role] || [];
};

// Validate user access to a specific section
export const validateUserAccess = (user, requiredPermission) => {
  if (!user) return false;
  return hasPermission(user, requiredPermission);
};

// Error message helper
const getAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/invalid-email': return 'Invalid email address';
    case 'auth/user-disabled': return 'This account has been disabled';
    case 'auth/user-not-found': return 'No account found with this email';
    case 'auth/wrong-password': return 'Incorrect password';
    case 'auth/email-already-in-use': return 'Email already in use';
    case 'auth/weak-password': return 'Password is too weak';
    case 'auth/network-request-failed': return 'Network error. Please check your connection and try again';
    case 'auth/too-many-requests': return 'Too many login attempts. Please try again later';
    case 'auth/operation-not-allowed': return 'This operation is not allowed';
    case 'auth/requires-recent-login': return 'Please log in again to perform this action';
    default: return 'An error occurred. Please try again';
  }
};

export { auth };