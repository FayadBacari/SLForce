import admin from 'firebase-admin';

import serviceAccount from '../../slforce-private-key.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export default admin;