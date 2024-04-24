const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

const sendMessage = expressAsyncHandler(async (req, res, next) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data pass into req");
    return res.sendStatus(400);
  }
  try {
    let newMessage = new Message({
      sender: req.user._id,
      content,
      chat: chatId,
    });
    await newMessage.save();
    await newMessage.populate("sender", "name pic");
    await newMessage.populate("chat");
    newMessage = await User.populate(newMessage, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: newMessage,
    });
    res.json(newMessage);
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

const allMessages = expressAsyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    res.send(404);
    throw new Error(error.message);
  }
});

module.exports = { sendMessage , allMessages };
