import { ApiException } from '@hubspot/api-client/lib/codegen/crm/contacts';
import { ContactAPIService } from '../src/services/ContactsApi.js';
import { ApiError } from '../src/models/ApiError.js';
import e from 'express';

jest.mock('@hubspot/api-client', () => ({
  Client: jest.fn(() => {
    return {
      crm: {
        contacts: {
          searchApi: {
            doSearch: jest.fn(() => {
              return 'doSearch';
            }),
          },
          basicApi: {
            create: jest.fn(() => {
              return 'created';
            }),
            update: jest.fn(() => {
              return 'updated';
            }),
            getById: jest.fn(() => {
              return 'getById';
            }),
            archive: jest.fn(() => {
              return 'archive';
            }),
          },
        },
      },
    };
  }),
}));

describe('contactApi instances', () => {
  it('should return non null value before create instance', () => {
    const contactApi = new ContactAPIService();
    expect(contactApi).not.toBeNull();
  });
  it('should return non null value before create instance for hubspot client', () => {
    const contactApi = new ContactAPIService();
    expect(contactApi.hubspotClient).not.toBeNull();
  });
  it('should return non null value before create instance. Validate each method is callable', () => {
    const contactApi = new ContactAPIService();
    expect(contactApi.updateContact).not.toBeNull();
    expect(contactApi.createContact).not.toBeNull();
    expect(contactApi.deleteContactById).not.toBeNull();
    expect(contactApi.searchByProperty).not.toBeNull();
    expect(contactApi.getById).not.toBeNull();
    expect(contactApi.getList).not.toBeNull();
  });
});

