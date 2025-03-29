'use client'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Zod schema validation for each step
const phoneSchema = z.object({
    phoneNumber: z.string().min(10, 'Please enter 10 digits phone number').regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
});

const otpSchema = z.object({
    otp: z.string().length(6, 'OTP must be 6 digits').regex(/^\d+$/, 'OTP must only contain numbers'),
});

const passwordSchema = z.object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

type PhoneFormData = z.infer<typeof phoneSchema>;
type OtpFormData = z.infer<typeof otpSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // Step control for the different phases

    // Phone form hook
    const {
        register: phoneRegister,
        handleSubmit: handlePhoneSubmit,
        formState: { errors: phoneErrors },
        setValue: setPhoneValue,
        watch: watchPhone,
    } = useForm<PhoneFormData>({
        resolver: zodResolver(phoneSchema),
    });

    // OTP form hook
    const {
        register: otpRegister,
        handleSubmit: handleOtpSubmit,
        formState: { errors: otpErrors },
    } = useForm<OtpFormData>({
        resolver: zodResolver(otpSchema),
    });

    // Password form hook
    const {
        register: passwordRegister,
        handleSubmit: handlePasswordSubmit,
        formState: { errors: passwordErrors },
    } = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
    });

    const onPhoneSubmit = (data: PhoneFormData) => {
        console.log('Phone number submitted:', data);
        setStep(2); // Move to OTP step
    };

    const onOtpSubmit = (data: OtpFormData) => {
        console.log('OTP submitted:', data);
        setStep(3); // Move to password reset step
    };
    const router = useRouter()
    const onPasswordSubmit = (data: PasswordFormData) => {
        console.log('Password submitted:', data);
        router.push('/sign-in')
    };

    return (
        <div className="relative h-screen w-full bg-cover bg-center" style={{ backgroundImage: "url('/assets/bg-crafto.png')" }}>
            <div className="flex justify-center items-center h-full">
                {/* Full-screen step containers with framer-motion animations */}
                <motion.div
                    className="w-full  max-w-md bg-white/90 p-10 rounded-3xl shadow-lg flex justify-center items-center"
                    key={step}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                >
                    {step === 1 && (
                        <div className="w-full">
                            <div className="mb-8 text-center">
                                <img src="/assets/logo-cropped.png" alt="Logo" className="w-40 mx-auto" />
                            </div>
                            <h2 className="text-center text-3xl font-semibold mb-6">Forgot Password</h2>
                            <form onSubmit={handlePhoneSubmit(onPhoneSubmit)}>
                                <div className="mb-6">
                                    <PhoneInput
                                        international
                                        defaultCountry="IN"
                                        value={watchPhone('phoneNumber')}
                                        onChange={(value) => setPhoneValue('phoneNumber', value || '')}
                                        className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                                    />
                                    {phoneErrors.phoneNumber ? (
                                        <p className="text-red-500 text-sm">{phoneErrors.phoneNumber.message}</p>
                                    ) : (<span className='ml-2 text-sm font-sans'>Enter your registered phone number</span>)}

                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-[#fd4878] text-white font-semibold rounded-md hover:bg-[#d7043e] transition"
                                >
                                    Send OTP
                                </button>
                            </form>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="w-full">
                            <div className="mb-8 text-center">
                                <img src="/assets/logo-cropped.png" alt="Logo" className="w-40 mx-auto" />
                            </div>
                            <h2 className="text-center text-3xl font-semibold mb-6">Enter OTP</h2>
                            <p className="text-center text-sm mb-6">Enter the OTP sent to your mobile number</p>
                            <form onSubmit={handleOtpSubmit(onOtpSubmit)}>
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
                                        {...otpRegister('otp')}
                                        className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                                    />
                                    {otpErrors.otp && (
                                        <p className="text-red-500 text-sm">{otpErrors.otp.message}</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-[#fd4878] text-white font-semibold rounded-md hover:bg-[#d7043e] transition"
                                >
                                    Verify OTP
                                </button>
                            </form>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="w-full">
                            <div className="mb-8 text-center">
                                <img src="/assets/logo-cropped.png" alt="Logo" className="w-40 mx-auto" />
                            </div>
                            <h2 className="text-center text-3xl font-semibold mb-6">Create New Password</h2>
                            <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
                                <div className="mb-6">
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        {...passwordRegister('password')}
                                        className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                                    />
                                    {passwordErrors.password && (
                                        <p className="text-red-500 text-sm">{passwordErrors.password.message}</p>
                                    )}
                                </div>
                                <div className="mb-6">
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        {...passwordRegister('confirmPassword')}
                                        className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                                    />
                                    {passwordErrors.confirmPassword && (
                                        <p className="text-red-500 text-sm">{passwordErrors.confirmPassword.message}</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-[#fd4878] text-white font-semibold rounded-md hover:bg-[#d7043e] transition"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default ForgotPassword;
