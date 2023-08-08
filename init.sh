@echo on

npm install --save-dev electron
npm install --save-dev @electron-forge/cli
npm install --save-dev rpmbuild
npx electron-forge import

npm run test