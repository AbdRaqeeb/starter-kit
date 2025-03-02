import { beforeAll, describe, expect, it, spyOn } from 'bun:test';
import { faker } from '@faker-js/faker';

import logger from '@workspace/utils/logger';
import request from '@workspace/utils/request';
import { EmailClientService, SendEmailParams } from '../../../src';
import { resendService } from '../../../src/services/resend';

describe('Resend Service', () => {
    let emailClientService: EmailClientService;

    beforeAll(() => {
        emailClientService = resendService();
    });

    describe('Send Email', () => {
        const params: SendEmailParams = {
            to: [faker.internet.email()],
            from: faker.internet.email(),
            subject: faker.word.words(),
            html: faker.word.words(15),
            reply_to: faker.internet.email(),
            send_at: Date.now(),
        };

        it('should send email', async () => {
            const spy = spyOn(request, 'post').mockImplementation(() => ({}) as any);

            await emailClientService.send(params);

            expect(spy).toHaveBeenCalled();
        });

        it('should log error', async () => {
            spyOn(request, 'post').mockRejectedValue(() => Promise.reject('error'));

            const logSpy = spyOn(logger, 'error');

            await emailClientService.send(params);

            expect(logSpy).toHaveBeenCalled();
        });
    });
});
