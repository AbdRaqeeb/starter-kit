import { render } from '@react-email/components';

import { EmailTypeParams, EmailTypes } from '../../types';
import ForgotPassword from './ForgotPassword';
import ForgotPasswordOtp from './ForgotPasswordOtp';
import MagicLinkEmail from './MagicLink';
import VerifyEmail from './VerifyEmail';
import VerifyEmailOtp from './VerifyEmailOtp';
import WelcomeEmail from './WelcomeEmail';

export function getEmailHtml<T extends EmailTypes>(emailType: T, emailTypeParams: EmailTypeParams[T]): Promise<string> {
    if (emailType === EmailTypes.WelcomeEmail) {
        return render(<WelcomeEmail {...(emailTypeParams as EmailTypeParams[EmailTypes.WelcomeEmail])} />);
    }

    if (emailType === EmailTypes.VerifyEmailOtp) {
        return render(<VerifyEmailOtp {...(emailTypeParams as EmailTypeParams[EmailTypes.VerifyEmailOtp])} />);
    }

    if (emailType === EmailTypes.VerifyEmail) {
        return render(<VerifyEmail {...(emailTypeParams as EmailTypeParams[EmailTypes.VerifyEmail])} />);
    }

    if (emailType === EmailTypes.ForgotPassword) {
        return render(<ForgotPassword {...(emailTypeParams as EmailTypeParams[EmailTypes.ForgotPassword])} />);
    }

    if (emailType === EmailTypes.ForgotPasswordOtp) {
        return render(<ForgotPasswordOtp {...(emailTypeParams as EmailTypeParams[EmailTypes.ForgotPasswordOtp])} />);
    }

    if (emailType === EmailTypes.MagicLink) {
        return render(<MagicLinkEmail {...(emailTypeParams as EmailTypeParams[EmailTypes.MagicLink])} />);
    }

    throw new Error('Invalid email type');
}
