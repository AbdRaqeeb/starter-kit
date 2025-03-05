import { Button } from '@workspace/ui/components';
import { Loader2 } from 'lucide-react';
import { ReactNode } from 'react';

interface LoadingButtonProps {
    className?: string;
    isLoading: boolean;
    loadingText: string;
    text: string;
    icon?: ReactNode;
}

export default function LoadingButton({ className, loadingText, text, isLoading, icon }: LoadingButtonProps) {
    return (
        <Button type='submit' className={`w-full ${className}`} disabled={isLoading}>
            {isLoading ? (
                <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    {loadingText}
                </>
            ) : (
                <>
                    {text}
                    {icon}
                </>
            )}
        </Button>
    );
}
