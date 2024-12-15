import mongoose from 'mongoose';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('MongoDB connected successfully');

        const connection = mongoose.connection
       
        // Listen for connection events
        connection.on('connected', () => {
            console.log('Mongoose connected to DB');
        });

        connection.on('disconnected', () => {
            console.log('Mongoose disconnected from DB');
        });

        connection.on('error', (error) => {
            console.error('Mongoose connection error:', error);
            process.exit();
        });

        
    } catch (error) {
        console.error('Something went wrong in db connection :', error);
    }
};

connectDB();
