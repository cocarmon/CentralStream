module.exports = (sequelize, Sequelize) => {
  const Channel = sequelize.define('channels', {
    channel_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    channelarn: {
      type: Sequelize.STRING,
    },
    chatarn: {
      type: Sequelize.STRING,
    },
    chatendpoint: {
      type: Sequelize.STRING,
    },
    inuse: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Channel;
};
