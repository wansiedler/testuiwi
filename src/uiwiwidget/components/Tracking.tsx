// @ts-ignore
import Geocode from "react-geocode";
import { useAppDispatch } from "../store/RTKstore";
import { setLocation } from "../store/features/quiz/quizSlice";
import { useEffect } from "react";

export const Tracking = () => {
      const dispatch = useAppDispatch();
      useEffect(() => {
            // set response language. Defaults to english.
            Geocode.setLanguage("en");

            // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
            // Geocode.setApiKey("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

            // set location_type filter . Its optional.
            // google geocoder returns more that one address for given lat/lng.
            // In some case we need one address as response for which google itself provides a location_type filter.
            // So we can easily parse the result for fetching address components
            // ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
            // And according to the below google docs in description, ROOFTOP param returns the most accurate result.
            Geocode.setLocationType("ROOFTOP");
            Geocode.enableDebug();

            try {
                  navigator.geolocation.getCurrentPosition(
                        (position) => {



                              Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                                    (response) => {
                                          const address = response.results[0].formatted_address;
                                          let city, state, country;
                                          for (let i = 0; i < response.results[0].address_components.length; i++) {
                                                for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                                                      switch (response.results[0].address_components[i].types[j]) {
                                                            case "locality":
                                                                  city = response.results[0].address_components[i].long_name;
                                                                  break;
                                                            case "administrative_area_level_1":
                                                                  state = response.results[0].address_components[i].long_name;
                                                                  break;
                                                            case "country":
                                                                  country = response.results[0].address_components[i].long_name;
                                                                  break;
                                                      }
                                                }
                                          }
                                          dispatch(
                                                setLocation({
                                                      address,
                                                      city,
                                                      state,
                                                      country
                                                })
                                          );
                                    },
                                    (error) => {
                                          console.error(error);
                                    }
                              );
                        },
                        (error) => {
                              console.error(`Error Code = ${error.code} - ${error.message}`);
                        }
                  );
            } catch (error) {
                  navigator.geolocation.getCurrentPosition(
                        (position) => {
                              dispatch(setLocation(`${position.coords.latitude}, ${position.coords.longitude}`));
                        },
                        (error) => {
                              console.error(`Error Code = ${error.code} - ${error.message}`);
                        }
                  );
            }
      }, []);
};
