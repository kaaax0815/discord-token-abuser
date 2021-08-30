import { Client, Guild } from 'discord.js';

import { config } from '../index';

module.exports = {
  info: {
    name: 'Give All Roles',
    description: 'Give yourself all roles',
    input: []
  },
  run: async function (client: Client, server: Guild) {
    if (
      !server.me?.permissions.has('MANAGE_ROLES') ||
      !server.me?.permissions.has('ADMINISTRATOR')
    ) {
      console.clear();
      return console.log("Don't have permissions to manage roles");
    }
    const roles = server.roles.cache.map((role) => ({
      title: role.name,
      value: role
    }));
    const you = await server.members.fetch(config.OWNER);
    for await (const role of roles) {
      if (you.roles.cache.has(role.value.id)) continue;
      try {
        await you.roles.add(role.value);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.log(err.message ? err.message + `: at ${role.title}` : err);
      }
    }
  }
};
