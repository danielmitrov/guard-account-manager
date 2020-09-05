import {User} from '../types/users';
import {UserNotFoundError} from '../errors';


class UsersStorage {
    private users: User[];

    constructor() {
        this.users = [
            {
                username: 'admin',
                password: 'password',
            },
        ];
    }

    async addUser(user: User) {
        this.users.push(user);
    }

    async getUserByUsername(username: string): Promise<User> {
        const user = this.users.find(user => user.username === username);

        if (!user) {
            throw new UserNotFoundError('User not found');
        }

        return user;
    }

    async validateCredentials(username: string, password: string): Promise<boolean> {
        const user = await this.getUserByUsername(username);

        return user.password === password;
    }
}

const usersStorage = new UsersStorage();

export default usersStorage;
