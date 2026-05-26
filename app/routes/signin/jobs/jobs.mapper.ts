
import type { GetSigninJobsSuccess } from "~/api/getSigninJobs/getSigninJobsSuccess.schema";
import type { EntitiesListViewInterface } from "~/shared/views/EntitiesListView/EntitesListViewInterface";

export class SigninJobsMapper {

    static mapDataToJobs(data: GetSigninJobsSuccess['data']): EntitiesListViewInterface['entities'] {
        return data.map((item) => ({
            id: item.id,
            userId: -1,
            status: -1,
            statusColor: 'var(--mui-palette-Corp_1)',
            header: item.viewActivity.name,
            subHeader: item.price.toString(),
            address: {
              logo: `${import.meta.env.VITE_ASSET_PATH}${item.place.logo}`,
              text: item.place.address_kladr,
            },
            duration: {
              start: item.dateStart,
              end: item.dateEnd,
            },
            coordinates: [
              Number(item.place.latitude),
              Number(item.place.longitude),
            ],
            units: item.viewActivity.standard.name,
            currency: "₽",
          }
        )       
    );

    }

}