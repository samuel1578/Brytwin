// Minimal shims for packages that may not be installed yet
declare module 'react-hook-form' {
    export function useForm<T = any>(opts?: any): any;
    export const Controller: any;
    export const FormProvider: any;
    export default any;
}

declare module 'zod' {
    export const z: any;
    export type ZodType<T = any> = any;
    export default any;
}

declare module '@hookform/resolvers/zod' {
    export const zodResolver: any;
    export default any;
}
