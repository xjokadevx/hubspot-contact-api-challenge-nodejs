export class Contact {
  constructor(data) {
    this.id = data.id ?? '';
    this.firstname = data.properties.firstname ?? '';
    this.lastname = data.properties.lastname ?? '';
    this.email = data.properties.email ?? '';
    this.phone = data.properties.phone ?? '';
    this.lastmodifieddate = data.properties.lastmodifieddate ?? '';
  }
}
