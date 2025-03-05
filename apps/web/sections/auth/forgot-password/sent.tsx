'use client';

import { CheckCircle, Loader2 } from 'lucide-react';
import NextLink from 'next/link';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { PATH_AUTH } from '@/routes';
import { auth } from '@workspace/auth/client';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@workspace/ui/components/card';

interface ForgotPasswordSentProps {
    email: string;
}

export default function ForgotPasswordSent({ email }: ForgotPasswordSentProps) {
    const [isLoading, setIsLoading] = useState(false);
    const onResend = useCallback(async () => {
        setIsLoading(true);
        try {
            const { error } = await auth.forgetPassword({
                email,
                redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}${PATH_AUTH.resetPassword}`,
            });

            setIsLoading(false);

            if (error) {
                console.error('Failed to send password reset email:', error);
                toast.error('Failed to send password reset email');
            }

            toast.success('Password reset email sent successfully');
        } catch (err) {
            console.error('Failed to resend password reset email:', err);
            toast.error('Failed to send password reset email');
        }
    }, [email]);

    return (
        <Card className='w-full max-w-md'>
            <CardHeader className='space-y-1'>
                <div className='flex justify-center mb-2'>
                    <CheckCircle className='h-12 w-12 text-green-500' />
                </div>
                <CardTitle className='text-2xl font-bold text-center'>Check your email</CardTitle>
                <CardDescription className='text-center'>
                    We have sent a password reset link to your email address. Please check your inbox and click the link
                    to reset your password.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='bg-blue-50 border border-blue-200 text-blue-800 rounded-md p-4 text-sm dark:bg-blue-950 dark:border-blue-900 dark:text-blue-200'>
                    <p>
                        If you don't see the email in your inbox, please check your spam folder or request a new reset
                        link.
                    </p>
                </div>
            </CardContent>
            <CardFooter className='flex flex-col space-y-2'>
                <Button disabled={isLoading} onClick={onResend} variant='outline' className='w-full'>
                    {isLoading ? (
                        <>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Resending...
                        </>
                    ) : (
                        'Resend'
                    )}
                </Button>
                <div className='text-sm text-center text-gray-500'>
                    <NextLink href={PATH_AUTH.login.magic} className='text-blue-500 hover:text-blue-700 font-medium'>
                        Back to login
                    </NextLink>
                </div>
            </CardFooter>
        </Card>
    );
}
