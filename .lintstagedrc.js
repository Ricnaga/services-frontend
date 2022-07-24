module.exports = {
  '*.ts?(x)': ['yarn lint:fix'],
  '*.{js,jsx,ts,tsx,json,css}': ['prettier --write'],
  '*.spec.ts?(x)': ['yarn test:snap --bail'],
};
