import { createTables, seedData } from './schema'

async function main() {
  try {
    console.log('Creating tables...')
    await createTables()
    console.log('Tables created successfully!')

    console.log('Seeding data...')
    await seedData()
    console.log('Data seeded successfully!')
  } catch (error) {
    console.error('Error:', error)
  }
}

main()
