import mongoose from "mongoose";
import { SMEToken } from "../services/sme-token";
// An inerface that describes the properties
// that are required to create a new user

interface SMEAttrs {
  name: string;
  address: string;
  smeEmail: string;
}

// An inerface that describes the properties
// that a user model has

interface SMEModel extends mongoose.Model<SMEDoc> {
  build(attrs: SMEAttrs): SMEDoc;
}

// An inerface that describes the properties
// that a user document has
interface SMEDoc extends mongoose.Document {
  name: string;
  smeEmail: string;
  address: string;
}

const SMESchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    smeEmail: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      versionKey: false,
      transform(doc, ret) {
        ret.id = ret._id;

        delete ret._id;
        delete ret.password;
      }
    }
  }
);

SMESchema.pre("save", async function (done) {
  if (this.isModified("token")) {
    const hashed = await SMEToken.toHash(this.get("token"));
    this.set("token", hashed);
  }
  done();
});

SMESchema.statics.build = (attrs: SMEAttrs) => {
  return new SME(attrs);
};

const SME = mongoose.model<SMEDoc, SMEModel>("SME", SMESchema);

// const user = User.build({
//   email: "test@test.com",
//   password: "tes",
// });

export { SME };
