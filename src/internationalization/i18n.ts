import Client from "~/classes/Client";
import handleLanguages from "~/handlers/languageHandler";

export default class I18n {
    //@ts-ignore
    private client: Client;
    public langs: Map<string, any>;
    constructor(client: Client) {
        this.client = client;
        handleLanguages(this);
    }
    //@ts-ignore
    async get(lang: string, key: string): string {
        return key;
    }
}