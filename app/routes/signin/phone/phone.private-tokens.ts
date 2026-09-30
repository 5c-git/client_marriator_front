import {token} from 'brandi';

import type { PostSendPhoneSuccess } from '~/api/postSendPhone/postSendPhoneSuccess.schema';
import type { PostSendPhoneErrorTimer } from '~/api/postSendPhone/postSendPhoneErrorTimer.schema';

export type SendPhone = (phone: string) => Promise<PostSendPhoneSuccess | PostSendPhoneErrorTimer>;
export type RememberPhone = (phone: string) => void;

export const phonePrivateTokens = {
    sendPhone: token<SendPhone>('phone-private:sendPhone'),
    rememberPhone: token<RememberPhone>('phone-private:rememberPhone')
}