import { faker, simpleFaker } from "@faker-js/faker";
import { User } from "../models/user.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";

const createUser = async (numUsers) => {
  try {
    const userPromise = [];

    for (let i = 0; i < numUsers; i++) {
      const tempUser = User.create({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        bio: faker.lorem.sentence(10),
        password: "password",
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });
      userPromise.push(tempUser);
    }
    await Promise.all(userPromise);
    console.log("Users Created", numUsers);
  } catch (error) {
    console.error("Error creating users:", error);
  }
};

const createSingleChat = async (numChats) => {
  try {
    const chatPromise = [];
    const users = await User.find().select("_id");

    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < numChats; j++) {
        chatPromise.push(
          Chat.create({
            name: faker.lorem.words(2),
            members: [users[i], users[j]],
          })
        );
      }
    }

    await Promise.all(chatPromise);
    console.log("Chats Created", numChats);
    process.exit();
  } catch (error) {
    console.error("Error creating chats:", error);
    process.exit(1);
  }
};

const createGroupChat = async (numChats) => {
  try {
    const users = await User.find().select("_id");
    const chatPromise = [];
    for (let i = 0; i < numChats; i++) {
      const numMembers = simpleFaker.number.int({ min: 3, max: users.length });
      const members = [];

      for (let j = 0; j < numMembers; j++) {
        const randomIndex = Math.floor(Math.random() * users.length);
        const randomUser = users[randomIndex];

        if (!members.includes(randomUser)) {
          members.push(randomUser);
        }
      }

      const chat = Chat.create({
        name: faker.lorem.words(2),
        groupChat: true,
        creator: members[0],
        members,
      });
      chatPromise.push(chat);
      console.log("successfully created chat");
      process.exit();
    }
  } catch (error) {
    console.error("Error creating group chats:", error);
    process.exit(1);
  }
};

const CreateMessages = async (numMessages) => {
  try {
    const users = await User.find().select("_id");
    const chats = await Chat.find().select("_id");
    const messagePromise = [];
    for (let i = 0; i < numMessages; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomChat = chats[Math.floor(Math.random() * chats.length)];
      const message = faker.lorem.sentence();
      messagePromise.push(
        Message.create({
          content: message,
          sender: randomUser,
          chat: randomChat,
        })
      );
    }
    await Promise.all(messagePromise);
    console.log("Message Created successfully");
    process.exit();
  } catch (e) {
    console.error("Error creating messages:", e);
    process.exit(1);
  }
};

const CreateGroupmessage = async (chatId, numMessages) => {
  try {
    const users = await User.find().select("_id");

    const GroupPromise = [];

    const message = Array.from({ length: numMessages }, () => {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      GroupPromise.push({
        content: faker.lorem.sentence(),
        sender: randomUser._id,
        chat: chatId,
      });
    });
    await Promise.all(GroupPromise);
    console.log("group promise returned ");
    process.exit();
  } catch (error) {
    console.log("error creating Group messages " + error);
    process.exit(1);
  }
};

export { createUser, CreateMessages, createSingleChat };