describe('contactApi methods updateContact', () => {
  it('should resolve promise for updateContact using mock', async () => {
    const contactApi = new ContactAPIService();
    const result = await contactApi.updateContact({
      contactId: 1,
      properties: {
        test: 'test',
      },
    });
    expect(result).not.toBeNull();
  });
  it('should resolve promise using empty object for updateContact. Set properties with defautl values', async () => {
    const contactApi = new ContactAPIService();
    const result = await contactApi.updateContact({});
    expect(result).not.toBeNull();
    expect(result).toBe('updated');
  });
  it('should reject promise for updateContact using mock with ApiException', async () => {
    const contactApi = new ContactAPIService();
    contactApi.hubspotClient.crm.contacts.basicApi.update.mockRejectedValue(
      new ApiException(400, 'error', 'error', 'error')
    );
    try {
      await contactApi.updateContact({
        contactId: 1,
        properties: {
          test: 'test',
        },
      });
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
    }
  });
  it('should reject promise for updateContact using mock with Error generic', async () => {
    const contactApi = new ContactAPIService();
    contactApi.hubspotClient.crm.contacts.basicApi.update.mockRejectedValue(
      new Error('error')
    );
    try {
      await contactApi.updateContact({
        contactId: 1,
        properties: {
          test: 'test',
        },
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});

describe('contactApi methods createContact', () => {
  it('should resolve promise for createContact using mock', async () => {
    const contactApi = new ContactAPIService();
    const result = await contactApi.createContact({
      properties: {
        test: 'test',
      },
    });
    expect(result).not.toBeNull();
    expect(result).toBe('created');
  });
  it('should resolve promise using empty object for createContact. Set properties with defautl values', async () => {
    const contactApi = new ContactAPIService();
    const result = await contactApi.createContact({});
    expect(result).not.toBeNull();
    expect(result).toBe('created');
  });
  it('should reject promise for createContact using mock raising generic error', async () => {
    const contactApi = new ContactAPIService();
    contactApi.hubspotClient.crm.contacts.basicApi.create.mockRejectedValue(
      new Error('error')
    );
    try {
      await contactApi.createContact({});
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
  it('should reject promise for createContact using mock raising ApiException', async () => {
    const contactApi = new ContactAPIService();
    contactApi.hubspotClient.crm.contacts.basicApi.create.mockRejectedValue(
      new ApiException(400, 'error', 'error', 'error')
    );
    try {
      await contactApi.createContact({});
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(error.code).toBe(400);
    }
  });
});

describe('contactApi methods deleteContactById', () => {
  it('should resolve promise for deleteContactById using mock', async () => {
    const contactApi = new ContactAPIService();
    const result = await contactApi.deleteContactById({
      contactId: 1,
    });
    expect(result).not.toBeNull();
    expect(result).toBe('archive');
  });
  it('should reject promise for deleteContactById using mock raising generic error', async () => {
    const contactApi = new ContactAPIService();
    contactApi.hubspotClient.crm.contacts.basicApi.archive.mockRejectedValue(
      new Error('error')
    );
    try {
      await contactApi.deleteContactById({
        contactId: 1,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
  it('should reject promise for deleteContactById using mock raising ApiException', async () => {
    const contactApi = new ContactAPIService();
    contactApi.hubspotClient.crm.contacts.basicApi.archive.mockRejectedValue(
      new ApiException(400, 'error', 'error', 'error')
    );
    try {
      await contactApi.deleteContactById({
        contactId: 1,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(error.code).toBe(400);
    }
  });
  it('should reject promise for deleteContactById using mock raising ApiException with 404 code', async () => {
    const contactApi = new ContactAPIService();
    contactApi.hubspotClient.crm.contacts.basicApi.archive.mockRejectedValue(
      new ApiException(404, 'error', 'error', 'error')
    );
    try {
      await contactApi.deleteContactById({});
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(error.code).toBe(404);
    }
  });
});

describe('contactApi methods searchByProperty', () => {
  it('should resolve promise for searchByProperty using mock', async () => {
    const contactApi = new ContactAPIService();
    const result = await contactApi.searchByProperty({
      filterGroups: [],
    });
    expect(result).not.toBeNull();
    expect(result).toBe('doSearch');
  });
  it('should reject promise for searchByProperty using mock raising generic error', async () => {
    const contactApi = new ContactAPIService();
    contactApi.hubspotClient.crm.contacts.searchApi.doSearch.mockRejectedValue(
      new Error('error')
    );
    try {
      await contactApi.searchByProperty({
        filterGroups: [],
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
  it('should reject promise for searchByProperty using mock raising ApiException', async () => {
    const contactApi = new ContactAPIService();
    contactApi.hubspotClient.crm.contacts.searchApi.doSearch.mockRejectedValue(
      new ApiException(400, 'error', 'error', 'error')
    );
    try {
      await contactApi.searchByProperty({
        filterGroups: [],
      });
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(error.code).toBe(400);
    }
  });
  it('should reject promise for searchByProperty using mock raising ApiException with 404 code', async () => {
    const contactApi = new ContactAPIService();
    contactApi.hubspotClient.crm.contacts.searchApi.doSearch.mockRejectedValue(
      new ApiException(404, 'error', 'error', 'error')
    );
    try {
      await contactApi.searchByProperty({});
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(error.code).toBe(404);
    }
  });
});

describe('contactApi methods getContactById', () => {
  it('should resolve promise for getContactById using mock', async () => {
    const contactApi = new ContactAPIService();
    const result = await contactApi.getById({
      contactId: 1,
    });
    expect(result).not.toBeNull();
    expect(result).toBe('getById');
  });
  it('should reject promise for getById using mock raising generic error', async () => {
    const contactApi = new ContactAPIService();
    contactApi.hubspotClient.crm.contacts.basicApi.getById.mockRejectedValue(
      new Error('error')
    );
    try {
      await contactApi.getById({
        contactId: 1,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
  it('should reject promise for getById using mock raising ApiException', async () => {
    const contactApi = new ContactAPIService();
    contactApi.hubspotClient.crm.contacts.basicApi.getById.mockRejectedValue(
      new ApiException(400, 'error', 'error', 'error')
    );
    try {
      await contactApi.getById({
        contactId: 1,
      });
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(error.code).toBe(400);
    }
  });
  it('should reject promise for getById using mock raising ApiException with 404 code', async () => {
    const contactApi = new ContactAPIService();
    contactApi.hubspotClient.crm.contacts.basicApi.getById.mockRejectedValue(
      new ApiException(404, 'error', 'error', 'error')
    );
    try {
      await contactApi.getById({});
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(error.code).toBe(404);
    }
  });
});

describe('contactApi methods getList', () => {
  it('should resolve promise for getList using mock', async () => {
    const contactApi = new ContactAPIService();
    const result = await contactApi.getList({});
    expect(result).not.toBeNull();
    expect(result).toBe('doSearch');
  });
  it('should reject promise for getList using mock raising generic error', async () => {
    const contactApi = new ContactAPIService();
    contactApi.hubspotClient.crm.contacts.searchApi.doSearch.mockRejectedValue(
      new Error('error')
    );
    try {
      await contactApi.getList({});
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
  it('should reject promise for getList using mock raising ApiException', async () => {
    const contactApi = new ContactAPIService();
    contactApi.hubspotClient.crm.contacts.searchApi.doSearch.mockRejectedValue(
      new ApiException(400, 'error', 'error', 'error')
    );
    try {
      await contactApi.getList({});
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(error.code).toBe(400);
    }
  });
  it('should reject promise for getList using mock raising ApiException with 404 code', async () => {
    const contactApi = new ContactAPIService();
    contactApi.hubspotClient.crm.contacts.searchApi.doSearch.mockRejectedValue(
      new ApiException(404, 'error', 'error', 'error')
    );
    try {
      await contactApi.getList({});
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(error.code).toBe(404);
    }
  });
});
