module.exports = (client) => {
  
client.getRandomImage = (animal) => {
  
if (animal == "hamster") {
  
const hamsterLinks = [
  "https://media.giphy.com/media/w2fjYsGvjDF3a/giphy.gif",
  "https://media.giphy.com/media/7Z71Z76pCC8Za/giphy.gif",
  "https://media.giphy.com/media/Yv0Bwwlcnplu/giphy.gif",
  "https://media.giphy.com/media/pPrUNsOY8CDS0/giphy.gif",
  "https://media.giphy.com/media/YUx07ixq8GCSA/giphy.gif",
  "https://media.giphy.com/media/wZ2SI2e3t1gR2/giphy.gif",
  "https://media.giphy.com/media/p3wMMqkPBFqsEGI32T/giphy.gif",
  "https://media.giphy.com/media/d1E2IByItLUuONMc/giphy.gif",
  "https://media.giphy.com/media/E0KmHELTpq9pK/giphy.gif",
  "https://media.giphy.com/media/mTRpdks4k5sgo/giphy.gif",
  "https://media.giphy.com/media/jU2ZYjA8ngdKU/giphy.gif",
  "https://media.giphy.com/media/GXnaqmGcg1CTu/giphy.gif",
  "https://media.giphy.com/media/xT0BKDIwzgPHWRFDm8/giphy.gif",
  "https://78.media.tumblr.com/42120f9738c3c8bb2e20754c3606cca6/tumblr_pb1k13a0JZ1tf2doho1_500.gif",
  "https://media.giphy.com/media/JdCz7YXOZAURq/giphy.gif",
  "https://media.giphy.com/media/ETTzs1c6mS36g/giphy.gif",
  "https://media.giphy.com/media/ncU3bkZ5ghDlS/giphy.gif",
  "https://media.giphy.com/media/TkUZUZ9E6KhJC/giphy.gif",
  "https://media.giphy.com/media/L2vRqCV1lPTq0/giphy.gif",
  "https://media.giphy.com/media/uTIZmj69qCjCM/giphy.gif",
  "https://media.giphy.com/media/M4trH1uta8OPu/giphy.gif"
];
  
return hamsterLinks.random();

} else if (animal == "owl") {

const owl = [
  "https://media.giphy.com/media/bz7Lkscqm6mrK/giphy.gif",
  "https://media.giphy.com/media/1hWHUCgi3wKT6/giphy.gif",
  "https://media.giphy.com/media/s68CylvQ9ioRa/giphy.gif",
  "https://media.giphy.com/media/Yl8cYI66NzOuY/giphy.gif",
  "https://media.giphy.com/media/rbIGYBixpnjJm/giphy.gif",
  "https://media.giphy.com/media/eFx8ZIMc7oIFO/giphy.gif",
  "https://media.giphy.com/media/6tsecJ8OyvWUw/giphy.gif",
  "https://media.giphy.com/media/DLz9ryCoP2Vz2/giphy.gif",
  "https://media.giphy.com/media/gtH9aiTG8yeAw/giphy.gif",
  "https://media.giphy.com/media/lPKUVwYQVjeyk/giphy.gif",
  "https://media.giphy.com/media/xeibGDwTHxWs8/giphy.gif",
  "https://media.giphy.com/media/3BEZiwIcLNITm/giphy.gif",
  "https://media.giphy.com/media/B0ArQNmsh2PMk/giphy.gif",
  "https://media.giphy.com/media/I13tgbLk6Uv8Q/giphy.gif",
  "https://media.giphy.com/media/NqManZLZ0Ptza/giphy.gif",
  "https://media.giphy.com/media/jq9qONW8z0uOY/giphy.gif",
  "https://media.giphy.com/media/dDklqSKFX4APC/giphy.gif",
  "https://media.giphy.com/media/5Dr8VvwXGngbe/giphy.gif",
  "https://media.giphy.com/media/3o7bu2wCQjNyFnIcog/giphy.gif",
  "https://media.giphy.com/media/2YoVPwABcYt1e/giphy.gif",
  "https://media.giphy.com/media/CYU7Q6NHVM28o/giphy.gif",
  "https://media.giphy.com/media/iKufnbkSIcliM/giphy.gif",
  "https://media.giphy.com/media/pcdOR27Nteasg/giphy.gif",
  "https://media.giphy.com/media/LmXEue5Ys9rTa/giphy.gif",
  "https://media.giphy.com/media/xwy9AbBlXlIFW/giphy.gif",
  "https://media.giphy.com/media/b7U6l8DbzlKKY/giphy.gif",
  "https://media.giphy.com/media/Mh4j4Y4Lu4boA/giphy.gif",
  "https://media.giphy.com/media/Z5W9H5DtCWN4k/giphy.gif",
  "https://media.giphy.com/media/YwO4nS4NoLWBW/giphy.gif",
  "https://media.giphy.com/media/12mNZ256B87ULm/giphy.gif",
  "https://media.giphy.com/media/IWhdzaaiet9ni/giphy.gif",
  "https://media.giphy.com/media/NBFWQBHEEj1bG/giphy.gif",
  "https://media.giphy.com/media/I1r5jpUvdGra8/giphy.gif",
  "https://tenor.com/view/owl-gif-9233151",
  "https://tenor.com/view/owl-gif-5705190",
  "https://tenor.com/view/boop-owl-gif-10047830",
  "https://tenor.com/view/owl-feather-animal-animals-annoyed-gif-4984224",
  "https://tenor.com/view/funny-animals-owl-birds-brave-dio-brando-gif-12041955",
  "https://tenor.com/view/owl-gif-9623961",
  "https://tenor.com/view/owl-funny-animals-gif-11081718",
  "https://i.imgflip.com/1x39ol.jpg",
  "https://imgur.com/a/ZqFuIoc"
].random();
  
return owl;

} else if (animal == "bear") {

const bear = [
  "https://media.giphy.com/media/3oeHLrjZGBgnPx5VII/giphy.gif",
  "https://media.giphy.com/media/kNGHx5m4QPra0/giphy.gif",
  "https://media.giphy.com/media/IThjAlJnD9WNO/giphy.gif",
  "https://media.giphy.com/media/JglVCaB0axZ4Y/giphy.gif",
  "https://media.giphy.com/media/uUs14eCA2SBgs/giphy.gif",
  "https://media.giphy.com/media/AaqdLBKYfZl0A/giphy.gif",
  "https://media.giphy.com/media/ia7kRlpGe3IFq/giphy.gif",
  "https://media.giphy.com/media/149c3jrzGk0AtG/giphy.gif",
  "https://media.giphy.com/media/7jdcmQ9zb9Tk4/giphy.gif",
  "https://media.giphy.com/media/anu91JH5LYiVW/giphy.gif",
  "https://media.giphy.com/media/aK4wh0UE3oddS/giphy.gif",
  "https://media.giphy.com/media/XCsuZw0hWj8B2/giphy.gif",
  "https://media.giphy.com/media/Gd3PdO3AtmwWk/giphy.gif",
  "https://media.giphy.com/media/tOWyML1WPzKjm/giphy.gif",
  "https://media.giphy.com/media/3oeHLrjZGBgnPx5VII/giphy.gif",
  "https://media.giphy.com/media/OBpFd1Dat9Vzq/giphy.gif",
  "https://media.giphy.com/media/xUn3CmI6rN5pEUlwNa/giphy.gif",
  "https://media.giphy.com/media/26n6WYBZZRSewlgd2/giphy.gif",
  "https://media.giphy.com/media/Osub6rry9Pu2k/giphy.gif",
  "https://media.giphy.com/media/YCCDVrmnXj8vC/giphy.gif",
  "https://media.giphy.com/media/vYtDDrgTXyrm0/giphy.gif"
].random()

return bear;
  
    }
  };
  
client.getRandomActionImage = (action) => {
  if (action == "hug") {
    const hugs = [
      "https://media.giphy.com/media/26FeTvBUZErLbTonS/giphy.gif",
      "https://media.giphy.com/media/llmZp6fCVb4ju/giphy.gif",
      "https://media.giphy.com/media/QbkL9WuorOlgI/giphy.gif",
      "https://media.giphy.com/media/16bJmyPvRbCDu/giphy.gif",
      "https://media.giphy.com/media/us8FXd0EtOXXa/giphy.gif",
      "https://media.giphy.com/media/7eQ8Ky3dAsRYA/giphy.gif",
      "https://media.giphy.com/media/KL7xA3fLx7bna/giphy.gif",
      "https://media.giphy.com/media/8tpiC1JAYVMFq/giphy.gif",
      "https://media.giphy.com/media/gnXG2hODaCOru/giphy.gif",
      "https://media.giphy.com/media/OiKAQbQEQItxK/giphy.gif",
      "https://media.giphy.com/media/UwaByp0aMg6BO/giphy.gif",
      "https://media.giphy.com/media/WQ9l85vIyhRV6/giphy.gif",
      "https://media.giphy.com/media/W4NKtcOqK2kYo/giphy.gif",
      "https://media.giphy.com/media/13YrHUvPzUUmkM/giphy.gif",
      "https://media.giphy.com/media/3EJsCqoEiq6n6/giphy.gif",
      "https://media.giphy.com/media/Ilkurs1e3hP0c/giphy.gif",
      "https://media.giphy.com/media/gl8ymnpv4Sqha/giphy.gif",
      "https://media.giphy.com/media/Y9joz1712cgg0/giphy.gif",
      "https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif",
      "https://media.giphy.com/media/yziFo5qYAOgY8/giphy.gif"
    ];  

    return hugs.random();
    }
  }
};
