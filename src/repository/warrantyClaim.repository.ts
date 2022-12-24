import { Model } from 'mongoose';
import { Inject } from '@nestjs/common';
import { WarrantyDTO } from 'src/dto/warranty.dto';
import { IWarranty } from 'src/interfaces/warranty.interface';
import { Status } from 'src/utils/enum';

export class WarrantyRepo {
  constructor(
    @Inject('WarrantyClaim') private warrantyModel: Model<IWarranty>,
  ) {}

  addWarranty = async (warrantyData: WarrantyDTO): Promise<WarrantyDTO> => {
    return await new this.warrantyModel(warrantyData).save();
  };

  getAllWarranty = async (): Promise<WarrantyDTO[]> => {
    return await this.warrantyModel.find();
  };

  getWarrantyById = async (id: string): Promise<WarrantyDTO | null> => {
    return await this.warrantyModel.findById(id);
  };

  updateStatus = async (
    id: string,
    updateStatus: Status,
  ): Promise<WarrantyDTO | null> => {
    return await this.warrantyModel.findByIdAndUpdate(id, {
      isStatus: updateStatus,
    });
  };
}
