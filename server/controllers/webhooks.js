import { webhook } from "svix";
import User from "../models/user.js";

//api controller for webhooks
// export const webhooks = async (req, res) => {
//   const payload = JSON.stringify(req.body);
//   const headers = {
//     "svix-id": req.headers["svix-id"],
//     "svix-timestamp": req.headers["svix-timestamp"],
//     "svix-signature": req.headers["svix-signature"],
//   };
//   // Verify the payload with the headers
//   const wh = new webhook(process.env.SVIX_SECRET);
//   let evt;
//   try {
//     evt = wh.verify(payload, headers);
//   } catch (err) {
//     console.error("Error verifying webhook:", err);
//     return res.status(400).json({ message: "Error verifying webhook" });
//   }
//   // Handle the webhook event
//   const eventType = evt.type;
//   if (eventType === "user.created") {
//     // Handle user.created event
//     const user = evt.data;
//     // Perform any necessary actions with the user data
//     console.log("User created:", user);
//     //create a new user in the database
//     const newUser = new User({
//       id: user.id,
//       email: user.email_addresses[0].email_address,
//       name: user.first_name + " " + user.last_name,
//       avatar: user.avatar_url,
//     });
//   }
// };

export const webhooks = async (req, res) => {
  try {
    const whook = new webhook(process.env.WEBHOOKS_SECRET);

    await whook.verify(
      JSON.stringify(req.body),
      //   req.headers["svix-signature"],
      //   req.headers["svix-timestamp"]
      {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"],
      }
    );
    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        // Handle user.created event
        // const user = data;
        // Perform any necessary actions with the user data
        // console.log("User created:", user);
        //create a new user in the database
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await User.create(userData);
        res.status(200).json({ message: "User created" });
        break;
      }
      case "user.updated": {
        // Handle user.updated event
        // const user = data;
        // Perform any necessary actions with the user data
        // console.log("User updated:", user);
        //update the user in the database
        const userData = {
          //_id: data.id,dont need this
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.status(200).json({ message: "User updated" });
        break;
      }
      case "user.deleted": {
        // Handle user.deleted event
        // const user = data;
        // Perform any necessary actions with the user data
        // console.log("User deleted:", user);
        //delete the user in the database
        await User.findByIdAndDelete(data.id);
        res.status(200).json({ message: "User deleted" });
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return res.status(400).json({ message: "Error verifying webhook" });
  }
};
