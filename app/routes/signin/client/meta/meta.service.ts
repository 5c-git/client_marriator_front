import { injected } from "brandi";

import type {
  GetData,
  GetBrand,
  DelPlace,
  SetBrandImg,
  SetUserData,
  FinishRegister,
  GetPersistedFio,
  ClearMetaStore,
  ClearAppStore,
} from "./meta.private-tokens";
import type { AppService } from "~/shared/container/container.service";
import type { MetaBrandOption, MetaLocationOption } from "./meta.mapper";

import { metaPrivateTokens } from "./meta.private-tokens";
import { appTokens } from "~/shared/container/container.tokens";

import { MetaMapper } from "./meta.mapper";

export type MetaLoaderData = {
  userName: string;
  userLogo: string;
  brands: MetaBrandOption[];
  locations: MetaLocationOption[];
};

export class MetaService {
  constructor(
    private readonly getData: GetData,
    private readonly getBrand: GetBrand,
    private readonly delPlace: DelPlace,
    private readonly setBrandImg: SetBrandImg,
    private readonly setUserData: SetUserData,
    private readonly postFinishRegister: FinishRegister,
    private readonly getPersistedFio: GetPersistedFio,
    private readonly clearMetaStore: ClearMetaStore,
    private readonly clearAppStore: ClearAppStore,
    private readonly appService: AppService,
  ) {}

  async loadMeta(): Promise<MetaLoaderData> {
    const accessToken = this.appService.getToken();
    const persistedFio = this.getPersistedFio();
    const userData = await this.getData(accessToken);
    const brandsData = await this.getBrand(accessToken);

    return {
      userName: MetaMapper.mapUserName(userData, persistedFio),
      userLogo: MetaMapper.mapUserLogo(userData),
      brands: MetaMapper.mapBrandsToOptions(brandsData),
      locations: MetaMapper.mapPlacesToLocationOptions(userData),
    };
  }

  async deleteLocation(placeId: number) {
    const accessToken = this.appService.getToken();
    await this.delPlace(accessToken, String(placeId));
  }

  async saveLogo(logo: string) {
    const accessToken = this.appService.getToken();
    await this.setBrandImg(accessToken, logo);
  }

  async finishRegister(name: string) {
    const accessToken = this.appService.getToken();
    await this.setUserData(accessToken, { name });
    await this.postFinishRegister(accessToken);
    this.clearAppStore();
    this.clearMetaStore();
  }
}

injected(
  MetaService,
  metaPrivateTokens.getData,
  metaPrivateTokens.getBrand,
  metaPrivateTokens.delPlace,
  metaPrivateTokens.setBrandImg,
  metaPrivateTokens.setUserData,
  metaPrivateTokens.postFinishRegister,
  metaPrivateTokens.getPersistedFio,
  metaPrivateTokens.clearMetaStore,
  metaPrivateTokens.clearAppStore,
  appTokens.appService,
);
