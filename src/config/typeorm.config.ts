// import { TypeOrmModuleOptions } from "@nestjs/typeorm";

// ALERT: FILE KEPT UNDER REFERENCE PURPOSE. IT'LL SOON BE DELETED

import { DataSource } from "typeorm";

export const typeORMConfig = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'taskmanagement',
  entities: [__dirname + 'dist/src/**/*.entity{.ts,.js}'],
  synchronize: true
})

typeORMConfig.initialize()
  .then(() => {
    console.log(`Data Source has been initialized`);
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err);
  })


// ["dist/src/**/*.entity{.ts,.js}"]