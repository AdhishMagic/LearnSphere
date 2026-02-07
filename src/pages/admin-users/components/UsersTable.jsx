import React from 'react';
import UserRow from './UserRow';

const UsersTable = ({ users, onEdit, onDelete, onChangeRole, onToggleStatus }) => {
    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-muted/50 border-b border-border">
                            <th className="p-4 font-semibold text-foreground text-sm">User</th>
                            <th className="p-4 font-semibold text-foreground text-sm">Role</th>
                            <th className="p-4 font-semibold text-foreground text-sm">Status</th>
                            <th className="p-4 font-semibold text-foreground text-sm">Joined Date</th>
                            <th className="p-4 font-semibold text-foreground text-sm text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <UserRow
                                    key={user.id}
                                    user={user}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    onChangeRole={onChangeRole}
                                    onToggleStatus={onToggleStatus}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-muted-foreground">
                                    No users found matching your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersTable;
