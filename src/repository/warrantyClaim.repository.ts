import { Model } from 'mongoose';
import { Inject } from '@nestjs/common';
import { WarrantyDTO } from 'src/dto/warranty.dto';
import { IWarranty } from 'src/interfaces/warranty.interface';

export class WarrantyRepo {
  constructor(
    @Inject('WarrantyClaim') private warrantyModel: Model<IWarranty>,
  ) {}

  addWarranty = async (warrantyData: WarrantyDTO): Promise<IWarranty> => {
    return await new this.warrantyModel(warrantyData).save();
  };

  getAllWarranty = async (): Promise<IWarranty[]> => {
    return await this.warrantyModel.find();
  };

  getWarrantyById = async (id: string): Promise<IWarranty | null> => {
    return await this.warrantyModel.findById(id);
  };

  updateStatus = async (
    id: string,
    { isStatus }: any,
  ): Promise<WarrantyDTO | null> => {
    await this.warrantyModel.findByIdAndUpdate(id, {
      isStatus: isStatus,
    });

    return await this.getWarrantyById(id);
  };
}
