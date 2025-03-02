'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import NextLink from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { PATH, PATH_AUTH } from '@/routes';
import { authClient } from '@workspace/auth/client';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';

// Define validation schema
const magicLinkSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

type MagicLinkFormData = z.infer<typeof magicLinkSchema>;

export default function MagicLinkLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const [isLinkSent, setIsLinkSent] = useState(false);
    const [emailValue, setEmailValue] = useState('');

    const methods = useForm<MagicLinkFormData>({
        resolver: zodResolver(magicLinkSchema),
        defaultValues: { email: '' },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
    } = methods;

    async function onSubmit(payload: MagicLinkFormData) {
        setIsLoading(true);

        try {
            const { error } = await authClient.signIn.magicLink({
                email: payload.email,
                callbackURL: PATH.dashboard,
            });

            if (error) {
                toast.error(error.message || 'An error occurred');
                setIsLoading(false);
                return;
            }

            setEmailValue(payload.email);
            setIsLinkSent(true);
        } catch (error) {
            toast.error('An error occurred while sending the magic link');
            setIsLoading(false);
        }
    }

    const resetForm = () => {
        setIsLinkSent(false);
        reset();
    };

    return (
        <Card className='w-full max-w-md'>
            {!isLinkSent ? (
                <>
                    <CardHeader className='space-y-1'>
                        <CardTitle className='text-2xl font-bold text-center'>Sign in</CardTitle>
                        <CardDescription className='text-center'>
                            Enter your email to receive a secure login link
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
                                    {errors.email && (
                                        <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
                                    )}
                                </div>
                                <Button type='submit' className='w-full' disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send magic link
                                            <ArrowRight className='ml-2 h-4 w-4' />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className='flex flex-col gap-4'>
                        <div className='text-sm text-center text-gray-500'>
                            Prefer to use a password?{' '}
                            <NextLink
                                href={PATH_AUTH.login.password}
                                className='text-blue-500 hover:text-blue-700 font-medium'
                            >
                                Sign in with password
                            </NextLink>
                        </div>
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
                        <div className='text-sm text-center text-gray-500 mt-2'>
                            Don't have an account?{' '}
                            <NextLink
                                href={PATH_AUTH.register}
                                className='text-blue-500 hover:text-blue-700 font-medium'
                            >
                                Register
                            </NextLink>
                        </div>
                    </CardFooter>
                </>
            ) : (
                <>
                    <CardHeader className='space-y-1'>
                        <div className='flex justify-center mb-2'>
                            <CheckCircle className='h-12 w-12 text-green-500' />
                        </div>
                        <CardTitle className='text-2xl font-bold text-center'>Check your email</CardTitle>
                        <CardDescription className='text-center'>
                            We've sent a magic link to <span className='font-medium'>{emailValue}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='bg-blue-50 border border-blue-200 text-blue-800 rounded-md p-4 text-sm dark:bg-blue-950 dark:border-blue-900 dark:text-blue-200'>
                            <p>
                                Click the link in the email to sign in instantly. The link will expire in 10
                                minutes.
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className='flex flex-col space-y-2'>
                        <Button variant='outline' className='w-full' onClick={resetForm}>
                            Use a different email
                        </Button>
                        <div className='text-sm text-center text-gray-500'>
                            <span>Didn't receive the email? </span>
                            <a
                                href='#'
                                className='text-blue-500 hover:text-blue-700 font-medium'
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsLoading(true);
                                    setTimeout(() => {
                                        setIsLoading(false);
                                    }, 1500);
                                }}
                            >
                                {isLoading ? 'Sending...' : 'Resend'}
                            </a>
                        </div>
                        <div className='text-sm text-center text-gray-500 mt-2'>
                            <NextLink
                                href={PATH_AUTH.login.password}
                                className='text-blue-500 hover:text-blue-700 font-medium'
                            >
                                Try another login method
                            </NextLink>
                        </div>
                    </CardFooter>
                </>
            )}
        </Card>
    );
}
