import { EmbedBuilder } from '@discordjs/builders';
import { APIEmbedField, ColorResolvable, Util } from 'discord.js';
import i18next, { TOptions } from 'i18next';
import Client from '@classes/Client';

export interface LocaleFieldOptions extends APIEmbedField {
	localeNameKey?: string;
	localeValueKey?: string;
	nameArgs?: TOptions;
	valueArgs?: TOptions;
}

export default class Embed extends EmbedBuilder {
	private i18n: typeof i18next;

	private locale: string;

	private embedColor: ColorResolvable = '#2f3136';

	constructor({ i18n }: Client, locale: string = i18n.language) {
		super({});
		super.setColor(Util.resolveColor(this.embedColor));
		this.i18n = i18n;
		this.locale = locale;
	}

	public setLocaleTitle(title: string, args: TOptions = {}): this {
		return super.setTitle(this.i18n.t(title, { lng: this.locale, ...args }));
	}

	public setLocaleDescription(description: string, args: TOptions = {}): this {
		return super.setDescription(this.i18n.t(description, { lng: this.locale, ...args }));
	}

	public addLocaleFields(...fields: LocaleFieldOptions[]): this {
		return super.addFields(
			...fields.map((field) => ({
				name: field.name || this.i18n.t(field.localeNameKey, { lng: this.locale, ...field.nameArgs }),
				value: field.value || this.i18n.t(field.localeValueKey, { lng: this.locale, ...field.valueArgs }),
				inline: field.inline,
			} as APIEmbedField)),
		);
	}
}
