import app from "./app"
import connectDB from "./db/index.db"

const PORT = process.env.PORT || 3000
//connect db safely
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
}).catch((err) => {
    console.log(`Error connecting to database: ${err}`)
})

