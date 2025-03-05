'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import NextLink from 'next/link';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import LoadingButton from '@/components/loading-button';
import { PATH_AUTH } from '@/routes';
import { auth } from '@workspace/auth/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import ForgotPasswordSent from './sent';

// Define validation schema
const forgotPasswordSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [email, setEmail] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: '' },
    });

    const onSubmit = useCallback(async (payload: ForgotPasswordFormData) => {
        setIsLoading(true);
        setEmail(payload.email);

        try {
            const { error } = await auth.forgetPassword({
                email: payload.email,
                redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}${PATH_AUTH.resetPassword}`,
            });

            if (error) {
                setIsLoading(false);
                console.log('[LoginWithPassword][Error]: ', error);
                toast.error(error?.message || 'An error occurred');
                return;
            }

            setIsLoading(false);
            setIsSent(true);
        } catch (error) {
            toast.error(error?.message || 'An error occurred. Please try again!');
            setIsLoading(false);
        }
    }, []);

    if (isSent) {
        return <ForgotPasswordSent email={email} />;
    }

    return (
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
                        <LoadingButton isLoading={isLoading} loadingText='Sending...' text='Send reset link' />
                    </div>
                </form>
            </CardContent>
            <CardFooter className='flex justify-center'>
                <div className='text-sm text-gray-500'>
                    Remember your password?{' '}
                    <NextLink href={PATH_AUTH.login.magic} className='text-blue-500 hover:text-blue-700 font-medium'>
                        Back to login
                    </NextLink>
                </div>
            </CardFooter>
        </Card>
    );
}
