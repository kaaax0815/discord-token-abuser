import { Client, Guild } from 'discord.js';

import { config } from '../index';

module.exports = {
  info: {
    name: 'Give All Roles',
    description: 'Give yourself all roles',
    input: []
  },
  run: async function (client: Client, server: Guild) {
    if (!server.me?.hasPermission('MANAGE_ROLES') || !server.me?.hasPermission('ADMINISTRATOR')) {
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
      } catch (err) {
        console.log(err.message ? err.message + `: at ${role.title}` : err);
      }
    }
  }
};
