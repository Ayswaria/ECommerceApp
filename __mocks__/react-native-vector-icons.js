const React = require('react');
const { Text } = require('react-native');

// Generic Icon component mock
const Icon = (props) => React.createElement(Text, { testID: props.testID }, props.name || '');
Icon.loadFont = jest.fn(() => Promise.resolve());
Icon.getImageSource = jest.fn(() => Promise.resolve({}));
Icon.getImageSourceSync = jest.fn(() => ({}));
Icon.hasIcon = jest.fn(() => true);

module.exports = Icon;
module.exports.default = Icon;
