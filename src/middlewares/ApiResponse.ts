// ApiResponse.ts
// Standardized API response class for consistent responses

class ApiResponse<T = any> {
    public success: boolean;
    public message: string;
    public data?: T;
   

    constructor( message: string, data?: T) {
        this.success = true;
        this.message = message;
        this.data = data;
    }
}

export default ApiResponse;
