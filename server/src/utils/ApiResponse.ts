interface ApiResponse {
    statusCode: number;
    data: any;
    message: string;
    success: boolean;
}

class ApiResponse {
    constructor(
        public statusCode: number,
        public data: any = [],
        public message: string = "Success"
    ) {
        this.success = statusCode < 400;  
    }

    public success: boolean;
}

export default ApiResponse;
