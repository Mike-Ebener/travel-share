const faker = require('faker');

const db = require('../config/connection');
const { Thought, User } = require('../models');

db.once('open', async () => {
  await Thought.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // create friends
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];

    let friendId = userId;

    while (friendId === userId) {
      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      friendId = createdUsers.ops[randomUserIndex];
    }

    await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  }

  // create thoughts
  let createdThoughts = [];
  for (let i = 0; i < 100; i += 1) {
    const thoughtText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdThought = await Thought.create({ thoughtText, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { thoughts: createdThought._id } }
    );

    createdThoughts.push(createdThought);
  }

  // create reactions
  for (let i = 0; i < 100; i += 1) {
    const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

    const randomThoughtIndex = Math.floor(Math.random() * createdThoughts.length);
    const { _id: thoughtId } = createdThoughts[randomThoughtIndex];

    await Thought.updateOne(
      { _id: thoughtId },
      { $push: { reactions: { reactionBody, username } } },
      { runValidators: true }
    );
  }

  console.log('all done!');
  process.exit(0);
});

//createImage
import React from 'react';
import { Image, Transformation } from '../index';

export default {
  title: 'Example/Image',
  component: Image,
  subcomponents: { Transformation }
};

const Template = (args) => <Image {...args} />;

export const BasicImage = Template.bind({});
BasicImage.args = {
  cloudName: 'demo',
  publicId: 'sample'
};

export const ResponsiveImage = Template.bind({});
ResponsiveImage.args = {
  cloudName: 'demo',
  publicId: 'sample',
  crop: 'scale',
  width: 'auto',
  responsive: true,
  transformation: {
    overlay: {
      text: 'Enlarge container to fetch larger image',
      font_family: 'Arial',
      font_size: '36'
    },
    color: 'white'
  }
};

export const ResponsiveImageWithSlowDebounce = Template.bind({});
ResponsiveImageWithSlowDebounce.args = {
  cloudName: 'demo',
  publicId: 'sample',
  crop: 'scale',
  width: 'auto',
  responsive: true,
  responsiveDebounce: 3000
};

export const ResponsiveImageWithStyle = Template.bind({});
ResponsiveImageWithStyle.args = {
  cloudName: 'demo',
  publicId: 'sample',
  crop: 'scale',
  width: 'auto',
  responsive: true,
  style: { width: '100%', height: '100%', borderRadius: '50%' }
};
export const ImageWithAlt = Template.bind({});
ImageWithAlt.args = {
  cloudName: 'demo',
  publicId: 'does-not-exist',
  alt: 'This image is intentionally missing',
  transformation: { width: 0.5, crop: 'scale' }
};
export const ImageWithHtmlAttributes = Template.bind({});
ImageWithHtmlAttributes.args = {
  cloudName: 'demo',
  publicId: 'sample',
  html_width: '100'
};

export const ImageWithStyle = Template.bind({});
ImageWithStyle.args = {
  cloudName: 'demo',
  publicId: 'sample',
  crop: 'scale',
  width: 0.5,
  style: { border: '20px solid' }
};
export const ImageWithOnError = Template.bind({});
ImageWithOnError.args = {
  cloudName: 'demo',
  alt: 'original alt text',
  publicId: 'does-not-exist',
  crop: 'scale',
  width: 0.5,
  onError: (e) => {
    e.target.alt = 'This alt text was updated by the error handler';
    return e.target.alt;
  }
};
export const ImageWithChainedTransformations = Template.bind({});
ImageWithChainedTransformations.args = {
  cloudName: 'demo',
  publicId: 'sample',
  transformation: [
    { width: 100, crop: 'crop' },
    { height: 100, angle: -10, crop: 'scale' }
  ]
};

export const ImageWithNestedChainedTransformations = (args) => (
  <Image {...args}>
    <Transformation effect='trim' angle='45' crop='scale' width='600'>
      <Transformation overlay='text:Arial_100:Hello' />
    </Transformation>
  </Image>
);
ImageWithNestedChainedTransformations.args = {
  cloudName: 'demo',
  publicId: 'sample'
};

export const ImageWithEvents = (args) => (
  <>
    <Image {...args} />
    <div id='eventResult' />
  </>
);
ImageWithEvents.args = {
  cloudName: 'demo',
  publicId: 'sample',
  width: 200,
  crop: 'scale',
  onLoad: () => { document.getElementById('eventResult').innerHTML = '<br>loaded'; },
  onMouseOver: () => { document.getElementById('eventResult').innerHTML = '<br>Mouse over'; },
  onMouseLeave: () => { document.getElementById('eventResult').innerHTML = '<br>Mouse leave'; }
};

