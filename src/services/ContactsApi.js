import { ApiError } from '../models/ApiError.js';
import {
  CONTACT_PROPERTIES,
  LIMIT_CONTACTS_PAGE_DEFAULT,
} from '../utils/constants.js';
import { HubSpotAPI } from './HubspotApi.js';

export class ContactAPIService extends HubSpotAPI {
  constructor() {
    super();
  }

  async updateContact(props) {
    const { contactId = undefined, properties = {} } = props;
    try {
      const apiResponse = await this.hubspotClient.crm.contacts.basicApi.update(
        contactId,
        {
          properties,
        }
      );
      return apiResponse;
    } catch (error) {
      if ('body' in error) {
        throw new ApiError(
          error.code,
          error.body.status,
          error.body.category,
          error.body.message,
          '[CONTACTAPI] - update'
        );
      } else {
        throw new Error('[HubSpotService][ContactAPI] ' + error);
      }
    }
  }

  async createContact(props) {
    const { properties = {} } = props;
    try {
      const apiResponse = await this.hubspotClient.crm.contacts.basicApi.create(
        {
          properties,
        }
      );
      return apiResponse;
    } catch (error) {
      if ('body' in error) {
        throw new ApiError(
          error.code,
          error.body.status,
          error.body.category,
          error.body.message,
          '[CONTACTAPI] - create'
        );
      }
      throw new Error('[HubSpotService][ContactAPI] ' + error);
    }
  }

  async deleteContactById(props) {
    const { contactId = undefined } = props;
    try {
      const apiResponse =
        await this.hubspotClient.crm.contacts.basicApi.archive(contactId);
      return apiResponse;
    } catch (error) {
      if ('body' in error) {
        if (404 === error.code) {
          throw new ApiError(
            error.code,
            'error',
            'OBJECT_NOT_FOUND',
            error.body,
            '[CONTACTAPI] - deleteContactById'
          );
        }
        throw new ApiError(
          error.code,
          error.body.status,
          error.body.category,
          error.body.message,
          '[CONTACTAPI] - deleteContactById'
        );
      }
      throw new Error('[HubSpotService][ContactAPI] ' + error);
    }
  }

  async searchByProperty(props) {
    let {
      limit = LIMIT_CONTACTS_PAGE_DEFAULT,
      properties = CONTACT_PROPERTIES,
      sorts = [
        {
          propertyName: 'createdate',
          direction: 'DESCENDING',
        },
      ],
      filterGroups = [],
      after = undefined,
    } = props;
    const tmp = {
      limit,
      properties,
      sorts,
      after,
      filterGroups,
    };
    try {
      const apiResponse =
        await this.hubspotClient.crm.contacts.searchApi.doSearch(tmp);
      return apiResponse;
    } catch (error) {
      if ('body' in error) {
        if (404 === error.code) {
          throw new ApiError(
            error.code,
            'error',
            'OBJECT_NOT_FOUND',
            error.body,
            '[CONTACTAPI] - searchByProperty'
          );
        }
        throw new ApiError(
          error.code,
          error.body.status,
          error.body.category,
          error.body.message,
          '[CONTACTAPI] - searchByProperty'
        );
      }
      throw new Error('[HubSpotService][ContactAPI] ' + error);
    }
  }
  async getById(props) {
    const {
      contactId = undefined,
      properties = CONTACT_PROPERTIES,
      propertiesWithHistory = undefined,
      associations = undefined,
      archived = false,
    } = props;
    try {
      const apiResponse =
        await this.hubspotClient.crm.contacts.basicApi.getById(
          contactId,
          properties,
          propertiesWithHistory,
          associations,
          archived
        );
      return apiResponse;
    } catch (error) {
      if ('body' in error) {
        if (404 === error.code) {
          throw new ApiError(
            error.code,
            'error',
            'OBJECT_NOT_FOUND',
            error.body,
            '[CONTACTAPI] - getById'
          );
        }
        throw new ApiError(
          error.code,
          error.body.status,
          error.body.category,
          error.body.message,
          '[CONTACTAPI] - getById'
        );
      }
      throw new Error('[HubSpotService][ContactAPI] ' + error);
    }
  }
  async getList(props) {
    const {
      limit = LIMIT_CONTACTS_PAGE_DEFAULT,
      after = undefined,
      properties = CONTACT_PROPERTIES,
    } = props;
    try {
      const apiResponse =
        await this.hubspotClient.crm.contacts.searchApi.doSearch({
          limit,
          after,
          properties,
          sorts: [
            {
              propertyName: 'createdate',
              direction: 'DESCENDING',
            },
          ],
        });
      return apiResponse;
    } catch (error) {
      if ('body' in error) {
        if (404 === error.code) {
          throw new ApiError(
            error.code,
            'error',
            'OBJECT_NOT_FOUND',
            error.body,
            '[CONTACTAPI] - getList'
          );
        }
        throw new ApiError(
          error.code,
          error.body.status,
          error.body.category,
          error.body.message,
          '[CONTACTAPI] - getList'
        );
      }
      throw new Error('[HubSpotService][ContactAPI] ' + error);
    }
  }
}
