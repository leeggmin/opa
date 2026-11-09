const iconModules = import.meta.glob('./*.svg', {
  eager: true,
  import: 'default',
  query: '?react',
});

const ICONS = Object.create(null);

for (const [filePath, component] of Object.entries(iconModules)) {
  const fileName = filePath.replace(/^.*[\\/]/, '');
  const iconName = fileName.replace(/\.svg$/i, '');
  ICONS[iconName] = component;
}

export { ICONS };
