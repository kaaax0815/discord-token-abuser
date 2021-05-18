import { Client, Guild, MessageEmbed, TextChannel } from 'discord.js';

import prompt from '../utils/prompt';

let i = 1;

module.exports = {
  info: {
    name: 'Spam Embeds',
    description: 'Spam Channel with Embeds',
    input: ['Iterations', 'Title', 'Description', 'Footer']
  },
  run: async function (client: Client, server: Guild, channel: TextChannel) {
    const iterations = <number>(
      (await prompt('number', 'iterations', 'How many Messages')).iterations
    );
    const title = <string>(await prompt('text', 'title', 'Title')).title;
    const description = <string>(await prompt('text', 'description', 'Description')).description;
    const footer = <string>(await prompt('text', 'footer', 'Footer')).footer;
    const message = new MessageEmbed({
      title: title,
      description: description,
      footer: {
        text: footer
      },
      color: 'RANDOM'
    });
    await channel.send(message).then(async () => await loop(channel, iterations, message));
  }
};

async function loop(channel: TextChannel, iterations: number, message: MessageEmbed) {
  i++;
  if (i - 1 == iterations) return;
  message.setColor('RANDOM');
  await channel.send(message).then(async () => await loop(channel, iterations, message));
}
