import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker'; // For generating fake data

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  await prisma.task.deleteMany({});
  console.log('Deleted existing tasks.');
  await prisma.user.deleteMany({});
  console.log('Deleted existing users.');

  // --- Create Users ---
  const numberOfUsers = 5;
  const users = [];
  for (let i = 0; i < numberOfUsers; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
      },
    });
    users.push(user);
    console.log(`Created user with id: ${user.id}`);
  }

  // --- Create tasks for Users ---
  const tasksPerUser = 3;
  for (const user of users) {
    for (let j = 0; j < tasksPerUser; j++) {
      await prisma.task.create({
        data: {
          title: faker.word.verb(),
          userId: user.id, // Link to the created user
        },
      });
    }
    console.log(`Created ${tasksPerUser} tasks for user id: ${user.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
