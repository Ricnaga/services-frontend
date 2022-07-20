module.exports = {
  '*.ts?(x)': ['yarn lint:fix'],
  '*.{js,jsx,ts,tsx,json,css,js}': ['prettier --write'],
};
