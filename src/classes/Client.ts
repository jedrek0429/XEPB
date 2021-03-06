import { Client, ClientOptions, Collection, GatewayIntentBits } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Command } from '@interfaces/Command';
const defaultClientOptions: ClientOptions = {
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
};
import handleEvents from '@handlers/eventHandler';
import handleCommands from '@handlers/commandHandler';
import ErrorHandler from '@handlers/ErrorHandler';
import i18next from 'i18next';
import ICU from 'i18next-icu';
import Backend from 'i18next-fs-backend';
import { join } from 'path';
import DotEnv from './DotEnv';

export default class XEPBClient extends Client {
	public commands: Collection<string, Command> = new Collection();

	public restAPI!: REST;

	public errorHandler: ErrorHandler = new ErrorHandler(this);

	public i18n = i18next;

	/**
	 * Custom client class
	 * @param {ClientOptions} clientOptions - client options
	 * @param {string} token - token of the client, if not provided, it will be taken from the environment variable `DISCORD_TOKEN`
	*/
	constructor(
		clientOptions: ClientOptions = defaultClientOptions,
		token: string | null = null,
	) {
		(() => new DotEnv())();
		super(clientOptions);
		super.token = token;
		this.init();
	}

	/**
	 * Initializes the client
	 * @returns {void}
	*/
	async init(): Promise<void> {
		console.log('Starting...');
		this.login();
		await this.i18n
			.use(ICU)
			.use(Backend)
			.init({
				fallbackLng: 'en-US',
				preload: ['en-US', 'pl'],
				load: 'currentOnly',
				backend: { loadPath: join(__dirname, '../../locales/{{lng}}.json') },
			});
		this.restAPI = new REST({ version: '9' }).setToken(this.token!);
		await handleCommands(this);
		await handleEvents(this);
	}
}
