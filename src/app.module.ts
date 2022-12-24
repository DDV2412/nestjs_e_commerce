import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './controllers/auth.controller';
import { UserSchema } from './schema/user.schema';
import { UserService } from './services/user.service';
import { UserRepo } from './repository/user.repository';
import { ProductSchema } from './schema/product.schema';
import { WarrantyClaimSchema } from './schema/warrantyClaim.schema';
import { FileUpload } from './controllers/media.controller';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/e_commerce'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    MongooseModule.forFeature([
      { name: 'WarrantyClaim', schema: WarrantyClaimSchema },
    ]),
    MulterModule.register({
      dest: join(__dirname, '/upload'),
    }),
  ],
  controllers: [AppController, AuthController, FileUpload],
  providers: [AppService, UserRepo, UserService],
})
export class AppModule {}
