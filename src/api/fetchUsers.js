export default class fetchUsers {
  static url = 'https://itrex-react-lab-files.s3.eu-central-1.amazonaws.com/react-test-api.json';

  static async getUsers() {
    return fetch(this.url);
  }
}
