'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import NextLink from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import LoadingButton from '@/components/loading-button';
import { PATH, PATH_AUTH } from '@/routes';
import { auth } from '@workspace/auth/client';
import { Button } from '@workspace/ui/components/button';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { Checkbox } from '@workspace/ui/components/checkbox';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { PasswordInput } from '@workspace/ui/components/password-input';

// Define validation schema
const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function PasswordLogin() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const redirectTo = searchParams.get('redirectTo');
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' },
    });
    const { errors } = formState;

    const onSubmit = useCallback(async (payload: LoginFormData) => {
        setIsLoading(true);

        try {
            const { error } = await auth.signIn.email(payload);

            if (error) {
                setIsLoading(false);
                console.log('[LoginWithPassword][Error]: ', error);
                toast.error(error?.message || 'An error occurred');
                return;
            }

            if (redirectTo) {
                router.push(redirectTo);
                return;
            }

            router.push(PATH.dashboard);
        } catch (error) {
            toast.error(error?.message || 'An error occurred. Please try again!');
            setIsLoading(false);
        }
    }, []);

    return (
        <>
            <CardHeader className='space-y-1'>
                <CardTitle className='text-2xl font-bold text-center'>Sign in with Password</CardTitle>
                <CardDescription className='text-center'>Enter your credentials to access your account</CardDescription>
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
                        <div className='space-y-2'>
                            <div className='flex items-center justify-between'>
                                <Label htmlFor='password'>Password</Label>
                                <NextLink
                                    href={PATH_AUTH.forgotPassword}
                                    className='text-sm text-blue-500 hover:text-blue-700'
                                >
                                    Forgot password?
                                </NextLink>
                            </div>
                            <PasswordInput
                                id='password'
                                placeholder='••••••••'
                                className={errors.password ? 'border-red-500' : ''}
                                {...register('password')}
                            />
                            {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}
                        </div>
                        <div className='flex items-center space-x-2'>
                            <Checkbox id='remember' />
                            <Label htmlFor='remember' className='text-sm font-normal'>
                                Remember me
                            </Label>
                        </div>
                        <LoadingButton isLoading={isLoading} loadingText='Signing in...' text='Sign in' />
                    </div>
                </form>
            </CardContent>
            <CardFooter className='flex flex-col gap-4'>
                <div className='text-sm text-center text-gray-500'>
                    Don't want to use a password?{' '}
                    <NextLink href={PATH_AUTH.login.magic} className='text-blue-500 hover:text-blue-700 font-medium'>
                        Sign in with magic link
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
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 48 48'
                            className='mr-2'
                        >
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
                    <NextLink href={PATH_AUTH.register} className='text-blue-500 hover:text-blue-700 font-medium'>
                        Register
                    </NextLink>
                </div>
            </CardFooter>
        </>
    );
}
