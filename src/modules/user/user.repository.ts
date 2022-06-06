import { ISuccessResponse, IPaginationResults } from 'src/common';
import { IUser } from './interfaces';
import { DeepPartial, EntityRepository, FindOneOptions, Repository, Not, Like, In } from 'typeorm';
import { IUserFindOptions, IUserFindManyOptions } from './interfaces';
import { User } from './user.entity';
import { paginate } from 'nestjs-typeorm-paginate';
import { addOrderBy } from 'src/common/utils';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public findById(id: string, options: IUserFindOptions = {}): Promise<IUser | undefined> {
    return this.findOne({ where: { id }, ...options });
  }

  public async findByEmail(email: string, options: IUserFindOptions = {}): Promise<IUser | undefined> {
    const qb = this.createQueryBuilder('user').where({ email });

    if (options.withPassword) { 
      qb.addSelect('user.password');
    }

    return qb.getOne();
  }

  public async updateUser(data: DeepPartial<IUser>): Promise<DeepPartial<IUser> & IUser> {
    const user = await this.findById(data.id);

    return this.save({
      ...user,
      ...data,
    });
  }

  public async insertUser(user: DeepPartial<IUser>): Promise<DeepPartial<IUser> & IUser> {
    return this.save(user);
  }

  public async retrieveUsers({ search, ...options }: IUserFindManyOptions): Promise<any> {
    const qb = this.createQueryBuilder('u')

    if (search) {
      qb.andWhere('u.email ILIKE :search', {
        search: `%${search}%`,
      });
    }

    return paginate(qb, options);
  }

  public async retrieveSubordinates({ search, ...options }: IUserFindManyOptions, id: string): Promise<any> {
    const qb = this.createQueryBuilder('u').where('u.id = :id', { id })
    qb.leftJoinAndSelect('u.subordinates', 'boss');

    let firstGeneration = await qb.getMany();

    return await this.generateSubordinatesTree(firstGeneration);
  }

  private async generateSubordinatesTree(bosses: IUser[]): Promise<IUser[]> {
    let result = await Promise.all(bosses.map(async boss => {
      if (boss.subordinates.length === 0) {
        delete boss.subordinates;
        return boss;
      }
      const qb = this.createQueryBuilder('u').where('u.boss = :bossId', { bossId: boss.id })
      qb.leftJoinAndSelect('u.subordinates', 'boss');

      let nextGeneration = await qb.getMany();
      boss.subordinates = await this.generateSubordinatesTree(nextGeneration);
      return boss;
    }))
    return result;
  }

  public async deleteUsers(ids: string[]): Promise<any> {
    return this.delete(ids);
  }
}
