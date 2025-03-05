'use client';

import { CheckCircle, Mail } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import Loading from '@/components/loading';
import { PATH, PATH_AUTH } from '@/routes';
import { auth } from '@workspace/auth/client';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';

export default function VerifyEmail() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const token = searchParams.get('token');

    useEffect(() => {
        setIsLoading(true);

        if (!token) {
            toast.error('Invalid token');
            setIsLoading(false);
            return;
        }

        async function verifyEmail() {
            try {
                const { error } = await auth.verifyEmail({ query: { token } });
                if (error) {
                    toast.error('Failed to verify email');
                    setIsLoading(false);
                    router.push(PATH_AUTH.login.password);
                    return;
                }

                setIsConfirmed(true);
                router.push(PATH.dashboard);
            } catch (error) {
                console.log('Error verifying email', error);
                toast.error('Failed to verify email');
                setIsLoading(false);
            }
        }

        verifyEmail();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Card className='w-full max-w-md'>
            <CardHeader className='space-y-1'>
                <div className='flex justify-center mb-2'>
                    {isConfirmed ? (
                        <CheckCircle className='h-12 w-12 text-green-500' />
                    ) : (
                        <Mail className='h-12 w-12 text-blue-500' />
                    )}
                </div>
                <CardTitle className='text-2xl font-bold text-center'>
                    {isConfirmed ? 'Email confirmed!' : 'Confirm your email'}
                </CardTitle>
                <CardDescription className='text-center'>
                    {isConfirmed
                        ? 'Thank you for confirming your email address. Your account is now fully activated.'
                        : "We've sent a confirmation link to your email address. Please click the link to activate your account."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isConfirmed ? (
                    <div className='bg-green-50 border border-green-200 text-green-800 rounded-md p-4 text-sm dark:bg-green-950 dark:border-green-900 dark:text-green-200'>
                        <p>Your email has been successfully verified. You can now enjoy all features of our service.</p>
                    </div>
                ) : (
                    <div className='bg-blue-50 border border-blue-200 text-blue-800 rounded-md p-4 text-sm dark:bg-blue-950 dark:border-blue-900 dark:text-blue-200'>
                        <p>
                            If you don't see the email in your inbox, please check your spam folder or request a new
                            confirmation link.
                        </p>
                    </div>
                )}
            </CardContent>
            <CardFooter className='flex flex-col space-y-2'>
                {isConfirmed ? (
                    <Button className='w-full'>Continue to dashboard</Button>
                ) : (
                    <>
                        <Button variant='outline' className='w-full'>
                            Resend confirmation
                        </Button>
                        <div className='text-sm text-center text-gray-500'>
                            <span>Need help? </span>
                            <a href='#' className='text-blue-500 hover:text-blue-700 font-medium'>
                                Contact support
                            </a>
                        </div>
                    </>
                )}
            </CardFooter>
        </Card>
    );
}
