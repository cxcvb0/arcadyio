module.exports = {
  gamemodes: [
    {
      name: 'Competitive',
      icon: '/icons/competitive_big.png',
      required_lvl: 10,
    },
    {
      name: 'Casual',
      icon: '/icons/casual_big.png',
      required_lvl: 0,
    },
    {
      name: 'Bots',
      icon: '/icons/bots_big.png',
      required_lvl: 0,
    },
    {
      name: 'Tournaments',
      icon: '/icons/tournament_big.png',
      required_lvl: 0,
      event: true,
      disabled: false,
    },
    {
      name: 'Lobbies',
      icon: '/icons/lobbies_big.png',
      required_lvl: 0,
      event: true,
      disabled: false,
    },
    {
      name: 'URF',
      icon: '/icons/urf_big.png',
      required_lvl: 0,
      event: true,
      disabled: true,
    },
  ],
}
