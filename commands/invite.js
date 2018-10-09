exports.run = (client, message, level) => {
    message.reply("My creator gave me this special invite link: " + client.config.inviteLink);
};

exports.conf = {
    enabled: true,
    aliases: ['inv', 'invitelink', 'invlink'],
    permLevel: "Open"
};

exports.help = {
    name: 'invite',
    description: 'Get my creator\'s secret invite link...',
    usage: 'invite'
};
