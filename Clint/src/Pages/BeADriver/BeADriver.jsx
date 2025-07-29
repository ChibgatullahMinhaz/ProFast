import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';

const BeADriver = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // TanStack Mutation
    const { mutate, isPending } = useMutation({
        mutationFn: async (agentData) => {
            const res = await axios.post('/api/agents/apply', agentData); // 🔄 change to your endpoint
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({
                icon: 'success',
                title: 'Application Submitted!',
                text: 'Admin will review and get back to you shortly.',
            });
            reset();
        },
        onError: () => {
            Swal.fire({
                icon: 'error',
                title: 'Submission Failed',
                text: 'Please try again later.',
            });
        }
    });

    const onSubmit = (data) => {
        mutate(data);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 bg-white my-10 p-2 rounded-2xl bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat ">
            {/* Title */}
            <div className="mb-10 text-left">
                <h2 className="text-3xl font-bold text-gray-800">Become a Delivery Agent</h2>
                <p className="text-gray-500">Submit your details to join our logistics team</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                {/* Left: Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label className="label block">Full Name</label>
                            <input {...register('name', { required: true })} className="input border border-gray-400 rounded-lg w-full " placeholder="Enter your name" />
                            {errors.name && <p className="text-sm text-red-500">Name is required</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="label">Email</label>
                            <input type="email" {...register('email', { required: true })} className="input w-full border border-gray-400 rounded-lg" placeholder="Email address" />
                            {errors.email && <p className="text-sm text-red-500">Email is required</p>}
                        </div>

                        {/* Contact */}
                        <div>
                            <label className="label">Contact Number</label>
                            <input {...register('contact', { required: true })} className="input border border-gray-400 rounded-lg w-full " placeholder="Phone number" />
                            {errors.contact && <p className="text-sm text-red-500">Contact is required</p>}
                        </div>

                        {/* Religion */}
                        <div>
                            <label className="label">Religion</label>
                            <input {...register('religion', { required: true })} className="input border border-gray-400 rounded-lg w-full " placeholder="Your religion" />
                            {errors.religion && <p className="text-sm text-red-500">Religion is required</p>}
                        </div>

                        {/* Age */}
                        <div>
                            <label className="label">Age</label>
                            <input type="number" {...register('age', { required: true })} className="input border border-gray-400 rounded-lg w-full " placeholder="Your age" />
                            {errors.age && <p className="text-sm text-red-500">Age is required</p>}
                        </div>

                        {/* NID */}
                        <div>
                            <label className="label">NID Number</label>
                            <input {...register('nid', { required: true })} className="input border border-gray-400 rounded-lg w-full " placeholder="National ID Number" />
                            {errors.nid && <p className="text-sm text-red-500">NID is required</p>}
                        </div>

                        {/* Warehouse Preference */}
                        <div className="md:col-span-2">
                            <label className="label">Preferred Warehouse</label>
                            <select {...register('warehouse', { required: true })} className="select border border-gray-400 rounded-lg w-full">
                                <option value="">Select a warehouse</option>
                                <option value="Mirpur">Mirpur</option>
                                <option value="Uttara">Uttara</option>
                                <option value="Dhanmondi">Dhanmondi</option>
                                <option value="Gulshan">Gulshan</option>
                            </select>
                            {errors.warehouse && <p className="text-sm text-red-500">Please select a warehouse</p>}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-left">
                        <button className="btn btn-primary border-none bg-[#C4E970] rounded-lg" disabled={isPending}>
                            {isPending ? 'Submitting...' : 'Submit Application'}
                        </button>
                    </div>
                </form>

                {/* Right: Image */}
                <div className="hidden lg:block ">
                    <img
                        src="https://images.unsplash.com/photo-1603785224384-ec64ecb46f85?auto=format&fit=crop&w=700&q=80"
                        alt="Delivery agent"
                        className="rounded-xl shadow-md"
                    />
                    
                </div>
            </div>
        </div>
    );
};

export default BeADriver;
