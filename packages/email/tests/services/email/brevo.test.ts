import { beforeAll, describe, expect, it, spyOn } from 'bun:test';
import { faker } from '@faker-js/faker';

import logger from '@workspace/utils/logger';
import request from '@workspace/utils/request';
import { EmailClientService, SendEmailParams } from '../../../src';
import { brevoService } from '../../../src/services/brevo';

describe('Brevo Service', () => {
    let emailService: EmailClientService;

    beforeAll(() => {
        emailService = brevoService();

        spyOn(request, 'post').mockImplementation(async () => {
            return {} as any;
        });
    });

    describe('Send Email', () => {
        const data: SendEmailParams = {
            from: { email: faker.internet.email(), name: faker.person.fullName() },
            to: [{ email: faker.internet.email(), name: faker.person.fullName() }],
            subject: faker.word.words(3),
            html: faker.word.words(5),
            reply_to: { email: faker.internet.email(), name: faker.person.fullName() },
        };

        it('should send email', async () => {
            const spy = spyOn(request, 'post');

            await emailService.send(data);

            expect(spy).toHaveBeenCalled();
        });

        it('should send email with to, reply_to and from as string', async () => {
            const spy = spyOn(request, 'post');

            await emailService.send({
                from: faker.internet.email(),
                to: faker.internet.email(),
                subject: faker.word.words(3),
                html: faker.word.words(5),
                reply_to: faker.internet.email(),
            });

            expect(spy).toHaveBeenCalled();
        });

        it('should send email text with to as array of string', async () => {
            const spy = spyOn(request, 'post');

            await emailService.send({
                from: faker.internet.email(),
                to: [faker.internet.email(), faker.internet.email()],
                subject: faker.word.words(3),
                html: faker.word.words(5),
                reply_to: faker.internet.email(),
            });

            expect(spy).toHaveBeenCalled();
        });

        it('should catch error', async () => {
            spyOn(request, 'post').mockRejectedValue(() => Promise.reject('error'));

            const spy = spyOn(logger, 'error');

            await emailService.send(data);

            expect(spy).toHaveBeenCalled();
        });
    });
});
