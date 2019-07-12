// dependencies
const uuid = require('uuid-v4');
const moment = require('moment');

// libs
const dynamoManager = require('../utils/dynamoManager')(process.env.DYNAMODB_LICENSE_LOG_TABLE);

// static values
const typeConfig = {
  checked: 'boolean',
  description: 'regexp',
  title: 'regexp',
};

const Logging = ({ id, title, description, checked, createdAt }) => {
  const toggleCheck = () => {
    dynamoManager.putItem({
      id,
      title,
      description,
      createdAt,
      checked: !checked,
    });
  };

  const getInfo = () => ({
    id,
    title,
    description,
    checked,
    createdAt: moment(createdAt).format('DD-MM-YYYY HH:mm:ss'),
  });

  return {
    toggleCheck,
    getInfo,
  };
};

// internal function
const getFromDynamo = dynamoObj => (
  Logging(
    Object.assign({
      id: dynamoObj.id,
    }, dynamoObj.info))
);

Logging.update = (id, newValues) => (
  dynamoManager.retrieveOne(id)

  .then(Logging => (
    dynamoManager.putItem({
      info: Object.assign(getFromDynamo(Logging).getInfo(), newValues),
      id,
    })
  ))

  .then(Logging => (
    Promise.resolve(getFromDynamo(Logging))
  ))
);

Logging.create = ({ title, description, checked }) => {
  const id = uuid();
  const createdAt = Date.now();

  return dynamoManager

    .putItem({
      id,
      info: {
        title,
        description,
        checked,
        createdAt,
      },
    })

    .then(Logging => (
      Promise.resolve(getFromDynamo(Logging))
    ));
};

Logging.retrieve = id => (
  dynamoManager.retrieveOne(id)

  .then(result => (
    Promise.resolve(getFromDynamo(result))
  ))
);

Logging.retrieveAll = searchParams => (
  dynamoManager.retrieveAll(searchParams, typeConfig)

  .then(searchResult => (
    Promise.resolve(Object.assign(searchResult, {
      results: searchResult.results.map(result => getFromDynamo(result)),
    }))
  ))
);

Logging.remove = id => (
  dynamoManager.remove(id)
);

module.exports = Logging;