import {KeyPair} from '../types/keys';
import {getUuid} from '../utils/uuid';


class KeyStorage {
    private keys: KeyPair;
    private keyId: string;

    constructor(keys: KeyPair | null = null) {
        this.saveKeys(keys);
    }

    async saveKeys(keys: KeyPair) {
        this.keys = keys;
        this.keyId = getUuid();
    }

    async getKeys(): Promise<KeyPair> {
        if (!this.keys) {
            throw new Error('No keys found');
        }
        return this.keys;
    }

    async getKeyId(): Promise<string> {
        return this.keyId;
    }
}


const keyStorage = new KeyStorage();

export default keyStorage;
