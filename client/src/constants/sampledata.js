export const sampleChats = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Doe",
    _id: "1",
    groupchat: true,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John boi",
    _id: "2",
    groupchat: false,
    members: ["1", "2"],
  },
];

export const sampleUsers = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John boi",
    _id: "1",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John boi",
    _id: "2",
  },
];

export const sampleNotification = [
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "John boi",
    },
    _id: "1",
  },
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "John fuckboi",
    },
    _id: "2",
  },
];

export const sampleMessage = [
  {
    attachments: [],
    content: "Chutiye ka Message hai",
    _id: "Noorafjikshfa1",
    sender: {
      _id: "user._id",
      name: "nigga",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:00:00.650Z",
  },
  {
    attachments: [
      {
        public_id: "asadbhatti 2",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    _id: "Noorafjikshfa2",
    sender: {
      _id: "212",
      name: "nigga 2",
    },
    chat: "chatId",
    createdAt: "2024-02-12T10:00:00.650Z",
  },
];

export const dashboardData = {
  users: [
    {
      _id: "1",
      name: "John Doe",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      username: "John Doe",
      friends: 20,
      groups: 5,
    },
    {
      _id: "2",
      name: "John Doe",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      username: "John boi",
      friends: 20,
      groups: 5,
    },
  ],
  chats: [
    {
      name: "labaseGroups",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "1",
      groupchat: false,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "joe bidden",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
    {
      name: "lora group",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "2",
      groupchat: false,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "lassan group",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
    {
      name: "ajeeb",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "3",
      groupchat: false,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "keela group",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
    {
      name: "fingers",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "4",
      groupchat: false,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "kfc",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
  ],

  messages: [
    {
      attachments: [],
      _id: "1",
      content: "Loude ka Message",
      sender: {
        _id: "user._id",
        name: "John Doe",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
      chat: "chatId",
      groupchat: false,
      createdAt: "2024-02-12T10:00:00.650Z",
    },
    {
      attachments: [
        {
          public_id: "sahdoad",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      _id: "2",
      content: "Loude2 ka Message",
      sender: {
        _id: "user._id",
        name: "chaman chutiya",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
      chat: "chatId",
      groupchat: true,
      createdAt: "2024-02-12T10:00:00.650Z",
    },
  ],
};
