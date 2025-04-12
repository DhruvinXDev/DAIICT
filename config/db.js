import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        const conn = await mongoose.connect(process.env.MONGO_URI, options);
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        // Add connection error handlers
        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            process.exit(0);
        });

    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        // More detailed error information
        if (error.code) {
            console.error('Error code:', error.code);
        }
        if (error.syscall) {
            console.error('System call:', error.syscall);
        }
        process.exit(1);
    }
};

export default connectDB; 