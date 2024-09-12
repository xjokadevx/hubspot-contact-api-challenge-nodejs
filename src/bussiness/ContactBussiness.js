import { ContactAPIService } from '../services/ContactsApi.js';
import logger from '../utils/logger.js';
import { Contact } from '../models/Contact.js';
import { nullishValidator } from '../utils/validators.js';
export class ContactBussiness {
  constructor(bodyRequest) {
    this.bodyRequest = bodyRequest;
    this._contactApi = new ContactAPIService();
    this._dataResult = {
      nextPage: '',
      totalElements: 0,
      results: [],
    };
  }
  async updateContact() {
    const result = await this._contactApi.updateContact(this.bodyRequest);
    logger.info(
      `${this.bodyRequest.id}#[updateContact] [ServiceResult]: Service response recived.`
    );
    if (nullishValidator(result)) {
      logger.info(
        `${this.bodyRequest.id}#[updateContact]: Service response is empty.`
      );
    } else {
      logger.info(
        `${this.bodyRequest.id}#[updateContact]: Contact updated successfully.`
      );
      this._dataResult.totalElements = 1;
      this._dataResult.results.push(new Contact(result));
    }
    return this._dataResult;
  }
  async createContact() {
    const result = await this._contactApi.createContact(this.bodyRequest);
    logger.info(
      `${this.bodyRequest.id}#[createContactBussiness] [ServiceResult]: Service response recived.`
    );
    if (nullishValidator(result)) {
      logger.info(
        `${this.bodyRequest.id}#[createContactBussiness]: Service response is empty.`
      );
    } else {
      logger.info(
        `${this.bodyRequest.id}#[createContactBussiness]: Contact created successfully.`
      );
      this._dataResult.totalElements = 1;
      this._dataResult.results.push(new Contact(result));
    }
    return this._dataResult;
  }

  async getContactList() {
    const result = await this._contactApi.getList({
      limit: this.bodyRequest.limit,
      after: this.bodyRequest.nextPage,
    });
    logger.info(
      `${this.bodyRequest.id}#[getContactListBussiness] [ServiceResult]: Service response recived.`
    );
    if (nullishValidator(result)) {
      logger.info(
        `${this.bodyRequest.id}#[getContactListBussiness]: Service response is empty.`
      );
    } else {
      const { paging, results } = result;

      if (!nullishValidator(paging) && 'next' in paging) {
        this._dataResult.nextPage = paging.next.after;
        logger.info(
          `${this.bodyRequest.id}#[getContactListBussiness]: Next page found with ${this._dataResult.nextPage}.`
        );
      }
      if (!nullishValidator(results)) {
        logger.info(
          `${this.bodyRequest.id}#[getContactListBussiness]: ${results.length} contacts found.`
        );
        this._dataResult.totalElements = results.length;
        this._dataResult.results = results.map(item => {
          return new Contact(item);
        });
      }
    }
    return this._dataResult;
  }

  async getContactById() {
    const result = await this._contactApi.getById({
      contactId: this.bodyRequest.contactId,
    });
    logger.info(
      `${this.bodyRequest.id}#[getContactByIdBussiness] [ServiceResult]: Service response recived.`
    );
    if (nullishValidator(result)) {
      logger.info(
        `${this.bodyRequest.id}#[getContactByIdBussiness]: Service response is empty.`
      );
    } else {
      this._dataResult.totalElements = 1;
      this._dataResult.results.push(new Contact(result));
    }
    return this._dataResult;
  }

  async searchContactByProperty() {
    const result = await this._contactApi.searchByProperty({
      limit: this.bodyRequest.limit,
      properties: this.bodyRequest.properties,
      sorts: this.bodyRequest.sorts,
      filterGroups: this.bodyRequest.filterGroups,
      after: this.bodyRequest.nextPage,
    });
    logger.info(
      `${this.bodyRequest.id}#[searchContactByProperty] [ServiceResult]: Service response recived.`
    );
    if (nullishValidator(result)) {
      logger.info(
        `${this.bodyRequest.id}#[searchContactByProperty]: Service response is empty.`
      );
    } else {
      const { paging, results } = result;
      if (!nullishValidator(paging) && 'next' in paging) {
        this._dataResult.nextPage = paging.next.after;
        logger.info(
          `${this.bodyRequest.id}#[searchContactByProperty]: Next page found with ${this._dataResult.nextPage}.`
        );
      }
      if (!nullishValidator(results)) {
        logger.info(
          `${this.bodyRequest.id}#[searchContactByProperty]: ${results.length} contacts found.`
        );
        this._dataResult.totalElements = results.length;
        this._dataResult.results = results.map(item => {
          return new Contact(item);
        });
      }
    }
    return this._dataResult;
  }

  async deleteContactById() {
    const result = await this._contactApi.deleteContactById({
      contactId: this.bodyRequest.contactId,
    });
    logger.info(
      `${this.bodyRequest.id}#[deleteContactBussiness] [ServiceResult]: Service response recived.`
    );
    return result;
  }
}
