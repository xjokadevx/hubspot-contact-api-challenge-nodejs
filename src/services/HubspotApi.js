import { Client } from '@hubspot/api-client';
import dotenv from 'dotenv';
dotenv.config();

const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;

export class HubSpotAPI {
  constructor() {
    this.hubspotClient = new Client({
      accessToken: HUBSPOT_API_KEY,
      numberOfApiCallRetries: 3,
    });
  }
}
