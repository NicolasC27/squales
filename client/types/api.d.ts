export { }
declare global {
    export namespace api {
        export interface MetApiResponse {
            success: boolean
            type: 'success' | 'failure'
            data: unknown
        }

        export interface MetApiResults {
            benchmark: number
            status: 'success' | 'failure'
            query: {
                options: Record<string, unknown>
                params: Record<string, unknown>
            }
            paginate?: MetApiPaginate
            data: unknown
        }
    }

}