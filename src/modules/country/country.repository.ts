import { Country } from 'src/entities/country.entity';
import { State } from 'src/entities/state.entity';
import { IsActive } from 'src/service/isactive';
import { EntityRepository, Repository, getRepository } from 'typeorm';
import { CreateCountryDto } from './dto/createcountry.dto';
@EntityRepository(Country)
export class CountryRepository extends Repository<Country> {
  // getting all coutries
  async findAllCountry(search: any): Promise<any> {
    try {
      const { stateName } = search;
      if (stateName) {
        const state = await getRepository(State)
          .createQueryBuilder('state')
          .select()
          .addSelect('state.country')
          .where('state.state_name=:stateName', { stateName })
          .getOne();
        console.log(state);
      }
    } catch (error) {
      console.log(error);
    }
  }
  //getting countries by id
  async findCountry(slug: string): Promise<any> {
    try {
      const foundCountry = await this.createQueryBuilder()
        .where({ slug })
        .getOne();
      if (!foundCountry) {
        return { mes: 'country not found' };
      }
      return foundCountry;
    } catch (error) {
      throw new Error("'error in finding country'");
    }
  }
  // creating new country
  async createCountry(countryDto: CreateCountryDto): Promise<any> {
    try {
      const { country_name } = countryDto;
      const country = await this.createQueryBuilder()
        .where({ country_name })
        .getOne();
      if (!country) {
        return this.createQueryBuilder()
          .insert()
          .into(Country)
          .values({
            country_name,
            isActive: IsActive.active,
            slug: country_name.split(' ').join('-'),
          })
          .execute()
          .catch(() => {
            'error in creating new task';
          });
      } else return { msg: 'country already exists' };
    } catch (error) {
      throw new Error("'error in creating new country'");
    }
  }
  // updating status of country
  async changeCountryStatus(slug: string, status: IsActive): Promise<any> {
    try {
      const report = await this.createQueryBuilder()
        .where({ slug })
        .update()
        .set({ isActive: status })
        .execute();
      if (report.affected === 0) {
        return { mes: 'please provide a valid id' };
      }
      return { mes: 'updated successfully' };
    } catch (error) {
      throw new Error('error in  updating');
    }
  }
}
