import React, { useState, useEffect } from 'react';
import { 
  getAllUsers, 
  createUser, 
  updateUserRole, 
  USER_ROLES, 
  ROLE_PERMISSIONS,
  PERMISSIONS,
  hasPermission 
} from '../../firebase/services/authService';
import { getCurrentUser } from '../../firebase/services/authService';
import styles from './UserManagement.module.css';

const UserManagement = ({ onBackToDashboard }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    role: USER_ROLES.VIEWER
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!hasPermission(currentUser, PERMISSIONS.CREATE_USERS)) {
      setError('You do not have permission to create users');
      return;
    }

    try {
      await createUser(formData);
      setSuccess('User created successfully');
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
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    if (!hasPermission(currentUser, PERMISSIONS.EDIT_USERS)) {
      setError('You do not have permission to edit users');
      return;
    }

    try {
      await updateUserRole(userId, newRole);
      setSuccess('User role updated successfully');
      loadUsers();
    } catch (error) {
      setError(error.message);
    }
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case USER_ROLES.SUPER_ADMIN:
        return styles.roleSuperAdmin;
      case USER_ROLES.ADMIN:
        return styles.roleAdmin;
      case USER_ROLES.MANAGER:
        return styles.roleManager;
      case USER_ROLES.SUPPORT:
        return styles.roleSupport;
      default:
        return styles.roleViewer;
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
          <button onClick={() => setSuccess('')} className={styles.closeSuccess}>×</button>
        </div>
      )}

      <div className={styles.actionsBar}>
        {hasPermission(currentUser, PERMISSIONS.CREATE_USERS) && (
          <button 
            className={styles.createButton}
            onClick={() => setShowCreateModal(true)}
          >
            + Create New User
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
                {hasPermission(currentUser, PERMISSIONS.EDIT_USERS) && 
                 currentUser.uid !== user.id && (
                  <select 
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className={styles.roleSelect}
                  >
                    {Object.values(USER_ROLES).map(role => (
                      <option key={role} value={role}>
                        {getRoleDisplayName(role)}
                      </option>
                    ))}
                  </select>
                )}
                {currentUser.uid === user.id && (
                  <span className={styles.currentUserBadge}>You</span>
                )}
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
                onClick={() => setShowCreateModal(false)}
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
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
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
                />
              </div>

              <div className={styles.formGroup}>
                <label>Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  {Object.values(USER_ROLES)
                    .filter(role => role !== USER_ROLES.SUPER_ADMIN) // Prevent creating super admins
                    .map(role => (
                    <option key={role} value={role}>
                      {getRoleDisplayName(role)}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;