import * as React from 'react';
import {FC} from 'react';
import Dialog from '@mui/material/Dialog';
import {UserDetailsForAdmin} from "@/apis/models.d";

interface IAccountDetailsDialogProps {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    user: UserDetailsForAdmin
}

const AccountDetailsDialog: FC<IAccountDetailsDialogProps> = ({isOpen, setOpen, user}) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog
                open={isOpen}
                onClose={handleClose}
            >
                <div
                    className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 space-y-6 transition-all
                    duration-200 hover:shadow-xl mx-auto md:max-w-2xl lg:max-w-6xl">
                    <div
                        className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 space-y-4 md:space-y-0">
                        <h2 className="text-2xl font-bold text-gray-900">{user.fullName}</h2>
                        <span
                            className={`text-sm font-semibold px-3 py-1 rounded-full ${
                                user.role === 'ADMIN'
                                    ? 'bg-blue-200 text-blue-700'
                                    : user.role === 'DENTIST'
                                        ? 'bg-green-200 text-green-700'
                                        : 'bg-yellow-200 text-yellow-700'
                            }`}
                        >
                            {user.role}
                        </span>
                    </div>

                    {/* Common Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex items-center">
                            <i className="fas fa-user text-gray-500 w-6"></i>
                            <div className="ml-3">
                                <p className="text-sm text-gray-500">Username</p>
                                <p className="text-lg font-medium text-gray-800">{user.username}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-envelope text-gray-500 w-6"></i>
                            <div className="ml-3">
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="text-lg font-medium text-gray-800 break-all">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-phone text-gray-500 w-6"></i>
                            <div className="ml-3">
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="text-lg font-medium text-gray-800">{user.phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Role-specific Details */}
                    {user.dentist && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">Dentist Details</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex items-center">
                                    <i className="fas fa-envelope text-gray-500 w-6"></i>
                                    <div className="ml-3">
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="text-lg font-medium text-gray-800 break-all">{user.dentist.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <i className="fas fa-phone text-gray-500 w-6"></i>
                                    <div className="ml-3">
                                        <p className="text-sm text-gray-500">Phone Number</p>
                                        <p className="text-lg font-medium text-gray-800 break-all">{user.dentist.phoneNumber}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <i className="fas fa-tooth text-gray-500 w-6"></i>
                                    <div className="ml-3">
                                        <p className="text-sm text-gray-500">Specialize</p>
                                        <p className="text-lg font-medium text-gray-800 break-all">{user.dentist.specialize.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center w-full">
                                    <i className="fas fa-info-circle text-gray-500 w-6"></i>
                                    <div className="flex-1 w-full">
                                        <p className="text-sm text-gray-500">Description</p>
                                        <p className="text-gray-800 w-full">
                                            <textarea className={"w-full p-2 rounded h-28"} disabled={true}>
                                                {user.dentist.description}
                                            </textarea>
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}

                    {user.accountant && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800">Accountant Details</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex items-center">
                                    <i className="fas fa-envelope text-gray-500 w-6"></i>
                                    <div className="ml-3">
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="text-lg font-medium text-gray-800 break-all">{user.accountant.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <i className="fas fa-phone text-gray-500 w-6"></i>
                                    <div className="ml-3">
                                        <p className="text-sm text-gray-500">Phone Number</p>
                                        <p className="text-lg font-medium text-gray-800 break-all">{user.accountant.phoneNumber}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </Dialog>
        </React.Fragment>
    );
}
export default AccountDetailsDialog