import allCountries from "../country.json";
import { CommerceServices } from "./CommerceServices";
import { SelfEmployedServices } from "./SelfEmployedServices";

export interface ICountries {
  name: string;
  code: string;
}

interface IReturnCountries {
  commerceCountries: ICountries[];
  selfEmployedCountries: ICountries[];
}

export class CountryService {
  public async getInitialCountryList(): Promise<IReturnCountries> {
    const commerceServices = new CommerceServices();
    const selfEmployedServices = new SelfEmployedServices();
    const countriesInDBComerce = await commerceServices.getCountriesCommerces();
    const countriesInDBSelf =
      await selfEmployedServices.getCountriesSelfEmployeds();

    const countries = {
      commerceCountries: [] as ICountries[],
      selfEmployedCountries: [] as ICountries[],
    };

    countries.commerceCountries = allCountries.filter((country: ICountries) =>
      countriesInDBComerce.includes(country.code.toLocaleLowerCase())
    );

    countries.selfEmployedCountries = allCountries.filter(
      (country: ICountries) =>
        countriesInDBSelf.includes(country.code.toLocaleLowerCase())
    );

    return countries;
  }
}
