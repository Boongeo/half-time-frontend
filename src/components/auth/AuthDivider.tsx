export function AuthDivider() {
    return (
        <div className="relative w-full max-w-sm">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"/>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground text-gray-500">
                       Or continue with
                    </span>
            </div>
        </div>
    );
}