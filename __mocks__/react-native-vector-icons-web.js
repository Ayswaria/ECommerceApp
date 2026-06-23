const React = require('react');
const { Text } = require('react-native');

// Web-compatible Icon mock using emoji or text fallback
const iconMap = {
  'cart-sharp': '🛒',
  'cart-outline': '🛒',
  cart: '🛒',
  heart: '❤️',
  'heart-outline': '🤍',
  'person-circle-outline': '👤',
  'bag-handle-outline': '🛍️',
  pricetag: '🏷️',
  'pricetag-outline': '🏷️',
  'chevron-forward': '›',
  'arrow-back': '←',
  'close-outline': '✕',
  search: '🔍',
  star: '⭐',
  'star-outline': '☆',
};

function Icon({ name, size = 24, color = '#000', style }) {
  const emoji = iconMap[name] || '•';
  return React.createElement(
    Text,
    {
      style: [
        { fontSize: size * 0.7, color, lineHeight: size },
        style,
      ],
      accessibilityLabel: name,
    },
    emoji,
  );
}

Icon.loadFont = () => Promise.resolve();
Icon.getImageSource = () => Promise.resolve({});
Icon.getImageSourceSync = () => ({});
Icon.hasIcon = () => true;

module.exports = Icon;
module.exports.default = Icon;
