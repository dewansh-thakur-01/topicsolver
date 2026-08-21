const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'users.json');

/**
 * File-persisted, thread-safe user data store.
 * Passwords are always stored as salted bcrypt hashes.
 */
class DataStore {
  constructor() {
    this.users = new Map();
    this.loadFromDisk();
  }

  loadFromDisk() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        const list = JSON.parse(raw);
        if (Array.isArray(list)) {
          list.forEach(u => {
            if (u && u.email) {
              this.users.set(u.email.toLowerCase().trim(), u);
            }
          });
          console.log(`💾 [Database] Loaded ${this.users.size} registered user(s) from users.json`);
        }
      }
    } catch (err) {
      console.warn('⚠️ [Database] Initializing fresh users.json database.');
    }
  }

  saveToDisk() {
    try {
      const list = Array.from(this.users.values());
      fs.writeFileSync(DB_FILE, JSON.stringify(list, null, 2), 'utf8');
    } catch (err) {
      console.error('❌ [Database Error] Failed to write users to disk:', err);
    }
  }

  getUserByEmail(email) {
    if (!email) return null;
    return this.users.get(email.toLowerCase().trim()) || null;
  }

  saveUser(user) {
    if (!user || !user.email) return null;
    const normalizedEmail = user.email.toLowerCase().trim();
    const newUser = {
      id: user.id || `usr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: user.name || normalizedEmail.split('@')[0],
      email: normalizedEmail,
      hashedPassword: user.hashedPassword,
      createdAt: user.createdAt || new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };
    this.users.set(normalizedEmail, newUser);
    this.saveToDisk();
    return newUser;
  }

  updateLastLogin(email) {
    const user = this.getUserByEmail(email);
    if (user) {
      user.lastLoginAt = new Date().toISOString();
      this.saveToDisk();
    }
  }
}

const store = new DataStore();

module.exports = store;
