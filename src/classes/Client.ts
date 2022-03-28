import { Client, ClientOptions, Intents, Collection } from "discord.js";
import { REST } from "@discordjs/rest";
import { Command } from "~/interfaces/Command";
const defaultClientOptions: ClientOptions = { intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ]};
import handleEvents from "~/handlers/eventHandler";
import handleCommands from "~/handlers/commandHandler";
import ErrorHandler from "~/handlers/errorHandler";
import I18n from "~/internationalization/i18n";

export default class XEPBClient extends Client {
    public commands: Collection<string, Command> = new Collection();
    public restAPI!: REST;
    public errorHandle: ErrorHandler = new ErrorHandler(this);
    public i18n: I18n = new I18n(this);
    /**
     * 
     * @param {ClientOptions} clientOptions - client options
     * @param {string} token - token of the client, if not provided, it will be taken from the environment variable `TOKEN` 
     */
    constructor(clientOptions: ClientOptions = defaultClientOptions, token?: string) {
        super(clientOptions);
        if (!token && !process.env.TOKEN) throw new Error("The `token` variable is not passed and the `TOKEN` environment variable does not exist or is empty.")
        super.token = token || process.env.TOKEN!;
        this.start();
    }

    start() {
        console.log('Starting...');
        this.login();
        this.restAPI = new REST({ version: '9' }).setToken(this.token!);
        handleEvents(this);
        handleCommands(this);
    }
}