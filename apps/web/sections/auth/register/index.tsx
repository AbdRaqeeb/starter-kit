'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import NextLink from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { PATH_AUTH } from '@/routes';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';

// Define validation schema
const registerSchema = z
    .object({
        firstName: z.string().min(1, 'First name is required'),
        lastName: z.string().min(1, 'Last name is required'),
        email: z.string().email('Please enter a valid email address'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
            .regex(/[0-9]/, 'Password must contain at least one number'),
        confirmPassword: z.string().min(1, 'Please confirm your password'),
        terms: z.boolean().refine((val) => val === true, {
            message: 'You must accept the terms and conditions',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: false,
        },
    });

    const onSubmit = (data: RegisterFormData) => {
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            console.log('Signup submitted', data);
            // Redirect or show success message
        }, 1500);
    };

    return (
        <Card className='w-full max-w-md shadow-sm border border-gray-200'>
            <CardHeader className='pb-2'>
                <CardTitle className='text-2xl font-semibold'>Create an account</CardTitle>
                <CardDescription>Enter your information to create your account</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    <div className='space-y-1'>
                        <Label htmlFor='firstName'>First name</Label>
                        <Input
                            id='firstName'
                            placeholder='John'
                            className={`h-10 ${errors.firstName ? 'border-red-500' : ''}`}
                            {...register('firstName')}
                        />
                        {errors.firstName && (
                            <p className='text-red-500 text-sm mt-1'>{errors.firstName.message}</p>
                        )}
                    </div>
                    <div className='space-y-1'>
                        <Label htmlFor='lastName'>Last name</Label>
                        <Input
                            id='lastName'
                            placeholder='Doe'
                            className={`h-10 ${errors.lastName ? 'border-red-500' : ''}`}
                            {...register('lastName')}
                        />
                        {errors.lastName && <p className='text-red-500 text-sm mt-1'>{errors.lastName.message}</p>}
                    </div>
                    <div className='space-y-1'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            id='email'
                            placeholder='name@example.com'
                            type='email'
                            className={`h-10 ${errors.email ? 'border-red-500' : ''}`}
                            {...register('email')}
                        />
                        {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
                    </div>
                    <div className='space-y-1'>
                        <Label htmlFor='password'>Password</Label>
                        <Input
                            id='password'
                            placeholder='••••••••'
                            type='password'
                            className={`h-10 ${errors.password ? 'border-red-500' : ''}`}
                            {...register('password')}
                        />
                        {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}
                    </div>
                    <div className='space-y-1'>
                        <Label htmlFor='confirmPassword'>Confirm Password</Label>
                        <Input
                            id='confirmPassword'
                            placeholder='••••••••'
                            type='password'
                            className={`h-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                            {...register('confirmPassword')}
                        />
                        {errors.confirmPassword && (
                            <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword.message}</p>
                        )}
                    </div>
                    <div className='flex items-center space-x-2 pt-2'>
                        <Checkbox
                            id='terms'
                            checked={watch('terms')}
                            onCheckedChange={(checked) => {
                                setValue('terms', checked === true, { shouldValidate: true });
                            }}
                        />
                        <Label
                            htmlFor='terms'
                            className={`text-sm font-normal ${errors.terms ? 'text-red-500' : ''}`}
                        >
                            I agree to the{' '}
                            <a href='#' className='text-blue-600 hover:underline'>
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href='#' className='text-blue-600 hover:underline'>
                                Privacy Policy
                            </a>
                        </Label>
                    </div>
                    {errors.terms && <p className='text-red-500 text-sm mt-1'>{errors.terms.message}</p>}
                    <Button
                        type='submit'
                        className='w-full h-10'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating account...' : 'Create account'}
                    </Button>
                </form>
            </CardContent>

            <CardFooter className='flex flex-col gap-4'>
                <div className='relative'>
                    <div className='absolute inset-0 flex items-center'>
                        <span className='w-full border-t border-gray-300 dark:border-gray-600' />
                    </div>
                    <div className='relative flex justify-center text-xs uppercase'>
                        <span className='bg-background px-2 text-gray-500 dark:text-gray-400'>Or continue with</span>
                    </div>
                </div>
                <div className='grid gap-3'>
                    <Button variant='outline' className='flex items-center gap-2'>
                        <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'>
                            <path
                                fill='#ffc107'
                                d='M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917'
                            />
                            <path
                                fill='#ff3d00'
                                d='m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691'
                            />
                            <path
                                fill='#4caf50'
                                d='M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44'
                            />
                            <path
                                fill='#1976d2'
                                d='M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917'
                            />
                        </svg>
                        Google
                    </Button>
                </div>
                <div className='text-sm text-gray-600'>
                    Already have an account?{' '}
                    <NextLink href={PATH_AUTH.login.magic} className='text-blue-600 hover:underline font-medium'>
                        Sign in
                    </NextLink>
                </div>
            </CardFooter>
        </Card>
    );
}
