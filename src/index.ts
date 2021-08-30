import { Client, Collection, Guild, TextChannel } from 'discord.js';
import dotenv from 'dotenv-safe';
import fs from 'fs';

import prompt from './utils/prompt';
dotenv.config();

const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_INVITES', 'GUILD_BANS']
});
export const config = {
  OWNER: process.env.YOU!
};
const TOKEN = process.env.TOKEN!;
export const actions = new Collection<string, Action>();

client.on('ready', async () => {
  console.clear();

  // Array of Servers
  const servers = client.guilds.cache.map((server) => ({ title: server.name, value: server }));

  // Get Server User Input
  const selectedserver = <Guild>(await prompt('select', 'server', 'Pick a Server', servers)).server;

  // Get All TextChannels
  const channels = selectedserver.channels.cache
    .filter((channel) => channel.type == 'GUILD_TEXT')
    .map((channel) => ({
      title: channel.name,
      value: channel
    }));

  // Get Channel User Input
  const selectedchannel = <TextChannel>(
    (await prompt('select', 'channel', 'Pick a Channel', channels)).channel
  );

  // Get Action User Input
  const selectedaction = <string>(
    await prompt(
      'select',
      'action',
      'Pick a Action',
      actions.map((action) => ({
        title: `${action.info.name} - ${action.info.description}`,
        value: action.info.name
      }))
    )
  ).action;

  // Get and run Action
  const cmd = actions.get(selectedaction);
  await cmd?.run(client, selectedserver, selectedchannel);

  // Exit when Done
  client.destroy();
});

// Loading Actions
fs.readdir(__dirname + '/actions/', (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith('.js')) return;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const props: Action = require(__dirname + `/actions/${file}`);
    actions.set(props.info.name, props);
    console.log('Loading Function: ' + props.info.name);
  });
});

client.login(TOKEN);

export interface Action {
  info: {
    name: string;
    description: string;
    input: string[];
  };

  run: (client: Client, server: Guild, channel: TextChannel) => Promise<void>;
}

export interface Config {
  OWNER: string;
}
