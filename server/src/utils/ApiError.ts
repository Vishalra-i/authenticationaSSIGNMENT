interface ApiError {
    statusCode: number;
    message: string;
    success: boolean;
    data: any;
    error: any;
    stack?: string; 
}

class ApiError extends Error {
    constructor(
        public statusCode: number,
        public message = 'Something went wrong',
        public error: any = [],
        public stack?: string 
    ) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.success = false;
        this.data = null;
        this.error = error;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;
