import React, { useState, useEffect } from 'react';
import { 
  getAllUsers, 
  createUser, 
  updateUserRole, 
  deleteUser,
  USER_ROLES, 
  PERMISSIONS,
  hasPermission 
} from '../../firebase/services/authService';
import { getCurrentUser, logoutUser } from '../../firebase/services/authService';
import styles from './UserManagement.module.css';

const UserManagement = ({ onBackToDashboard }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    role: USER_ROLES.VIEWER
  });
  const [editFormData, setEditFormData] = useState({
    displayName: '',
    role: USER_ROLES.VIEWER
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [updatingUser, setUpdatingUser] = useState(false);
  const [deletingUser, setDeletingUser] = useState(false);
  const [updatingRole, setUpdatingRole] = useState(null);
  const [showRefreshPrompt, setShowRefreshPrompt] = useState(false);

  useEffect(() => {
    loadCurrentUser();
    loadUsers();
  }, []);

  const loadCurrentUser = async () => {
    const user = await getCurrentUser();
    setCurrentUser(user);
  };

  const loadUsers = async () => {
    setLoading(true);
    try {
      const usersList = await getAllUsers();
      setUsers(usersList);
    } catch (error) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const superAdminExists = () => {
    return users.some(user => user.role === USER_ROLES.SUPER_ADMIN);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setCreatingUser(true);

    if (!hasPermission(currentUser, PERMISSIONS.CREATE_USERS)) {
      setError('You do not have permission to create users');
      setCreatingUser(false);
      return;
    }

    // Prevent creating super admin if one already exists
    if (formData.role === USER_ROLES.SUPER_ADMIN && superAdminExists()) {
      setError('A Super Admin already exists. Only one Super Admin is allowed.');
      setCreatingUser(false);
      return;
    }

    try {
      const result = await createUser(formData, currentUser);
      
      if (result.requiresRefresh) {
        setSuccess(result.message);
        setShowRefreshPrompt(true);
      } else {
        setSuccess('User created successfully!');
      }
      
      setShowCreateModal(false);
      setFormData({
        email: '',
        password: '',
        displayName: '',
        role: USER_ROLES.VIEWER
      });
      loadUsers();
    } catch (error) {
      setError(error.message);
    } finally {
      setCreatingUser(false);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditFormData({
      displayName: user.displayName || '',
      role: user.role
    });
    setShowEditModal(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setUpdatingUser(true);

    if (!hasPermission(currentUser, PERMISSIONS.EDIT_USERS)) {
      setError('You do not have permission to edit users');
      setUpdatingUser(false);
      return;
    }

    // Prevent changing role to super admin if one already exists and it's not the current super admin
    if (editFormData.role === USER_ROLES.SUPER_ADMIN && 
        selectedUser.role !== USER_ROLES.SUPER_ADMIN && 
        superAdminExists()) {
      setError('A Super Admin already exists. Only one Super Admin is allowed.');
      setUpdatingUser(false);
      return;
    }

    try {
      await updateUserRole(selectedUser.id, editFormData.role);
      setSuccess('User updated successfully');
      setShowEditModal(false);
      setSelectedUser(null);
      loadUsers();
    } catch (error) {
      setError(error.message);
    } finally {
      setUpdatingUser(false);
    }
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleDeleteUser = async () => {
    setError('');
    setSuccess('');
    setDeletingUser(true);

    if (!hasPermission(currentUser, PERMISSIONS.DELETE_USERS)) {
      setError('You do not have permission to delete users');
      setShowDeleteModal(false);
      setDeletingUser(false);
      return;
    }

    // Prevent deleting yourself
    if (selectedUser.id === currentUser.uid) {
      setError('You cannot delete your own account');
      setShowDeleteModal(false);
      setDeletingUser(false);
      return;
    }

    // Prevent deleting super admin
    if (selectedUser.role === USER_ROLES.SUPER_ADMIN) {
      setError('Cannot delete Super Admin account');
      setShowDeleteModal(false);
      setDeletingUser(false);
      return;
    }

    try {
      await deleteUser(selectedUser.id);
      setSuccess('User deleted successfully');
      setShowDeleteModal(false);
      setSelectedUser(null);
      loadUsers();
    } catch (error) {
      setError(error.message);
    } finally {
      setDeletingUser(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    setError('');
    setSuccess('');
    setUpdatingRole(userId);

    if (!hasPermission(currentUser, PERMISSIONS.EDIT_USERS)) {
      setError('You do not have permission to edit users');
      setUpdatingRole(null);
      return;
    }

    // Prevent changing role to super admin if one already exists
    const user = users.find(u => u.id === userId);
    if (newRole === USER_ROLES.SUPER_ADMIN && 
        user.role !== USER_ROLES.SUPER_ADMIN && 
        superAdminExists()) {
      setError('A Super Admin already exists. Only one Super Admin is allowed.');
      setUpdatingRole(null);
      return;
    }

    try {
      await updateUserRole(userId, newRole);
      setSuccess('User role updated successfully');
      loadUsers();
    } catch (error) {
      setError(error.message);
    } finally {
      setUpdatingRole(null);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleLogoutAndRefresh = async () => {
    try {
      await logoutUser();
      window.location.reload();
    } catch (error) {
      setError('Failed to logout: ' + error.message);
    }
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case USER_ROLES.SUPER_ADMIN: return styles.roleSuperAdmin;
      case USER_ROLES.ADMIN: return styles.roleAdmin;
      case USER_ROLES.MANAGER: return styles.roleManager;
      case USER_ROLES.SUPPORT: return styles.roleSupport;
      default: return styles.roleViewer;
    }
  };

  const getRoleDisplayName = (role) => {
    const names = {
      [USER_ROLES.SUPER_ADMIN]: 'Super Admin',
      [USER_ROLES.ADMIN]: 'Admin',
      [USER_ROLES.MANAGER]: 'Manager',
      [USER_ROLES.SUPPORT]: 'Support',
      [USER_ROLES.VIEWER]: 'Viewer'
    };
    return names[role] || role;
  };

  const getAvailableRoles = (user = null) => {
    const roles = Object.values(USER_ROLES);
    
    if (superAdminExists()) {
      if (user && user.role === USER_ROLES.SUPER_ADMIN) {
        return roles;
      }
      return roles.filter(role => role !== USER_ROLES.SUPER_ADMIN);
    }
    
    return roles;
  };

  if (loading) {
    return <div className={styles.loading}>Loading users...</div>;
  }

  return (
    <div className={styles.userManagement}>
      <div className={styles.header}>
        <h1>User Management</h1>
        <p>Manage admin users and their permissions</p>
      </div>

      {error && (
        <div className={styles.errorMessage}>
          {error}
          <button onClick={() => setError('')} className={styles.closeError}>×</button>
        </div>
      )}

      {success && (
        <div className={styles.successMessage}>
          {success}
          {showRefreshPrompt && (
            <div className={styles.refreshActions}>
              <button onClick={handleRefresh} className={styles.refreshButton}>
                Refresh Page
              </button>
              <button onClick={handleLogoutAndRefresh} className={styles.logoutButton}>
                Logout & Refresh
              </button>
            </div>
          )}
          <button onClick={() => {
            setSuccess('');
            setShowRefreshPrompt(false);
          }} className={styles.closeSuccess}>×</button>
        </div>
      )}

      <div className={styles.actionsBar}>
        {hasPermission(currentUser, PERMISSIONS.CREATE_USERS) && (
          <button 
            className={styles.createButton}
            onClick={() => setShowCreateModal(true)}
            disabled={creatingUser}
          >
            {creatingUser ? 'Creating...' : '+ Create New User'}
          </button>
        )}
      </div>

      <div className={styles.usersGrid}>
        <div className={styles.tableHeader}>
          <div className={styles.tableRow}>
            <div className={styles.colName}>User</div>
            <div className={styles.colEmail}>Email</div>
            <div className={styles.colRole}>Role</div>
            <div className={styles.colStatus}>Status</div>
            <div className={styles.colActions}>Actions</div>
          </div>
        </div>

        <div className={styles.tableBody}>
          {users.map(user => (
            <div key={user.id} className={styles.tableRow}>
              <div className={styles.colName}>
                <div className={styles.userInfo}>
                  <div className={styles.avatar}>
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className={styles.userDetails}>
                    <div className={styles.userName}>{user.displayName || 'No Name'}</div>
                    <div className={styles.userId}>ID: {user.id.substring(0, 8)}...</div>
                  </div>
                </div>
              </div>
              <div className={styles.colEmail}>{user.email}</div>
              <div className={styles.colRole}>
                <span className={`${styles.roleBadge} ${getRoleBadgeClass(user.role)}`}>
                  {getRoleDisplayName(user.role)}
                </span>
              </div>
              <div className={styles.colStatus}>
                <span className={user.isActive ? styles.statusActive : styles.statusInactive}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className={styles.colActions}>
                <div className={styles.actionButtons}>
                  {hasPermission(currentUser, PERMISSIONS.EDIT_USERS) && (
                    <button
                      className={styles.editButton}
                      onClick={() => handleEditUser(user)}
                      title="Edit User"
                      disabled={updatingUser || deletingUser}
                    >
                      Edit
                    </button>
                  )}
                  
                  {hasPermission(currentUser, PERMISSIONS.EDIT_USERS) && 
                   currentUser.uid !== user.id && (
                    <select 
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className={styles.roleSelect}
                      disabled={updatingRole === user.id}
                    >
                      {getAvailableRoles(user).map(role => (
                        <option key={role} value={role}>
                          {updatingRole === user.id && role === user.role ? 'Updating...' : getRoleDisplayName(role)}
                        </option>
                      ))}
                    </select>
                  )}
                  
                  {hasPermission(currentUser, PERMISSIONS.DELETE_USERS) && 
                   currentUser.uid !== user.id && 
                   user.role !== USER_ROLES.SUPER_ADMIN && (
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteClick(user)}
                      title="Delete User"
                      disabled={deletingUser}
                    >
                      Delete
                    </button>
                  )}
                  
                  {currentUser.uid === user.id && (
                    <span className={styles.currentUserBadge}>You</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Create New User</h2>
              <button 
                className={styles.closeButton}
                onClick={() => !creatingUser && setShowCreateModal(false)}
                disabled={creatingUser}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateUser} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Display Name</label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                  required
                  disabled={creatingUser}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  disabled={creatingUser}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                  minLength="6"
                  disabled={creatingUser}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  disabled={creatingUser}
                >
                  {getAvailableRoles().map(role => (
                    <option key={role} value={role}>
                      {getRoleDisplayName(role)}
                    </option>
                  ))}
                </select>
                {superAdminExists() && (
                  <p className={styles.roleNote}>
                    Note: Super Admin role is not available as one already exists.
                  </p>
                )}
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setShowCreateModal(false)}
                  disabled={creatingUser}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={creatingUser}
                >
                  {creatingUser ? (
                    <span className={styles.buttonLoading}>
                      <span className={styles.spinner}></span>
                      Creating...
                    </span>
                  ) : (
                    'Create User'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Edit User</h2>
              <button 
                className={styles.closeButton}
                onClick={() => !updatingUser && setShowEditModal(false)}
                disabled={updatingUser}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label>Display Name</label>
                <input
                  type="text"
                  value={editFormData.displayName}
                  onChange={(e) => setEditFormData({...editFormData, displayName: e.target.value})}
                  required
                  disabled={updatingUser}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  value={selectedUser.email}
                  disabled
                  className={styles.disabledInput}
                />
                <p className={styles.fieldNote}>Email cannot be changed</p>
              </div>

              <div className={styles.formGroup}>
                <label>Role</label>
                <select
                  value={editFormData.role}
                  onChange={(e) => setEditFormData({...editFormData, role: e.target.value})}
                  disabled={updatingUser}
                >
                  {getAvailableRoles(selectedUser).map(role => (
                    <option key={role} value={role}>
                      {getRoleDisplayName(role)}
                    </option>
                  ))}
                </select>
                {superAdminExists() && selectedUser.role !== USER_ROLES.SUPER_ADMIN && (
                  <p className={styles.roleNote}>
                    Note: Super Admin role is not available as one already exists.
                  </p>
                )}
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setShowEditModal(false)}
                  disabled={updatingUser}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={updatingUser}
                >
                  {updatingUser ? (
                    <span className={styles.buttonLoading}>
                      <span className={styles.spinner}></span>
                      Updating...
                    </span>
                  ) : (
                    'Update User'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Delete User</h2>
              <button 
                className={styles.closeButton}
                onClick={() => !deletingUser && setShowDeleteModal(false)}
                disabled={deletingUser}
              >
                ×
              </button>
            </div>

            <div className={styles.modalContent}>
              <div className={styles.deleteWarning}>
                ⚠️
              </div>
              <p>Are you sure you want to delete this user?</p>
              <div className={styles.userToDelete}>
                <strong>{selectedUser.displayName || 'No Name'}</strong>
                <span>{selectedUser.email}</span>
                <span className={styles.userRole}>{getRoleDisplayName(selectedUser.role)}</span>
              </div>
              <p className={styles.deleteNote}>
                This action cannot be undone. The user will be permanently removed.
              </p>
            </div>

            <div className={styles.modalActions}>
              <button
                className={styles.cancelButton}
                onClick={() => setShowDeleteModal(false)}
                disabled={deletingUser}
              >
                Cancel
              </button>
              <button
                className={styles.deleteConfirmButton}
                onClick={handleDeleteUser}
                disabled={deletingUser}
              >
                {deletingUser ? (
                  <span className={styles.buttonLoading}>
                    <span className={styles.spinner}></span>
                    Deleting...
                  </span>
                ) : (
                  'Delete User'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;