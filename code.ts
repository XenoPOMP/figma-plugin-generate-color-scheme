const pageNode = figma.root.children[0];

const scheme: FrameNode = pageNode.children.map(child => child.name === 'Color schema' ? child : undefined)[0] as FrameNode;
const members = scheme?.children;

let output: string = '&.theme {\n';

members?.map((member, index) => {
  // Check if frame is color group
  if (/colors/gi.test(member.name) && 'children' in member) {
    // Add top gap
    if (index !== 0) {
      output = output.concat('\n');
    }

    // Get styles
    member?.children.map(child => {
      // Colors
      if (/Color group/gi.test(child.name) && 'children' in child) {
        // Colors => Color group
        const colorGroup: ReadonlyArray<SceneNode> = child.children;

        const variables: {
          titles: string[],
          hex: string[]
        } = {
          titles: [],
          hex: []
        };

        child?.children.map((grandChild, index) => {
          // ---- Colors => Color group => Variable name
          if (/^--/gi.test(grandChild.name)) {
            variables.titles.push(`  ${grandChild.name}: `);
          }

          // ---- Colors => Color group => Color code
          if (/Color code/gi.test(grandChild.name) && 'children' in grandChild) {
            grandChild.children.map(colorCodeChildren => {
              // ---- Colors => Color group => Color code => HEX RGB Code
              if (/(#\w{0,6})|(rgba(.+)|(linear-gradient\(.+\)))/gi.test(colorCodeChildren.name)) {
                variables.hex.push(`${colorCodeChildren.name};\n`);
              }
            })
          }
        })

        // Add lines to code
        variables.titles.forEach((title, index) => {
          output = variables.titles[index] && variables.hex[index] ? output.concat(variables.titles[index], variables.hex[index]) : output;
        })
      }
    });
  }
})

output = output.concat('}');

// Output is filled here
(async () => {
  const text = figma.createText();

  text.name = 'Generated SCSS code'
  text.x = -4647;
  text.y = -1472;

  text.resizeWithoutConstraints(2549, 3203);

  figma.loadFontAsync(text.fontName as FontName)
      .then(() => {
        text.characters = output;

        text.fontSize = 50;
        text.textAutoResize = 'HEIGHT';
        text.fills = [{
          type: 'SOLID',
          color: {
            r: 1,
            g: 1,
            b: 1,
          },
          opacity: 1
        }]
      })
      .then(() => {
        // console.log(output);
        figma.closePlugin();
      });
})();
