import mongoose from "mongoose";
import { Password } from "../services/password";
// An inerface that describes the properties
// that are required to create a new user

interface UserAttrs {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  roles: Array<string>;
}

// An inerface that describes the properties
// that a user model has

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An inerface that describes the properties
// that a user document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: Array<string>;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },

    roles: {
      type: Array
    }
  },
  {
    toJSON: {
      versionKey: false,
      transform(doc, ret) {
        ret.id = ret._id;

        delete ret._id;
        delete ret.type;
      }
    }
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};
const User = mongoose.model<UserDoc, UserModel>("user", userSchema);

// const user = User.build({
//   email: "test@test.com",
//   password: "tes",
// });

export { User };
