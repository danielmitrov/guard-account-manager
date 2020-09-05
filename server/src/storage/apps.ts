import {App} from '../types/apps';


class AppsStorage {
    private apps: App[];

    constructor() {
        this.apps = [
            {
                appName: 'example1',
                appDomain: 'example.com',
            },
        ];
    }

    async addApp(app: App) {
        this.apps.push(app);
    }

    async getApps(): Promise<App[]> {
        return this.apps;
    }
}


const appsStorage = new AppsStorage();

export default appsStorage;
