import countries from "../country.json";
import { CommerceServices } from "./CommerceServices";

export interface ICountries {
  name: string;
  code: string;
}

export class CountryService {
  public async getInitialCountryList(): Promise<ICountries[]> {
    const commerceServices = new CommerceServices();
    const countriesInDB = await commerceServices.getCountriesCommerces();
    return countries.filter((country: ICountries) =>
      countriesInDB.includes(country.code.toLocaleLowerCase())
    );
  }
}
