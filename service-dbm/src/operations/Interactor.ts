import { Record } from '../entities/Record';
import { RecordRepository } from '../entities/RecordRepository';
import { RecordInteractor } from '../entities/RecordInteractor';

export class Interactor implements RecordInteractor {
  private recordRepository: RecordRepository;

  constructor(injectedRepository: RecordRepository) {
    this.recordRepository = injectedRepository;
  }

  async createRecords(recordsToCreate: Record[]): Promise<string> {
    const recordBundle: Record[] = processRecords(recordsToCreate);
    const insertedRecords: Record[] = await this.recordRepository.createEntries(
      recordBundle
    );
    return `Number of records created: ${insertedRecords.length}`;
  }

  async fetchRecords(
    fetchCriteria: Partial<Record>,
    fetchLimit?: number | undefined,
    fetchOffset?: number | undefined
  ): Promise<string> {
    const fetchedRecords: Record[] = await this.recordRepository.readEntries(
      fetchCriteria,
      fetchLimit,
      fetchOffset
    );
    return JSON.stringify(fetchedRecords);
  }

  async updateRecords(
    updateCriteria: Partial<Record>,
    updateValues: Partial<Record>
  ): Promise<string> {
    const updatedRecords: Record[] = await this.recordRepository.updateEntries(
      updateCriteria,
      updateValues
    );
    return `Number of records updated: ${updatedRecords.length}`;
  }

  async deleteRecords(
    deleteCriteria: Partial<Record>,
    deleteOffset?: number
  ): Promise<string> {
    const deletedRecords = await this.recordRepository.deleteEntries(
      deleteCriteria,
      deleteOffset
    );
    return `Number of records deleted: ${deletedRecords.length}`;
  }
}

function processRecords(records: Record[]): Record[] {
  const processedRecords: Record[] = [];
  records.forEach((record) => {
    processedRecords.push({
      field1: record.field1,
      field2: record.field2 + ' xFF2',
      field3: record.field3 + ' xFF3',
      field4: record.field4 + ' xFF4',
    });
  });
  return processedRecords;
}