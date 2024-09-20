import { Client } from '@hubspot/api-client';
import dotenv from 'dotenv';
import { HubSpotAPI } from '../src/services/HubspotApi';
dotenv.config();

jest.mock('@hubspot/api-client', () => ({
  Client: jest.fn(() => {
    return {
      contacts: {
        create: jest.fn(() => {
          return {
            id: 1,
          };
        }),
      },
    };
  }),
}));

describe('hubspotApi', () => {
  it('should return non null value before create instance', () => {
    const hubspotApi = new HubSpotAPI();
    expect(hubspotApi).not.toBeNull();
  });
});
