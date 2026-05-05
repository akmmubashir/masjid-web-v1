import React, { useState } from 'react';
import { Plus, Shield, Edit, Trash2, Check, X, ShieldAlert } from 'lucide-react';
import { useAppStore } from '../stores';
import { Button, Card, Badge, Input, Select } from '../components/ui/Core';
import { Modal } from '../components/ui/Modal';
import { User, RoleDefinition, Permission } from '../lib/types';
import { toast } from 'sonner';
const ALL_PERMISSIONS: {
  id: Permission;
  label: string;
  group: string;
}[] = [
{
  id: 'houses.view',
  label: 'View Houses',
  group: 'Houses'
},
{
  id: 'houses.manage',
  label: 'Manage Houses',
  group: 'Houses'
},
{
  id: 'payments.view',
  label: 'View Payments',
  group: 'Payments'
},
{
  id: 'payments.manage',
  label: 'Manage Payments',
  group: 'Payments'
},
{
  id: 'announcements.view',
  label: 'View Announcements',
  group: 'Announcements'
},
{
  id: 'announcements.manage',
  label: 'Manage Announcements',
  group: 'Announcements'
},
{
  id: 'reports.view',
  label: 'View Reports',
  group: 'Reports'
},
{
  id: 'subscriptions.manage',
  label: 'Manage Subscriptions',
  group: 'System'
},
{
  id: 'users.view',
  label: 'View Users',
  group: 'System'
},
{
  id: 'users.manage',
  label: 'Manage Users',
  group: 'System'
},
{
  id: 'roles.manage',
  label: 'Manage Roles',
  group: 'System'
},
{
  id: 'settings.manage',
  label: 'Manage Settings',
  group: 'System'
}];

