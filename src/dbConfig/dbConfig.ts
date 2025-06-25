import mongoose from 'mongoose';
    let isConnected = false;
export async function connectDB() {
    if (isConnected) return;

    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            isConnected = true;
            console.log('MongoDB connected successfully');
        })
        

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
        
    }


}