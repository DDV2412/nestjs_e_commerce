import { Injectable } from '@nestjs/common';
import { WarrantyDTO } from 'src/dto/warranty.dto';
import { WarrantyRepo } from 'src/repository/warrantyClaim.repository';
import { Status } from 'src/utils/enum';

@Injectable()
export class WarrantyClaimService {
  constructor(private readonly warrantyRepo: WarrantyRepo) {}

  addWarranty = async (warrantyData: WarrantyDTO): Promise<WarrantyDTO> => {
    return await this.warrantyRepo.addWarranty(warrantyData);
  };

  getAllWarranty = async (): Promise<WarrantyDTO[]> => {
    return await this.warrantyRepo.getAllWarranty();
  };

  getWarrantyById = async (id: string): Promise<WarrantyDTO | null> => {
    return await this.warrantyRepo.getWarrantyById(id);
  };

  updateStatus = async (
    id: string,
    isStatus: Status,
  ): Promise<WarrantyDTO | null> => {
    return await this.warrantyRepo.updateStatus(id, isStatus);
  };
}
