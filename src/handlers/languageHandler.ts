import I18n from "~/internationalization/i18n";
import { basename } from "path";
import glob from "glob";

export default async (i18n: I18n) => {
    const languages: string[] = [...glob.sync(`${__dirname}/../internationalization/languages/*.json`)];
    for (const langFile of languages) {
        const lang = await import(langFile);
        const langName = basename(langFile).replace(/.[^/.]+$/, '');
        i18n.langs.set(langName, lang);
    }
}