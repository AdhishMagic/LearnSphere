import React from 'react';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import Icon from '../../../components/AppIcon';

const UserRow = ({ user, onEdit, onDelete, onChangeRole, onToggleStatus }) => {

    const getRoleBadgeVariant = (role) => {
        switch (role) {
            case 'admin': return 'primary'; // Purple for Admin
            case 'instructor': return 'success'; // Green for Instructor
            case 'learner': return 'secondary'; // Gray/Default for Learner
            default: return 'secondary';
        }
    };

    const getStatusBadgeVariant = (status) => {
        return status === 'active' ? 'success' : 'danger';
    };

    return (
        <tr className="border-b border-border hover:bg-muted/30 transition-colors">
            {/* User Info */}
            <td className="p-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            user.name.charAt(0)
                        )}
                    </div>
                    <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                </div>
            </td>

            {/* Role */}
            <td className="p-4">
                <Badge variant={getRoleBadgeVariant(user.role)}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
            </td>

            {/* Status */}
            <td className="p-4">
                <Badge variant={getStatusBadgeVariant(user.status)}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </Badge>
            </td>

            {/* Joined Date */}
            <td className="p-4 text-sm text-muted-foreground">
                {new Date(user.joinedDate).toLocaleDateString()}
            </td>

            {/* Actions */}
            <td className="p-4">
                <div className="flex items-center gap-2 justify-end">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onToggleStatus(user)}
                        title={user.status === 'active' ? 'Disable Account' : 'Activate Account'}
                    >
                        <Icon name={user.status === 'active' ? 'Ban' : 'CheckCircle'} size={16} className={user.status === 'active' ? 'text-destructive' : 'text-success'} />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onChangeRole(user)}
                        title="Change Role"
                    >
                        <Icon name="Shield" size={16} className="text-primary" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(user)}
                        title="Edit User"
                    >
                        <Icon name="Edit" size={16} />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(user)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        title="Delete User"
                    >
                        <Icon name="Trash2" size={16} />
                    </Button>
                </div>
            </td>
        </tr>
    );
};

export default UserRow;
