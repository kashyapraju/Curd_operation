
const User = require("./../db/user");


// self chatgpt
async function addUser(userModel)
{
  let user = new User({
    ...userModel
  });
  await user.save();
  return user.toObject();
}

// write
async function getUsers()
{
  const users = await User.find();
  return users.map(x=>x.toObject());
}

// read
async function getUser(id)
{
  const user = await User.findById(id);
  return user.toObject();
}

//update

async function updateUser(id,userModel){
  const filter = { _id:id};
  await User.findOneAndUpdate(filter , userModel);
}
 // delete

async function deleteUser(id)
{
  await User.findByIdAndDelete(id);
  
}


module.exports = {addUser,getUsers,getUser,updateUser,deleteUser};