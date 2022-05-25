import axios from "axios";
import i18n from "@/i18n";
import { Location } from "./../../../enums/location.js";

export default {
  async loadTVLocations(context) {
    const tvLocations = [];

    await axios
      .get("https://cmsapi.algebra.hr/api/locations", {
        headers: {
          'api-key': process.env.VUE_APP_API_KEY
        }
      })
      .then((response) => {
        if (response.data.isSuccessful) {
          for (const id in response.data.locations) {
            const location = {
              id: response.data.locations[id].id,
              name: response.data.locations[id].name,
              city: response.data.locations[id].city,
              classrooms: response.data.locations[id].classrooms,
              isActive: false,
              type: Location.TV
            };
            tvLocations.push(location);
          }
        }
      })
      .catch(() => {
        throw new Error(`${i18n.global.t("errorWhileFetchingLocations")} ${i18n.global.t("pleaseTryAgainLater")}`);
      });

    context.commit("setTVLocations", tvLocations);
  },
};