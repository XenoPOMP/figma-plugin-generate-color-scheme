const pageNode = figma.root.children[0];
pageNode.children.map(child => {
  let frame: SceneNode | undefined = child.name === 'Color schema' ? child : undefined;

  if (frame !== undefined) {
    figma.notify('Color schema copied!');
  }

  const frameChildren = frame?.parent?.children;

  console.log(());
});

figma.closePlugin();
