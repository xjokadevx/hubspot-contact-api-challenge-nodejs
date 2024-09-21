import { ContactBussiness } from '../src/bussiness/ContactBussiness.js';
import { updateContactController } from '../src/controllers/ContactController.js';
import { ApiError } from '../src/models/ApiError.js';
import { ApiResponse } from '../src/models/ApiResponse.js';
import { ContactAPIService } from '../src/services/ContactsApi.js';

jest.mock('../src/services/ContactsApi.js');
const _mockRequest = {
  id: 1,
  body: {
    contactId: 1,
    proerty: 'property',
    value: 'value',
    lastName: 'lastName',
    firstName: 'firstName',
    email: 'email',
    phone: 'phone',
  },
  query: {
    limit: 1,
    nextPage: 1,
  },
  params: {
    contactId: 1,
  },
};
const _mockResponse = {
  send: jest.fn(element => {
    return element;
  }),
  status: jest.fn(),
  json: jest.fn(),
};
const _mockNext = jest.fn(element => {
  return element;
});
describe('updateContactController', () => {
  beforeAll(() => {
    ContactAPIService.mockImplementation(() => {
      return {
        updateContact: jest.fn(() => {
          return {
            id: 1,
            totalElements: 1,
          };
        }),
        getById: jest.fn(),
        createContact: jest.fn(),
        deleteContactById: jest.fn(),
      };
    });
  });
  beforeEach(() => {
    ContactAPIService.mockClear();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return success response as ApiResponse object', async () => {
    const _result = await updateContactController(
      _mockRequest,
      _mockResponse,
      _mockNext
    );
    console.log('_result :>> ', _result);
    const _updateContactSpy = jest.spyOn(
      ContactBussiness.prototype,
      'updateContact'
    );
    expect(_result).toBeInstanceOf(ApiResponse);
  });

  it('should return undefined by passing error type of ApiError', async () => {
    const _updateContactSpy = jest.spyOn(
      ContactBussiness.prototype,
      'updateContact'
    );
    ContactBussiness.prototype.updateContact.mockRejectedValue(
      new ApiError(400, 'error', 'error', 'error')
    );
    try {
      await updateContactController(_mockRequest, _mockResponse, _mockNext);
    } catch (error) {
      expect().toThrow(ApiError);
      expect(_updateContactSpy).toHaveBeenCalledTimes(1);
    }
  });
});
