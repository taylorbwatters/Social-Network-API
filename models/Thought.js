const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true, 
        maxLength: 280,
    },
    username: {
        type: String, 
        required: true,  
    },
    createdAt: {
        type: Date, 
        get: timestamp => dateFormat(timestamp)
    },
}, {
    toJSON: {
        virtuals: true
    }
});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String, 
        required: true, 
        maxLength: 280, 
    },
    createdAt: {
        type: Date, 
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    },
    username: {
        type: String,
        required: true, 
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true
    }
});

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;