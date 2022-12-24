import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  Res,
  HttpCode,
  UploadedFiles,
  Get,
  Param,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger/dist';

@Controller('/api/upload')
@ApiTags('File Upload')
export class FileUpload {
  @Post()
  @HttpCode(200)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: join(__dirname, '/../upload'),
        filename: (req, file, callback) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${name}-${randomName}${fileExtName}`);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({
          maxSize: 2500000,
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    const response = {
      path: file.path,
      filename: file.filename,
    };

    return {
      status: true,
      message: 'Upload file has been successfully',
      payload: response,
    };
  }

  @Get(':imgpath')
  @HttpCode(200)
  seeUploadedFile(@Param('imgpath') path: string, @Res() res: Response) {
    return res.sendFile(path, { root: join(__dirname, '/../upload') });
  }

  @Post('/multiple')
  @HttpCode(200)
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: diskStorage({
        destination: join(__dirname, '/../upload'),
        filename: (req, file, callback) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${name}-${randomName}${fileExtName}`);
        },
      }),
    }),
  )
  uploadMultiple(
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {
    const response: Record<string, string>[] = [];

    files.forEach((file) => {
      const fileReponse = {
        path: file.path,
        filename: file.filename,
      };
      response.push(fileReponse);
    });

    return {
      status: true,
      message: 'Upload files has been successfully',
      payload: response,
    };
  }
}
