// Generate text
(async () => {
  // Setup frame
  const frame = figma.createFrame();
  frame.x = -2599;
  frame.y = -267;
  frame.resizeWithoutConstraints(1096, 1253)
  frame.name = 'Generated SCSS code';

  // Get text into frame
  const text = figma.createText();
  frame.appendChild(text);
  text.resizeWithoutConstraints(frame.width, frame.height);

  // Load font familly
  await figma.loadFontAsync(text.fontName as FontName);
  text.characters = 'Gleb uymanov';

  text.fontSize = 18;
  text.fills = [
    {
      type: 'SOLID',
      color: {
        r: 1,
        g: 0,
        b: 0,
      },
    },
  ];

  text.characters = 'Gleb uymanov';
})();

figma.closePlugin();
