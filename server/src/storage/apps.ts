import {App} from '../types/apps';
import {AppNotFoundError} from '../errors';


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

    async getAppByName(appName: string): Promise<App> {
        const app = this.apps.find(app => app.appName === appName);

        if (!app) {
            throw new AppNotFoundError('App not found');
        }

        return app;
    }
}

const appsStorage = new AppsStorage();

export default appsStorage;
