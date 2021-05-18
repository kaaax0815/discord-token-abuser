import { Client, Guild, TextChannel } from 'discord.js';

import prompt from '../utils/prompt';

let i = 1;

module.exports = {
  info: {
    name: 'Spam Messages',
    description: 'Spam Channel with Messages',
    input: ['Iterations', 'Message']
  },
  run: async function (client: Client, server: Guild, channel: TextChannel) {
    const iterations = <number>(
      (await prompt('number', 'iterations', 'How many Messages')).iterations
    );
    const message = <string>(await prompt('text', 'message', 'What Message')).message;
    await channel.send(message).then(async () => await loop(channel, iterations, message));
  }
};

async function loop(channel: TextChannel, iterations: number, message: string) {
  i++;
  if (i - 1 == iterations) return;
  await channel.send(message).then(async () => await loop(channel, iterations, message));
}
