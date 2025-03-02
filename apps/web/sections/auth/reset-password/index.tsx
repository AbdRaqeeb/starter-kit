'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';

// Define validation schema
const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .regex(/[0-9]/, 'Password must contain at least one number')
            .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
        confirmPassword: z.string().min(1, 'Please confirm your password'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = (data: ResetPasswordFormData) => {
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            console.log('Reset password submitted:', data);
            // Redirect to login page or show success message
        }, 1500);
    };

    return (
        <Card className='w-full max-w-md'>
            <CardHeader className='space-y-1'>
                <CardTitle className='text-2xl font-bold text-center'>Reset your password</CardTitle>
                <CardDescription className='text-center'>Create a new password for your account</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='password'>New Password</Label>
                            <Input
                                id='password'
                                placeholder='••••••••'
                                type='password'
                                className={errors.password ? 'border-red-500' : ''}
                                {...register('password')}
                            />
                            {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='confirmPassword'>Confirm New Password</Label>
                            <Input
                                id='confirmPassword'
                                placeholder='••••••••'
                                type='password'
                                className={errors.confirmPassword ? 'border-red-500' : ''}
                                {...register('confirmPassword')}
                            />
                            {errors.confirmPassword && (
                                <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword.message}</p>
                            )}
                        </div>
                        <div className='bg-amber-50 border border-amber-200 text-amber-800 rounded-md p-4 text-sm flex items-start dark:bg-amber-950 dark:border-amber-900 dark:text-amber-200'>
                            <AlertCircle className='h-5 w-5 mr-2 flex-shrink-0' />
                            <div>
                                <p className='font-medium'>Password requirements:</p>
                                <ul className='list-disc list-inside mt-1'>
                                    <li>At least 8 characters</li>
                                    <li>At least one uppercase letter</li>
                                    <li>At least one number</li>
                                    <li>At least one special character</li>
                                </ul>
                            </div>
                        </div>
                        <Button type='submit' className='w-full' disabled={isLoading}>
                            {isLoading ? 'Resetting...' : 'Reset password'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
