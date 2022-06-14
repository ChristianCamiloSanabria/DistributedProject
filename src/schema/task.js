import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
	title: String,
	description: String,
	status : {
		tipo: Boolean,
		default: false
	}
});

export default mongoose.model('task',TaskSchema);