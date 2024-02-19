class ApiError extends Error{
    constructor (
        statsuCode,
        message="Something went wrong",
        errors=[],
        stack= ""
    ){
        super(message)
        this.statsuCode= statsuCode
        this.data= null
        this.message=message
        this.success= false
        this.errors=errors

    }
}


export {ApiError}