export function Users() {
  const {
    users,
    roles,
    addUser,
    updateUser,
    deleteUser,
    addRole,
    updateRole,
    deleteRole
  } = useAppStore();
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');
  // User Modal State
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userDraft, setUserDraft] = useState<Partial<User>>({});
  // Role Modal State
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<RoleDefinition | null>(null);
  const [roleDraft, setRoleDraft] = useState<Partial<RoleDefinition>>({});
  const handleOpenUserModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setUserDraft(user);
    } else {
      setEditingUser(null);
      setUserDraft({
        status: 'Active',
        role: 'Staff'
      });
    }
    setIsUserModalOpen(true);
  };
  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      updateUser(editingUser.id, userDraft);
      toast.success('User updated');
    } else {
      addUser({
        ...(userDraft as User),
        id: `u_${Date.now()}`,
        lastActive: new Date().toISOString()
      });
      toast.success('User added');
    }
    setIsUserModalOpen(false);
  };
  const handleDeleteUser = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      deleteUser(id);
      toast.success('User deleted');
    }
  };
  const handleOpenRoleModal = (role?: RoleDefinition) => {
    if (role) {
      setEditingRole(role);
      setRoleDraft(role);
    } else {
      setEditingRole(null);
      setRoleDraft({
        permissions: [],
        isSystem: false
      });
    }
    setIsRoleModalOpen(true);
  };
  const handleSaveRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRole) {
      updateRole(editingRole.id, roleDraft);
      toast.success('Role updated');
    } else {
      addRole({
        ...(roleDraft as RoleDefinition),
        id: `role_${Date.now()}`,
        isSystem: false
      });
      toast.success('Role added');
    }
    setIsRoleModalOpen(false);
  };
  const handleDeleteRole = (role: RoleDefinition) => {
    if (role.isSystem) {
      toast.error('Cannot delete system roles');
      return;
    }
    const usersWithRole = users.filter((u) => u.role === role.name);
    if (usersWithRole.length > 0) {
      toast.error(
        `Cannot delete role. ${usersWithRole.length} users are assigned to it.`
      );
      return;
    }
    if (confirm(`Are you sure you want to delete the ${role.name} role?`)) {
      deleteRole(role.id);
      toast.success('Role deleted');
    }
  };
  const togglePermission = (perm: Permission) => {
    const current = roleDraft.permissions || [];
    if (current.includes(perm)) {
      setRoleDraft({
        ...roleDraft,
        permissions: current.filter((p) => p !== perm)
      });
    } else {
      setRoleDraft({
        ...roleDraft,
        permissions: [...current, perm]
      });
    }
  };
  // Group permissions for rendering
  const groupedPermissions = ALL_PERMISSIONS.reduce(
    (acc, perm) => {
      if (!acc[perm.group]) acc[perm.group] = [];
      acc[perm.group].push(perm);
      return acc;
    },
    {} as Record<string, typeof ALL_PERMISSIONS>
  );
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">
            Users & Roles
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage staff access and custom permissions.
          </p>
        </div>
        <div className="flex gap-3">
          {activeTab === 'users' ?
          <Button onClick={() => handleOpenUserModal()}>
              <Plus className="mr-2 h-4 w-4" /> Add User
            </Button> :

          <Button onClick={() => handleOpenRoleModal()}>
              <Plus className="mr-2 h-4 w-4" /> Add Role
            </Button>
          }
        </div>
      </div>

      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'users' ? 'border-masjid-600 text-masjid-700 dark:text-masjid-400 dark:border-masjid-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          onClick={() => setActiveTab('users')}>
          
          Staff Users
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'roles' ? 'border-masjid-600 text-masjid-700 dark:text-masjid-400 dark:border-masjid-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          onClick={() => setActiveTab('roles')}>
          
          Roles & Permissions
        </button>
      </div>

      {activeTab === 'users' &&
      <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-medium">User</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Last Active</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {users.map((user) =>
              <tr
                key={user.id}
                className="bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-slate-800/50">
                
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-masjid-100 dark:bg-masjid-900/50 flex items-center justify-center text-masjid-700 dark:text-masjid-300 font-medium mr-3">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white">
                            {user.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                    variant={user.role === 'Admin' ? 'warning' : 'default'}>
                    
                        <Shield className="h-3 w-3 mr-1 inline" />
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                    variant={
                    user.status === 'Active' ? 'success' : 'default'
                    }>
                    
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(user.lastActive).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenUserModal(user)}>
                      
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteUser(user.id)}>
                      
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>
        </Card>
      }

      {activeTab === 'roles' &&
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role) => {
          const userCount = users.filter((u) => u.role === role.name).length;
          return (
            <Card key={role.id} className="flex flex-col">
                <div className="p-5 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-lg text-slate-900 dark:text-white flex items-center">
                      {role.name}
                      {role.isSystem &&
                    <ShieldAlert
                      className="h-4 w-4 ml-2 text-amber-500"
                      title="System Role" />

                    }
                    </h3>
                    <Badge variant="outline">{userCount} users</Badge>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 h-10 line-clamp-2">
                    {role.description}
                  </p>
                  <div className="text-xs text-slate-500">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {role.permissions.length}
                    </span>{' '}
                    permissions granted
                  </div>
                </div>
                <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex justify-end gap-2">
                  <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenRoleModal(role)}>
                  
                    {role.isSystem ? 'View' : 'Edit'}
                  </Button>
                  {!role.isSystem &&
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteRole(role)}>
                  
                      <span className="text-red-500">Delete</span>
                    </Button>
                }
                </div>
              </Card>);

        })}
        </div>
      }

      {/* User Modal */}
      {isUserModalOpen &&
      <Modal
        isOpen={true}
        onClose={() => setIsUserModalOpen(false)}
        title={editingUser ? 'Edit User' : 'Add User'}>
        
          <form onSubmit={handleSaveUser} className="space-y-4">
            <Input
            label="Full Name"
            required
            value={userDraft.name || ''}
            onChange={(e) =>
            setUserDraft({
              ...userDraft,
              name: e.target.value
            })
            } />
          
            <Input
            label="Email Address"
            type="email"
            required
            value={userDraft.email || ''}
            onChange={(e) =>
            setUserDraft({
              ...userDraft,
              email: e.target.value
            })
            } />
          
            <div className="grid grid-cols-2 gap-4">
              <Select
              label="Role"
              required
              options={roles.map((r) => ({
                label: r.name,
                value: r.name
              }))}
              value={userDraft.role || ''}
              onChange={(e) =>
              setUserDraft({
                ...userDraft,
                role: e.target.value
              })
              } />
            
              <Select
              label="Status"
              required
              options={[
              {
                label: 'Active',
                value: 'Active'
              },
              {
                label: 'Inactive',
                value: 'Inactive'
              }]
              }
              value={userDraft.status || 'Active'}
              onChange={(e) =>
              setUserDraft({
                ...userDraft,
                status: e.target.value as any
              })
              } />
            
            </div>
            <div className="pt-4 flex justify-end gap-3">
              <Button
              type="button"
              variant="ghost"
              onClick={() => setIsUserModalOpen(false)}>
              
                Cancel
              </Button>
              <Button type="submit">Save User</Button>
            </div>
          </form>
        </Modal>
      }

      {/* Role Modal */}
      {isRoleModalOpen &&
      <Modal
        isOpen={true}
        onClose={() => setIsRoleModalOpen(false)}
        title={
        editingRole ?
        editingRole.isSystem ?
        'View Role' :
        'Edit Role' :
        'Add Role'
        }>
        
          <form onSubmit={handleSaveRole} className="space-y-6">
            <div className="space-y-4">
              <Input
              label="Role Name"
              required
              disabled={editingRole?.isSystem}
              value={roleDraft.name || ''}
              onChange={(e) =>
              setRoleDraft({
                ...roleDraft,
                name: e.target.value
              })
              } />
            
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1.5">
                  Description
                </label>
                <textarea
                rows={2}
                disabled={editingRole?.isSystem}
                value={roleDraft.description || ''}
                onChange={(e) =>
                setRoleDraft({
                  ...roleDraft,
                  description: e.target.value
                })
                }
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-masjid-500 focus:border-transparent dark:text-slate-50 disabled:opacity-50" />
              
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
                Permissions
              </h4>
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                {Object.entries(groupedPermissions).map(([group, perms]) =>
              <div key={group}>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      {group}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {perms.map((perm) => {
                    const isSelected = roleDraft.permissions?.includes(
                      perm.id
                    );
                    return (
                      <label
                        key={perm.id}
                        className={`flex items-center p-2 rounded border cursor-pointer transition-colors ${isSelected ? 'border-masjid-500 bg-masjid-50 dark:bg-masjid-900/20 dark:border-masjid-500' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'} ${editingRole?.isSystem ? 'opacity-75 cursor-not-allowed' : ''}`}>
                        
                            <div
                          className={`w-4 h-4 rounded border flex items-center justify-center mr-2 ${isSelected ? 'bg-masjid-600 border-masjid-600 text-white' : 'border-slate-300 dark:border-slate-600'}`}>
                          
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                            <input
                          type="checkbox"
                          className="hidden"
                          checked={isSelected}
                          disabled={editingRole?.isSystem}
                          onChange={() => togglePermission(perm.id)} />
                        
                            <span className="text-sm text-slate-700 dark:text-slate-300">
                              {perm.label}
                            </span>
                          </label>);

                  })}
                    </div>
                  </div>
              )}
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
              <Button
              type="button"
              variant="ghost"
              onClick={() => setIsRoleModalOpen(false)}>
              
                {editingRole?.isSystem ? 'Close' : 'Cancel'}
              </Button>
              {!editingRole?.isSystem &&
            <Button type="submit">Save Role</Button>
            }
            </div>
          </form>
        </Modal>
      }
    </div>);

}