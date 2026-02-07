import React, { useState, useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { MOCK_ROLES } from '../mockData';

const ChangeRoleModal = ({ isOpen, onClose, onConfirm, user }) => {
    const [selectedRole, setSelectedRole] = useState('');

    useEffect(() => {
        if (user) {
            setSelectedRole(user.role);
        }
    }, [user]);

    if (!isOpen || !user) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedRole && selectedRole !== user.role) {
            onConfirm(user.id, selectedRole);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-elevation-2 animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <h2 className="text-lg font-semibold text-foreground">Change Role</h2>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 flex items-start gap-3">
                        <AlertTriangle className="text-warning shrink-0 mt-0.5" size={18} />
                        <div className="text-sm text-warning-foreground">
                            <p className="font-medium">Warning</p>
                            <p>Changing a user's role allows or restricts their access to sensitive platform features. Please proceed with caution.</p>
                        </div>
                    </div>

                    <div className="p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm font-medium text-foreground">User: <span className="font-normal">{user.name}</span></p>
                        <p className="text-sm font-medium text-foreground">Current Role: <span className="font-normal capitalize">{user.role}</span></p>
                    </div>

                    <div>
                        <Select
                            label="New Role"
                            options={MOCK_ROLES}
                            value={selectedRole}
                            onChange={setSelectedRole}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={selectedRole === user.role}
                        >
                            Update Role
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangeRoleModal;
