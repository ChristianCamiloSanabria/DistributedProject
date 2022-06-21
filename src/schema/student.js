import mongoose from "mongoose";

const Schema = mongoose.Schema;

<<<<<<< HEAD
const StudentSchema = new Schema({
=======
const StudentScheme = new Schema({
>>>>>>> line_three
    id_student: Number,
    number_document: Number,
    type_document: String,
    name_student: String,
    lastname_student: String,
    code_student: Number,
    status: {
        tipo: Boolean,
        default: false
    }
});

<<<<<<< HEAD
export default mongoose.model('student', StudentSchema);
=======
export default mongoose.model('student', StudentScheme);
>>>>>>> line_three
