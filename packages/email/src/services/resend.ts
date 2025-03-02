import Config from '@workspace/utils/config';
import logger from '@workspace/utils/logger';
import request from '@workspace/utils/request';
import { EmailClientService, SendEmailParams } from '../types';

export function resendService(): EmailClientService {
    async function send(params: SendEmailParams): Promise<void> {
        try {
            const to = (Array.isArray(params.to) ? params.to : [params.to]) as string | string[];

            const payload = {
                from: params.from as string,
                to,
                subject: params.subject,
                html: params.html,
                replyTo: params?.reply_to as string,
                scheduledAt: params?.send_at?.toString(),
            };

            await request.post('https://api.resend.com/emails', payload, {
                headers: {
                    Authorization: `Bearer ${Config.resendApiKey}`,
                },
            });
        } catch (error) {
            logger.error(error, '[ResendService][Send] - error');
        }
    }

    return { send };
}
