const sqlite3 = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'dev.db');
console.log('Database path:', dbPath);

const db = sqlite3(dbPath);

// Logos de partenaires (utilisation de logos placeholder)
const partners = [
  {
    name: 'Canal+',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Canal%2B_logo.svg/320px-Canal%2B_logo.svg.png',
    order: 1,
    active: 1
  },
  {
    name: 'France Télévisions',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/fr/thumb/3/3b/Logo_France_T%C3%A9l%C3%A9visions_2018.svg/320px-Logo_France_T%C3%A9l%C3%A9visions_2018.svg.png',
    order: 2,
    active: 1
  },
  {
    name: 'Arte',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Arte_Logo_2011.svg/320px-Arte_Logo_2011.svg.png',
    order: 3,
    active: 1
  },
  {
    name: 'Netflix',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/320px-Netflix_2015_logo.svg.png',
    order: 4,
    active: 1
  },
  {
    name: 'Gaumont',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/fr/thumb/e/e3/Gaumont_logo.svg/320px-Gaumont_logo.svg.png',
    order: 5,
    active: 1
  },
  {
    name: 'Pathé',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/fr/thumb/f/f8/Path%C3%A9_logo.svg/320px-Path%C3%A9_logo.svg.png',
    order: 6,
    active: 1
  },
  {
    name: 'StudioCanal',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/StudioCanal_2011.svg/320px-StudioCanal_2011.svg.png',
    order: 7,
    active: 1
  },
  {
    name: 'Wild Bunch',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/fr/thumb/e/e1/Wild_Bunch_logo.svg/320px-Wild_Bunch_logo.svg.png',
    order: 8,
    active: 1
  }
];

try {
  console.log('\n🏢 Ajout des partenaires de test...\n');

  const insert = db.prepare(`
    INSERT INTO Partner (name, logoUrl, "order", active)
    VALUES (?, ?, ?, ?)
  `);

  let count = 0;
  for (const partner of partners) {
    insert.run(
      partner.name,
      partner.logoUrl,
      partner.order,
      partner.active
    );
    console.log(`✅ ${partner.name}`);
    count++;
  }

  console.log(`\n✅ ${count} partenaires ajoutés avec succès!\n`);

  // Vérification
  const total = db.prepare('SELECT COUNT(*) as count FROM Partner').get();
  console.log(`Total de partenaires dans la base: ${total.count}\n`);

} catch (error) {
  console.error('❌ Erreur:', error.message);
  process.exit(1);
} finally {
  db.close();
}
