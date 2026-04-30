const bcrypt = require('bcryptjs');

const password = process.argv[2] || 'admin123';

bcrypt.hash(password, 10).then(hash => {
  console.log('\n=================================');
  console.log('Hash généré pour le mot de passe:', password);
  console.log('=================================\n');
  console.log(hash);
  console.log('\n=================================');
  console.log('Copiez ce hash et utilisez-le dans Prisma Studio');
  console.log('=================================\n');
});
