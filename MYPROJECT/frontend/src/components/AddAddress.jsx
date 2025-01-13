import React from 'react';
import { useForm } from 'react-hook-form';
import Axios from '../utils/Axios';
import toast from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';
import { useGlobalContext } from '../provider/GlobalProvider';

const AddAddress = ({ close }) => {
    const { register, handleSubmit, reset } = useForm();
    const { fetchAddress } = useGlobalContext();

    const onSubmit = async (data) => {
        try {
            const response = await Axios.post('/api/address/create', {
                address_line: data.addressline,
                city: data.city,
                state: data.state,
                country: data.country,
                pincode: data.pincode,
                mobile: data.mobile,
            });

            if (response.data.success) {
                toast.success(response.data.message);
                close();
                reset();
                fetchAddress();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add address');
        }
    };

    return (
        <section className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg">Add Address</h2>
                    <button onClick={close} className="text-red-500">
                        <IoClose size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                    {[
                        { label: 'Address Line', id: 'addressline' },
                        { label: 'City', id: 'city' },
                        { label: 'State', id: 'state' },
                        { label: 'Pincode', id: 'pincode' },
                        { label: 'Country', id: 'country' },
                        { label: 'Mobile No.', id: 'mobile' },
                    ].map(({ label, id }) => (
                        <div key={id} className="grid gap-1">
                            <label htmlFor={id}>{label}:</label>
                            <input
                                type="text"
                                id={id}
                                {...register(id, { required: true })}
                                className="border bg-blue-50 p-2 rounded"
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddAddress;
