// @ts-nocheck

import { CommandRun } from "~/interfaces/Command";
import { CommandInteraction } from "discord.js";
import Client from "~/classes/Client";
import { I18nCommandData } from "~/utils/types";

export const disabled: boolean = false;
export const data: I18nCommandData = { name: "example" } as I18nCommandData;
export const run: CommandRun = async (interaction: CommandInteraction) => {
  const client: Client = interaction.client as Client;
  interaction.reply(client.i18n.t("commands.example.texts.example", { lng: interaction.locale }));
};
