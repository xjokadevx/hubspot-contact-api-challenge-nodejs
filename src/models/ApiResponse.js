export class ApiResponse {
  constructor(data) {
    this.id = data.id ?? '';
    this.status = data.status ?? 'success';
    this.code = data.code ?? 200;
    this.message = data.message ?? 'OK';
    this.description = data.description ?? 'OK';
    this.data = data.data ?? {};
  }
}
