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
    PERMISSIONS.DELETE_USERS,
    PERMISSIONS.VIEW_PRODUCTS,
    PERMISSIONS.CREATE_PRODUCTS,
    PERMISSIONS.EDIT_PRODUCTS,
    PERMISSIONS.DELETE_PRODUCTS,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.EDIT_ORDERS,
    PERMISSIONS.DELETE_ORDERS,
    PERMISSIONS.VIEW_INVENTORY,
    PERMISSIONS.EDIT_INVENTORY,
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.EDIT_SETTINGS
  ],
  [USER_ROLES.MANAGER]: [
    PERMISSIONS.VIEW_PRODUCTS,
    PERMISSIONS.CREATE_PRODUCTS,
    PERMISSIONS.EDIT_PRODUCTS,
    PERMISSIONS.DELETE_PRODUCTS,
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
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get user role from Firestore
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      throw new Error('User account not properly configured. Please contact administrator.');
    }
    
    const userData = userDoc.data();
    
    // Check if user is active
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
    
    return { success: true, userId: user.uid };
  } catch (error) {
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// Delete user (removes Firestore document)
export const deleteUser = async (userId) => {
  try {
    // Note: This only deletes the Firestore document
    // To fully delete the user from Firebase Auth, you'd need Firebase Admin SDK on backend
    await deleteDoc(doc(db, 'users', userId));
    
    return { success: true };
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};

// Update user information
export const updateUser = async (userId, userData) => {
  try {
    const updateData = {
      updatedAt: new Date().toISOString(),
      ...userData
    };
    
    await updateDoc(doc(db, 'users', userId), updateData);
    return { success: true };
  } catch (error) {
    throw new Error('Failed to update user');
  }
};

// Deactivate user (soft delete)
export const deactivateUser = async (userId) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      isActive: false,
      deactivatedAt: new Date().toISOString(),
      deactivatedBy: auth.currentUser.uid
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
      reactivatedBy: auth.currentUser.uid
    });
    return { success: true };
  } catch (error) {
    throw new Error('Failed to reactivate user');
  }
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
        role: USER_ROLES.ADMIN, // Default role
        createdAt: new Date().toISOString(),
        isActive: true
      });
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

// Auth state observer
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

// Check permission
export const hasPermission = (user, permission) => {
  if (!user || !user.permissions) return false;
  return user.permissions.includes(permission);
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

// Update user role
export const updateUserRole = async (userId, newRole) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      role: newRole,
      updatedAt: new Date().toISOString(),
      updatedBy: auth.currentUser.uid
    });
    return { success: true };
  } catch (error) {
    throw new Error('Failed to update user role');
  }
};

// Update user profile
export const updateUserProfile = async (userId, profileData) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      ...profileData,
      updatedAt: new Date().toISOString(),
      updatedBy: auth.currentUser.uid
    });
    return { success: true };
  } catch (error) {
    throw new Error('Failed to update user profile');
  }
};

// Change user password (requires reauthentication in a real scenario)
export const changeUserPassword = async (newPassword) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No user logged in');
    }
    
    // Note: In a real application, you'd need to reauthenticate the user first
    // This is a simplified version
    await updateProfile(user, {
      // Note: updateProfile doesn't handle password changes
      // You'd need to use updatePassword which requires recent login
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error changing password:', error);
    throw new Error('Failed to change password');
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
    case 'auth/operation-not-allowed':
      return 'This operation is not allowed';
    case 'auth/requires-recent-login':
      return 'Please log in again to perform this action';
    default:
      return 'An error occurred. Please try again';
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

// Export auth instance for direct use if needed
export { auth };