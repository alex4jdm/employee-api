import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/user/user.entity';
import { IUser } from 'src/modules/user';
import { EUserRoles } from 'src/common/enums/EUserRoles.enum';

export class SuperAdmin1616773525648 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await getRepository('user').save({
            email: 'super@admin.com',
            username: 'Super Admin',
            role: EUserRoles.SUPER_ADMIN,
            password: await bcrypt.hash('123', 10)
        });
        const user = await getRepository(User)
        .findOne({email: 'super@admin.com' } as IUser);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await getRepository('user').delete({ email: 'super@admin.com' });
    }

}
