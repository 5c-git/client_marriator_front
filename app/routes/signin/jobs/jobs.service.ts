import { injected } from "brandi";

import type {GetPublicJobs} from './jobs.priviate-tokens';
import {signinJobsPrivateTokens} from './jobs.priviate-tokens'

export class SigninJobsService {
    constructor(
        private readonly getJobs: GetPublicJobs
    ) {}

    async getPublicJobs() {
        return await this.getJobs()
    }

}

injected(
    SigninJobsService,
    signinJobsPrivateTokens.getJobs
)