// ApiResponse.ts
// Standardized API response class for consistent responses

class ApiResponse<T = any> {
    public success: boolean;
    public message: string;
    public data?: T;
    public errors?: any;

    constructor(success: boolean, message: string, data?: T, errors?: any) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.errors = errors;
    }
}

export default ApiResponse;
