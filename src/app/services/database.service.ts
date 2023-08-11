import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;

  constructor(private sqlite: SQLite) { }

  async initDatabase() {
    try {
      this.database = await this.sqlite.create({
        name: 'my_database.db',
        location: 'default',
      });

      await this.createTables();
    } catch (error) {
      console.error('Error initializing database', error);
    }
  }

  private async createTables() {
    try {
      const query = `
        CREATE TABLE IF NOT EXISTS my_table (
          id INTEGER PRIMARY KEY,
          name TEXT,
          age INTEGER
        )
      `;
      await this.database.executeSql(query, []);
    } catch (error) {
      console.error('Error creating tables', error);
    }
  }
}
