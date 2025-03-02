'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { PATH_AUTH } from '@/routes';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';

// Define validation schema
const forgotPasswordSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = (data: ForgotPasswordFormData) => {
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            console.log('Forgot password submitted for:', data.email);
            // Redirect to confirmation page
            router.push(PATH_AUTH.forgotPasswordSent);
        }, 1500);
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <Card className='w-full max-w-md'>
                <CardHeader className='space-y-1'>
                    <CardTitle className='text-2xl font-bold text-center'>Forgot password</CardTitle>
                    <CardDescription className='text-center'>
                        Enter your email address and we'll send you a link to reset your password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='space-y-4'>
                            <div className='space-y-2'>
                                <Label htmlFor='email'>Email</Label>
                                <Input
                                    id='email'
                                    placeholder='name@example.com'
                                    type='email'
                                    className={errors.email ? 'border-red-500' : ''}
                                    {...register('email')}
                                />
                                {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
                            </div>
                            <Button type='submit' className='w-full' disabled={isLoading}>
                                {isLoading ? 'Sending...' : 'Send reset link'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className='flex justify-center'>
                    <div className='text-sm text-gray-500'>
                        Remember your password?{' '}
                        <NextLink
                            href={PATH_AUTH.login.magic}
                            className='text-blue-500 hover:text-blue-700 font-medium'
                        >
                            Back to login
                        </NextLink>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
