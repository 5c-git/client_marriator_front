import {Container} from 'brandi';

import { phonePrivateTokens } from './phone.private-tokens';
import { phoneTokens } from './phone.tokens';


import { postSendPhone } from '~/api/postSendPhone/postSendPhone';
import { useStore } from '~/store/store';
import { PhoneService } from './phone.service';

export const phoneContainer = new Container();


phoneContainer.bind(phonePrivateTokens.sendPhone).toConstant(postSendPhone);
phoneContainer.bind(phonePrivateTokens.rememberPhone).toConstant(useStore.getState().setUserPhone)

phoneContainer.bind(phoneTokens.phoneService).toInstance(PhoneService).inSingletonScope()
