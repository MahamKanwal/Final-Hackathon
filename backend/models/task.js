import mongoose from "mongoose";

const taskUser = mongoose.Schema({
    title: { 
        type: String, 
        required: true }
        ,
        description: { 
            type: String 
        },
        assignedTo: { 
            type: mongoose.Schema.Types.ObjectId,
             ref: 'User' },
             status: { 
                type: String, enum: ['To Do', 'In Progress', 'Done'], 
                default: 'To Do' }
}, { timestamps: true });

export default mongoose.model('Task', taskUser)



