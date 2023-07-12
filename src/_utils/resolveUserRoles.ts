import { User } from "@models/user";

const resolveUserRoles = async (id: string) => {
  //Would query DB
  const userWithRole = await User.findOne({ id });
  return userWithRole?.roles;
};

export default resolveUserRoles;
